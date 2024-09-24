<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Services\FilterErrorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HouseController extends Controller
{
    /**
     * Muestra una lista de casas basadas en los filtros proporcionados.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Services\FilterErrorService  $errors Esta funcion es para el filtrado de errores en el get
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request, FilterErrorService $errors): JsonResponse
    {
        // Valida los filtros de entrada utilizando el servicio de validación.
        $result = $errors->filterErrorsHouses($request);

        // Si hay un error en los filtros, retorna una respuesta JSON con el mensaje de error y código de estado 422.
        if ($result['error']) {
            return response()->json([
                'message' => 'Operation failed',
                'error' => $result['message'],
                'status' => 422
            ], 422);
        }

        // Construye la consulta para obtener las casas basadas en los filtros proporcionados.
        $query = House::with(['features', 'typeHouse'])
            ->whereHas('features', function($query) use ($request){
                if($request->has('features')) {
                    $arrayFeatures = explode(",", $request->features);
                    $query->whereIn('name', $arrayFeatures);
                }
            })
            ->whereHas('features', function ($query) use ($request) {
                if ($request->has('features')) {
                    $arrayFeatures = explode(",", $request->features);
                    $query->whereIn('name', $arrayFeatures)
                        ->groupBy('house_id')
                        ->havingRaw('COUNT(DISTINCT name) = ?', [count($arrayFeatures)]);
                }
            })
            ->MaxPrice($request->maxPrice)
            ->MinPrice($request->minPrice)
            ->MinSize($request->minSize)
            ->MaxSize($request->maxSize)
            ->Quarter($request->quarter)
            ->Bath($request->bathroom)
            ->Search($request->search)
            ->TypeHouse($request->type_house);


        // Aplica el límite si está presente
        if($request->has('limit')) $query->limit($request->limit);
        
        if($request->published) $query->where('published', true);

        if($request->has('id')) $query->find($request->id);
        
        // Se llama a la consulta una vez todos los filtros aplicados
        $houses = $query->get();

        // Modifica las URLs de las imágenes en cada casa
        $houses->transform(function ($house) {
            // Asegúrate de que $house->images es un array
            if (is_string($house->images)) {
                // Convierte la cadena en un array
                $house->images = json_decode($house->images, true);
            }
    
            // Verifica si $house->images es un array antes de usar array_map
            if (is_array($house->images)) {
                $house->images = array_map(function ($image) {
                    return url('storage/' . $image);
                }, $house->images);
            }
    
            return $house;
        });

        // Retorna una respuesta JSON con los datos de las casas y un mensaje de éxito.
        return response()->json([
            'message' => 'Successful operation',
            'data' => $houses,
            'status' => 200
        ]);
    }

    /**
     * Crea una nueva casa basada la informacion proporcionada.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function create(Request $request)
    {
        return "En Creacion";
    }

    /**
     * Crea una nueva casa basada la informacion proporcionada.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  App\Models\House  $house Se necesita el ID para la busqueda en la tabla houses
     */
    public function update(Request $request, House $house)
    {
        $validator = Validator::make($request->all(),[
            'address' => 'required|string|max:255',
            'description' => 'required|string|max:100000',
            'bathroom' => 'required|integer|min:1',
            'date_construction' => 'required|date|before:today',
            'feature' => 'required|array|min:1',
            'floor' => 'required|integer|min:0',
            'images_old' => 'array|min:1',
            'images.*' => 'image|max:2048',
            'price' => 'required|numeric|min:0',
            'quarters' => 'required|integer|min:1',
            'type_house' => 'required|string'
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Operation failed',
                'error' => $validator->errors(),
                'status' => 422
            ], 422);
        }

        if(!$house){
            return response()->json([
                'message' => 'Operation failed',
                'error' => ['Property Not Found.'],
                'status' => 422
            ], 422);
        }

        $house->address = $request->input('address');
        $house->description = $request->input('description');
        $house->bathroom = $request->input('bathroom');
        $house->quarters = $request->input('quarters');
        $house->date_construction = $request->input('date_construction');
        $house->price = $request->input('price');
        $house->size = $request->input('size');
        $house->published = $request->input('published') ? "1" : "0";
        $house->features()->sync($request->input('feature'));
        $house->typeHouse()->associate($request->input('type_house'));

        $type_house = ['Mansion', 'Apartment', 'Penthouse', 'Townhouse'];
        if($request->has('floor') && in_array($request->input('type_house'), $type_house)){
            $house->floor = $request->input('floor');
        }

        $image_model = json_decode($house->images, true);
        $imagePaths = [];
        $control_image_old = false;
        
        foreach ($image_model as $value) {
            if (!in_array($value, $request->images_old)) {
                $control_image_old = true; 
                break;
            }
        }
        
        if ($request->has('images')) {
            foreach ($request->file('images') as $image) {
                if($image->isValid()){
                    $fileName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                    $path = $image->storeAs('images', $fileName, 'public');
                    array_push($imagePaths, $path);
                } else {
                    return response()->json([
                        'message' => 'The image is invalid.',
                        'error' => ['The image is invalid.'],
                        'status' => 422
                    ], 422);
                }
                
            }
            
            $house->images = json_encode(array_merge($request->input('images_old'), $imagePaths));
            
        } else if($control_image_old){
            $house->images = json_encode($request->input('images_old'));
        }

        $house->save();

        return response()->json([
            'message' => 'Operation succeful.',
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
