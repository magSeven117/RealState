<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Models\Visit;
use App\Notifications\ScheduleVisit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
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
        // Verifica si la solicitud incluye el parámetro 'graphic'
        if($request->has('graphic')){
            // Crea una consulta para obtener el conteo de visitas por 'house_id'
            $query = Visit::select('house_id', DB::raw('COUNT(*) as visit_count')) 
                ->groupBy('house_id') // Agrupa los resultados por 'house_id'
                ->orderBy('visit_count', 'DESC'); // Ordena los resultados de manera descendente por el conteo de visitas

            // Si la solicitud tiene un límite, aplica el límite a la consulta
            if ($request->has('limit')) $query->limit($request->input('limit'));

            // Ejecuta la consulta y obtiene los resultados
            $query = $query->get();

            // Retorna la respuesta en formato JSON
            return response()->json([
                'message' => 'Successful operation.', // Mensaje de éxito
                'data' => $query, // Datos de la consulta
                'status' => 200 // Código de estado HTTP
            ]);
        }

        // Si no se incluye el parámetro 'graphic', se crea otra consulta
        $query = Visit::with('user')
            ->search($request->search) // Realiza la búsqueda según el parámetro 'search'
            ->visited($request->input('visited')) // Filtra por el estado 'visited' si se proporciona
            ->orderBy('date_visit', 'ASC') // Ordena por la fecha de visita de forma ascendente
            ->where('date_visit', '>=', Carbon::today()) // Filtra por fechas de visita que sean hoy o futuras
            ->pending($request->input('pending_visit')); // Filtra por el estado de 'pending_visit'

        // Si la solicitud tiene un límite, aplica el límite a la consulta
        if($request->has('limit')) $query->limit($request->input('limit'));

        // Ejecuta la consulta y obtiene los resultados
        $query = $query->get();

        // Retorna la respuesta en formato JSON
        return response()->json([
            'message' => 'Successful operation.', // Mensaje de éxito
            'data' => $query, // Datos de la consulta
            'status' => 200 // Código de estado HTTP
        ]);
    }

    /**
     * Crea una nueva visita para una casa basada en la información proporcionada.
     *
     * @param  \Illuminate\Http\Request  $request Recibe toda la del request.
     * @param  App\Models\House $house Recibe una instancia del modelo House.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(House $house, Request $request) : JsonResponse
    {
        // Validación de los datos del request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|alpha|max:20', // El nombre es obligatorio, debe ser una cadena de texto, solo letras, y máximo 20 caracteres
            'lastname' => 'required|string|alpha|max:20', // El apellido es obligatorio, debe ser una cadena de texto, solo letras, y máximo 20 caracteres
            'email' => 'required|email', // El correo electrónico es obligatorio y debe tener un formato válido
            'phone' => 'required|digits_between:7,15', // El teléfono es obligatorio y debe tener entre 7 y 15 dígitos
            'terms' => 'accepted', // Los términos deben ser aceptados
            'calendar' => 'required|date|after_or_equal:tomorrow|before_or_equal:' . now()->addDays(120)->toDateString(), // La fecha debe ser obligatoria, una fecha válida, después de mañana y antes de 120 días a partir de hoy
        ]);

        // Verificar si la validación falla
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed. Confirm the fields.', // Mensaje de error de validación
                'errors' => $validator->errors(), // Errores de validación
                'status' => 422 // Código de estado HTTP 422 (Unprocessable Entity)
            ], 422);
        }

        // Verifica si la casa existe
        if (!$house) {
            return response()->json([
                'message' => 'House not found.', // Mensaje de error si la casa no se encuentra
                'status' => 404 // Código de estado HTTP 404 (Not Found)
            ], 404);
        }

        // Crea una nueva visita utilizando los datos proporcionados en la solicitud
        $query = Visit::create([
            'name' => $request->input('name'), // Nombre del visitante
            'lastname' => $request->input('lastname'), // Apellido del visitante
            'email' => $request->input('email'), // Correo electrónico del visitante
            'phone' => $request->input('phone'), // Teléfono del visitante
            'date_visit' => $request->input('calendar'), // Fecha de la visita
            'house_id' => $house->id // ID de la casa relacionada
        ]);

        // Notifica a la casa sobre la nueva visita programada
        $house->notify(new ScheduleVisit($query));
        Cache::forget('notifications');

        // Retorna una respuesta en formato JSON con un mensaje de éxito y los datos de la visita creada
        return response()->json([
            'message' => 'Successful operation.', // Mensaje de éxito
            'data' => $query, // Datos de la visita creada
            'status' => 200 // Código de estado HTTP 200 (OK)
        ]);
    }


    /**
     * Marca la columna visited_date como visitada con la fecha de hoy.
     *
     * @param  App\Models\Visit $visit Recibe una instancia del modelo visit.
     * @param  \Illuminate\Http\Request  $request Recibe toda la del request.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAsPending(Request $request, Visit $visit) : JsonResponse
    {   
        try {
            // Establece el estado de la visita como pendiente
            $visit->pending_visit = true; // Marca la visita como pendiente

            // Asigna el ID del empleado a la visita desde los datos del request
            $visit->user_id = $request->input('employee'); // Asigna el ID del empleado

            // Guarda los cambios realizados en la visita
            $visit->save();

            // Retorna una respuesta JSON indicando que la operación fue exitosa
            return response()->json([
                'message' => 'Successful operation.', // Mensaje de éxito
                'visit' => $request->input('employee'), // Datos de la visita actualizada
                'status' => 200 // Código de estado HTTP 200 (OK)
            ], 200);
        } catch (\Throwable $e) {
            // Manejo de excepciones en caso de que ocurra un error
            return response()->json([
                'message' => 'An error occurred while creating the user.', // Mensaje de error
                'error' => $e->getMessage(), // Mensaje de error específico
                'status' => 500 // Código de estado HTTP 500 (Internal Server Error)
            ], 500);
        }
    }


    /**
     * Marca la columna visited_date como visitada con la fecha de hoy.
     *
     * @param  App\Models\Visit $visit Recibe una instancia del modelo visit.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAsVisited(Visit $visit) : JsonResponse
    {   
        try {
            // Establece la fecha de visita como la fecha actual
            $visit->visited_date = Carbon::now(); // Asigna la fecha y hora actuales a visited_date

            // Marca la visita como no pendiente
            $visit->pending_visit = false; // Cambia el estado de pending_visit a false

            // Guarda los cambios realizados en la visita
            $visit->save();

            // Retorna una respuesta JSON indicando que la operación fue exitosa
            return response()->json([
                'message' => 'Successful operation.', // Mensaje de éxito
                'visit' => $visit, // Datos de la visita actualizada
                'status' => 200 // Código de estado HTTP 200 (OK)
            ], 200);
        } catch (\Throwable $e) {
            // Manejo de excepciones en caso de que ocurra un error
            return response()->json([
                'message' => 'An error occurred while creating the user.', // Mensaje de error
                'error' => $e->getMessage(), // Mensaje de error específico
                'status' => 500 // Código de estado HTTP 500 (Internal Server Error)
            ], 500);
        }
    }


    /**
     * Eliminación de una visita.
     *
     * @param  int $visit_id Recibe un ID para la eliminación de una visita.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($visit_id) : JsonResponse
    {   
        try {
            // Busca la visita por su ID y lanza una excepción si no se encuentra
            $visit = Visit::findOrFail($visit_id); // Busca la visita con el ID proporcionado

            // Elimina la visita encontrada
            $visit->delete(); // Llama al método delete para eliminar la visita de la base de datos

            // Retorna una respuesta JSON indicando que la operación fue exitosa
            return response()->json([
                'message' => 'Successful operation.', // Mensaje de éxito
                'status' => 200 // Código de estado HTTP 200 (OK)
            ], 200);
            
        } catch (\Throwable $e) {
            // Manejo de excepciones en caso de que ocurra un error
            return response()->json([
                'message' => 'An error occurred while creating the user.', // Mensaje de error
                'error' => $e->getMessage(), // Mensaje de error específico
                'status' => 500 // Código de estado HTTP 500 (Internal Server Error)
            ], 500);
        }
    }
}
