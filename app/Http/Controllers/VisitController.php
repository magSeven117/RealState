<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Models\Visit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class VisitController extends Controller
{
    /**
     * Crea una nueva visita para una casa basada en la información proporcionada.
     *
     * @param  \Illuminate\Http\Request  $request Recibe toda la data del formulario.
     * @param  App\Models\House $house Recibe una instancia del modelo House.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(House $house, Request $request) : JsonResponse
    {
        // Validación de los datos del request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|alpha|max:20',
            'lastname' => 'required|string|alpha|max:20',
            'email' => 'required|email',
            'phone' => 'required|digits_between:7,15',
            'terms' => 'accepted',
            'calendar' => 'required|date|after_or_equal:tomorrow|before_or_equal:' . now()->addDays(120)->toDateString(),
        ]);

        // Verificar si la validación falla
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed. Confirm the fields.',
                'errors' => $validator->errors(),
                'status' => 422
            ], 422);
        }

        if (!$house) {
            return response()->json([
                'message' => 'House not found.',
                'status' => 404
            ], 404);
        }

        $visit = Visit::create([
            'name' => $request->input('name'),
            'lastname' => $request->input('lastname'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'date_visit' => $request->input('calendar'),
            'house_id' => $house->id
        ]);

        return response()->json([
            'message' => 'Successful operation.',
            'data' => $visit,
            'status' => 200
        ]);
    }
}
