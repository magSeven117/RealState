<?php

namespace App\Http\Controllers;

use App\Models\House;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class VisitController extends Controller
{
    /**
     * Crea una nueva casa basada la informacion proporcionada.
     *
     * @param  \Illuminate\Http\Request  $request Recibe toda la data del formulario
     * @param  App\Models\House $id Recibe un id y se busca directamente en la base de datos del modelo House
     * 
     */
    public function create(House $id, Request $request) : JsonResponse
    {
        return response()->json([
            'status' => 200,
            'message' => 'Created visit'
        ]);
    }
}
