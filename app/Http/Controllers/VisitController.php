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
     * Visualiza la informacion de la base de datos de visitas.
     *
     * @param  \Illuminate\Http\Request  $request Contiene los datos de la solicitud.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request) : JsonResponse
    {
        $query = Visit::search($request->search)
            ->visited($request->input('visited'))
            ->orderBy('date_visit', 'ASC')
            ->pending($request->input('pending_visit'));
        
        if($request->has('limit')) $query->limit($request->input('limit'));

        Visit::whereNull('visited_date')
            ->where('date_visit', '<', Carbon::today())
            ->where('pending_visit', '!=', true)
            ->delete();

        $query = $query->get();

        return response()->json([
            'message' => 'Successful operation.',
            'data' => $query,
            'status' => 200
        ]);
    }

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

        $query = Visit::create([
            'name' => $request->input('name'),
            'lastname' => $request->input('lastname'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'date_visit' => $request->input('calendar'),
            'house_id' => $house->id
        ]);

        return response()->json([
            'message' => 'Successful operation.',
            'data' => $query,
            'status' => 200
        ]);
    }

    /**
     * Marca la columa visited_date como visitada con la fecha de hoy.
     *
     * @param  App\Models\Visit $visit Recibe una instancia del modelo visit.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAsVisited(Visit $visit) : JsonResponse
    {   
        $visit->visited_date = Carbon::now();
        $visit->save();

        return response()->json([
            'message' => 'Successful operation.',
            'visit' => $visit,
            'status' => 200
        ], 200);
    }

    /**
     * Eliminacion de una visita.
     *
     * @param  int $visit_id Recibe un ID para la eliminacion de una visita.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($visit_id) : JsonResponse
    {   
        $visit = Visit::findOrFail($visit_id);

        $visit->delete();

        return response()->json([
            'message' => 'Successful operation.',
            'status' => 200
        ], 200);
    }
}
