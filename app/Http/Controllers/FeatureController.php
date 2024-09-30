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
            // Construye la consulta para obtener todos los registros de TypeHouse.
            $typeHouse = TypeHouse::get(); // Obtiene todos los tipos de casa.

            // Construye la consulta para obtener todos los registros de Feature.
            $feature = Feature::get(); // Obtiene todas las características.

            // Agrupa los datos obtenidos en un array.
            $data = [
                'TypeHouse' => $typeHouse, // Almacena los tipos de casa.
                'Feature' => $feature // Almacena las características.
            ];

            // Retorna una respuesta JSON con los datos de las casas y un mensaje de éxito.
            return response()->json([
                'success' => 'Successful validation', // Mensaje de éxito.
                'data' => $data, // Datos que contienen tipos de casa y características.
                'status' => 200 // Código de estado HTTP 200 (Operación exitosa).
            ]);
            
        } catch (\Throwable $e) {
            // Captura cualquier error que ocurra durante la ejecución.
            return response()->json([
                'message' => 'An error occurred while creating the user.', // Mensaje de error.
                'error' => $e->getMessage(), // Mensaje del error capturado.
                'status' => 500 // Código de estado HTTP 500 (Error interno del servidor).
            ], 500);
        }
    }

}
