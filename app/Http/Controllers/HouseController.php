<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Services\FilterErrorService;
use App\Services\ImageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HouseController extends Controller
{
    /**
     * Muestra una lista de casas basadas en los filtros proporcionados.
     *
     * @param  \Illuminate\Http\Request  $request  Contiene los datos de la solicitud.
     * @param  \App\Services\FilterErrorService  $errors  Este servicio se utiliza para el filtrado de errores en el método GET.
     * @return \Illuminate\Http\JsonResponse  Retorna una respuesta JSON con la lista de casas filtradas.
     */
    public function index(Request $request, FilterErrorService $errors) : JsonResponse
    {
        // Valida los filtros de entrada utilizando el servicio de validación.
        $result = $errors->filterErrorsHouses($request);

        // Si hay un error en los filtros, retorna una respuesta JSON con el mensaje de error y código de estado 422.
        if ($result['error']) {
            return response()->json([
                'message' => 'Failed operation',
                'error' => $result['message'],
                'status' => 422
            ], 422);
        }

        // Construye la consulta para obtener las casas basadas en los filtros proporcionados.
        $query = House::with(['features', 'typeHouse']) // Carga las relaciones de características y tipo de casa.
            ->whereHas('features', function($query) use ($request){
                // Verifica si se han proporcionado características en la solicitud.
                if($request->has('features')) {
                    $arrayFeatures = explode(",", $request->features); // Convierte la cadena de características en un array.
                    $query->whereIn('name', $arrayFeatures); // Filtra las casas que tienen las características especificadas.
                }
            })
            ->whereHas('features', function ($query) use ($request) {
                // Filtra las casas que tienen todas las características solicitadas.
                if ($request->has('features')) {
                    $arrayFeatures = explode(",", $request->features);
                    $query->whereIn('name', $arrayFeatures)
                        ->groupBy('house_id')
                        ->havingRaw('COUNT(DISTINCT name) = ?', [count($arrayFeatures)]); // Asegura que se cumplan todas las características.
                }
            })
            ->MaxPrice($request->maxPrice) // Aplica el filtro de precio máximo.
            ->MinPrice($request->minPrice) // Aplica el filtro de precio mínimo.
            ->MinSize($request->minSize) // Aplica el filtro de tamaño mínimo.
            ->MaxSize($request->maxSize) // Aplica el filtro de tamaño máximo.
            ->Quarter($request->quarter) // Aplica el filtro de cuartos.
            ->Bath($request->bathroom) // Aplica el filtro de baños.
            ->Search($request->search) // Aplica el filtro de búsqueda.
            ->TypeHouse($request->type_house); // Aplica el filtro de tipo de casa.

        // Aplica el límite si está presente en la solicitud.
        if($request->has('limit')) $query->limit($request->limit);
        
        // Si se solicita, filtra solo las casas publicadas.
        if($request->published) $query->where('published', true);

        // Si se ha proporcionado un ID, busca la casa por su ID.
        if($request->has('id')) $query->find($request->id);
        
        // Se llama a la consulta una vez que todos los filtros han sido aplicados.
        $houses = $query->get();

        // Modifica las URLs de las imágenes en cada casa.
        $houses->transform(function ($house) {
            // Asegúrate de que $house->images es un array.
            if (is_string($house->images)) {
                // Convierte la cadena de imágenes en un array.
                $house->images = json_decode($house->images, true);
            }

            // Verifica si $house->images es un array antes de usar array_map.
            if (is_array($house->images)) {
                $house->images = array_map(function ($image) {
                    return url('storage/' . $image); // Modifica la URL de cada imagen.
                }, $house->images);
            }

            return $house; // Retorna el objeto de casa modificado.
        });

        // Retorna una respuesta JSON con los datos de las casas y un mensaje de éxito.
        return response()->json([
            'message' => 'Successful operation.',
            'data' => $houses,
            'status' => 200
        ]);
    }

    /**
     * Crea una nueva casa basada en la información proporcionada.
     *
     * @param  \Illuminate\Http\Request  $request  Contiene los datos enviados en la solicitud.
     * @param  App\Services\ImageService  $methodImage  Servicio para el control de imágenes, 
     *                                                  guardar, dar nombres y chequear existencias de imágenes antiguas.
     * @return \Illuminate\Http\JsonResponse  Retorna una respuesta JSON con el estado de la operación.
     */
    public function create(Request $request, ImageService $methodImage) : JsonResponse
    {
        // Valida la información recibida en la solicitud.
        $validator = Validator::make($request->all(), [
            'address' => 'required|string|max:255',              // Dirección es requerida, debe ser una cadena y no exceder 255 caracteres.
            'description' => 'required|string|max:100000',       // Descripción es requerida, debe ser una cadena y no exceder 100000 caracteres.
            'bathroom' => 'required|integer|min:1',              // El número de baños es requerido, debe ser un entero y al menos 1.
            'date_construction' => 'required|date|before:today', // La fecha de construcción es requerida, debe ser una fecha y antes de hoy.
            'feature' => 'required|array|min:1',                  // Las características son requeridas, deben ser un array y al menos 1 elemento.
            'floor' => 'integer|min:0',                           // El número de pisos debe ser un entero y puede ser 0.
            'images.*' => 'required|image|max:2048',             // Cada imagen es requerida, debe ser un archivo de imagen y no exceder 2048 KB.
            'price' => 'required|numeric|min:0',                  // El precio es requerido, debe ser numérico y no menor que 0.
            'quarters' => 'required|integer|min:1',               // El número de habitaciones es requerido, debe ser un entero y al menos 1.
            'type_house' => 'required|string'                      // El tipo de casa es requerido, debe ser una cadena.
        ]);

        // Si la validación falla, devuelve un error en formato JSON.
        if($validator->fails()){
            return response()->json([
                'message' => 'Failed operation.',
                'error' => $validator->errors(),
                'status' => 422
            ], 422);
        }

        // Guarda las imágenes utilizando el servicio de imágenes y obtiene sus rutas.
        $imagePaths = $methodImage->SaveImage($request->file('images'));

        // Crea una nueva instancia de House con la información proporcionada.
        $house = House::create([
            'address' => $request->input('address'),               // Dirección de la casa.
            'description' => $request->input('description'),       // Descripción de la casa.
            'bathroom' => $request->input('bathroom'),             // Número de baños.
            'date_construction' => $request->input('date_construction'), // Fecha de construcción.
            'floor' => $request->input('floor'),                   // Número de pisos.
            'images' => json_encode($imagePaths, true),            // Rutas de las imágenes en formato JSON.
            'price' => $request->input('price'),                   // Precio de la casa.
            'quarters' => $request->input('quarters'),             // Número de habitaciones.
            'size' => $request->input('size'),                     // Temaño de la casa.
            'type_house_id' => $request->input('type_house'),       // id del tipo de casa.
            'published' => $request->input('published') ? '1' : '0' // Publicar casa.
        ]);

        // Sincroniza las características con la casa creada.
        $house->features()->sync($request->input('feature'));
        
        // Retorna una respuesta JSON indicando que la operación fue exitosa junto con los datos de la casa.
        return response()->json([
            'message' => 'Successful operation.',
            'data' => $house,
            'status' => 200
        ], 200);
    }

    /**
     * Crea una nueva casa basada en la información proporcionada.
     *
     * @param  \Illuminate\Http\Request  $request  Contiene los datos enviados en la solicitud.
     * @param  App\Models\House  $house  Se necesita el ID para la búsqueda en la tabla houses.
     * @param  App\Services\ImageService  $methodImage  Servicio para el control de imágenes, 
     *                                                    guardar, dar nombres y chequear existencias de imágenes antiguas.
     * @return \Illuminate\Http\JsonResponse  Retorna una respuesta JSON con el estado de la operación.
     */
    public function update(Request $request, House $house, ImageService $methodImage) : JsonResponse
    {
        // Valida la información recibida en la solicitud.
        $validator = Validator::make($request->all(), [
            'address' => 'required|string|max:255',              // Dirección es requerida, debe ser una cadena y no exceder 255 caracteres.
            'description' => 'required|string|max:100000',       // Descripción es requerida, debe ser una cadena y no exceder 100000 caracteres.
            'bathroom' => 'required|integer|min:1',              // El número de baños es requerido, debe ser un entero y al menos 1.
            'date_construction' => 'required|date|before:today', // La fecha de construcción es requerida, debe ser una fecha y antes de hoy.
            'feature' => 'required|array|min:1',                  // Las características son requeridas, deben ser un array y al menos 1 elemento.
            'floor' => 'integer|min:0',                           // El número de pisos debe ser un entero y puede ser 0.
            'images_old' => 'array|min:1',                        // Las imágenes antiguas deben ser un array y al menos 1 elemento.
            'images.*' => 'image|max:2048',                       // Cada nueva imagen es opcional, debe ser un archivo de imagen y no exceder 2048 KB.
            'price' => 'required|numeric|min:0',                  // El precio es requerido, debe ser numérico y no menor que 0.
            'quarters' => 'required|integer|min:1',               // El número de habitaciones es requerido, debe ser un entero y al menos 1.
            'type_house' => 'required|string'                      // El tipo de casa es requerido, debe ser una cadena.
        ]);

        // Si la validación falla, devuelve un error en formato JSON.
        if($validator->fails()){
            return response()->json([
                'message' => 'Failed operation',
                'error' => $validator->errors(),
                'status' => 422
            ], 422);
        }

        // Verifica si la casa existe. Si no, devuelve un error.
        if(!$house){
            return response()->json([
                'message' => 'Failed operation',
                'error' => ['Property Not Found.'],
                'status' => 422
            ], 422);
        }

        // Actualiza los atributos de la casa con los valores del request.
        $house->address = $request->input('address');                     // Actualiza la dirección.
        $house->description = $request->input('description');             // Actualiza la descripción.
        $house->bathroom = $request->input('bathroom');                   // Actualiza el número de baños.
        $house->quarters = $request->input('quarters');                   // Actualiza el número de habitaciones.
        $house->date_construction = $request->input('date_construction'); // Actualiza la fecha de construcción.
        $house->price = $request->input('price');                         // Actualiza el precio.
        $house->size = $request->input('size');                           // Actualiza el tamaño (asumiendo que este campo existe).
        $house->published = $request->input('published') ? "1" : "0";    // Actualiza el estado de publicación (booleano a entero).
        $house->features()->sync($request->input('feature'));             // Sincroniza las características con la casa.
        $house->type_house_id = $request->input('type_house');    // Asocia el tipo de casa con la instancia actual.
        $house->floor = $request->input('floor');                         // Actualiza el número de pisos.

        // Decodifica las imágenes actuales del modelo.
        $image_model = json_decode($house->images, true);
        // Verifica si hay cambios en las imágenes antiguas.
        $control_image_old = $methodImage->checkChangeImages($image_model, $request->input('images_old'));
        
        // Si se han proporcionado nuevas imágenes, las guarda y las agrega a la lista de imágenes de la casa.
        if ($request->has('images')) {
            $imagePaths = $methodImage->SaveImage($request->file('images')); // Guarda las nuevas imágenes.

            // Combina las imágenes antiguas y las nuevas en un solo array.
            $house->images = json_encode(array_merge($request->input('images_old'), $imagePaths));
            
        // Si no hay nuevas imágenes pero hay cambios en las imágenes antiguas, las actualiza.
        } else if($control_image_old){
            $house->images = json_encode($request->input('images_old'));
        }

        // Guarda los cambios en el modelo de casa.
        $house->save();

        // Retorna una respuesta JSON indicando que la operación fue exitosa junto con los datos de la casa.
        return response()->json([
            'message' => 'Successful operation.',
            'data' => $house,
            'status' => 200
        ], 200);
    }


    /**
     * Crea una nueva casa basada la informacion proporcionada.
     *
     * @param  App\Models\House  $house Se necesita el ID para la busqueda en la tabla houses
     */
    public function delete(House $house)
    {
        return $house;
    }
}
