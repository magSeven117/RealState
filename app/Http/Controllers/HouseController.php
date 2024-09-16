<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Services\FilterErrorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
                'status' => 200
            ]);
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
        return $house;
    }

    /**
     * Crea una nueva casa basada la informacion proporcionada.
     *
     * @param  App\Models\House  $house Se necesita el ID para la busqueda en la tabla houses
     */
    public function destroy(House $house)
    {
        return $house;
    }
}
