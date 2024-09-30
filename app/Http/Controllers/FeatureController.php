<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Models\TypeHouse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FeatureController extends Controller
{
    /**
     * Muestra los datos de TypeHouses y Features.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            // Construye la consulta para obtener las casas basadas en los filtros proporcionados.
            $typeHouse = TypeHouse::get();
            $feature = Feature::get();

            $data = [
                'TypeHouse' => $typeHouse,
                'Feature' => $feature
            ];

            // Retorna una respuesta JSON con los datos de las casas y un mensaje de éxito.
            return response()->json([
                'success' => 'Successful validation',
                'data' => $data,
                'status' => 200
            ]);
            
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'An error occurred while creating the user.',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
        
    }
}
