<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Models\User;
use App\Models\Visit;
use App\Notifications\ScheduleVisit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class VisitController extends Controller
{
    /**
     * Visualiza la informacion de la base de datos de visitas.
     *
     * @param  \Illuminate\Http\Request  $request Contiene los datos de la solicitud.
     * 
     * @return \Inertia\Inertia renderiza la visa Auth/Visit
     */
    public function index(Request $request)
    {
        // Si no se incluye el parámetro 'graphic', se crea otra consulta
        $query = Visit::with('user')
            ->search($request->search) // Realiza la búsqueda según el parámetro 'search'
            ->visited($request->input('visited')) // Filtra por el estado 'visited' si se proporciona
            ->orderBy('date_visit', 'ASC') // Ordena por la fecha de visita de forma ascendente
            ->where('date_visit', '>=', Carbon::today()) // Filtra por fechas de visita que sean hoy o futuras
            ->pending($request->input('pending_visit')) // Filtra por el estado de 'pending_visit'
            ->paginate(30); 

        // Renderiza inertia
        return Inertia::render('Auth/Visit' ,[
            'auth' => [
                'name' => 'Nestor',
                'id' => 1
            ], 
            'visit' => $query, // Datos de la consulta
            'users' => User::all(),
        ]);
    }

    /**
     * Visualiza la informacion de la base de datos de visitas.
     *
     * @param  \Illuminate\Http\Request  $request Contiene los datos de la solicitud.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function graphic(Request $request) : JsonResponse
    {
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

    
    /**
     * Crea una nueva visita para una casa basada en la información proporcionada.
     *
     * @param  \Illuminate\Http\Request  $request Recibe toda la del request.
     * @param  App\Models\House $house Recibe una instancia del modelo House.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function create($id, Request $request) : JsonResponse
    {
        // Validación de los datos del request
        $request->validate([
            'name' => 'required|string|alpha|max:20', // El nombre es obligatorio, debe ser una cadena de texto, solo letras, y máximo 20 caracteres
            'lastname' => 'required|string|alpha|max:20', // El apellido es obligatorio, debe ser una cadena de texto, solo letras, y máximo 20 caracteres
            'email' => 'required|email', // El correo electrónico es obligatorio y debe tener un formato válido
            'phone' => 'required|digits_between:7,15', // El teléfono es obligatorio y debe tener entre 7 y 15 dígitos
            'terms' => 'accepted', // Los términos deben ser aceptados
            'calendar' => 'required|date|after_or_equal:tomorrow|before_or_equal:' . now()->addDays(120)->toDateString(), // La fecha debe ser obligatoria, una fecha válida, después de mañana y antes de 120 días a partir de hoy
        ]);

        $house = House::findOrFail($id);

        // Verifica si la casa existe
        if (!$house) {
            return redirect(route("visit"));
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

        Cache::flush();

        // Retorna una respuesta en formato JSON con un mensaje de éxito y los datos de la visita creada
        return response()->json([
            'notify' => $query, // Datos de la visita creada
        ]);
    }


    /**
     * Marca la columna visited_date como visitada con la fecha de hoy.
     *
     * @param  int $id Recibe un ID para el Modelo Visit.
     * @param  int $id_employee Recibe un ID para el Modelo Visit en la columna user_id.
     * 
     * @return \Inertia\Inertia redirecciona a route("visit")
     */
    public function markAsPending($id, $id_employee)
    {   
        try {
            $visit = Visit::findOrFail($id);

            // Establece el estado de la visita como pendiente
            $visit->pending_visit = true; // Marca la visita como pendiente

            // Asigna el ID del empleado a la visita desde los datos del request
            $visit->user_id = $id_employee; // Asigna el ID del empleado

            // Guarda los cambios realizados en la visita
            $visit->save();

            Cache::flush();

            // Retorna a la pagina principal
            return redirect(route("visit"));
        } catch (\Throwable $e) {
            // Retorna a la pagina principal
            return redirect(route("visit"));
        }
    }


    /**
     * Marca la columna visited_date como visitada con la fecha de hoy.
     *
     * @param  int $id Recibe un ID para el Modelo Visit.
     * 
     * @return \Inertia\Inertia redirecciona a route("visit")
     */
    public function markAsVisited($id)
    {   
        try {
            $visit = Visit::findOrFail($id);

            // Establece la fecha de visita como la fecha actual
            $visit->visited_date = Carbon::now(); // Asigna la fecha y hora actuales a visited_date

            // Marca la visita como no pendiente
            $visit->pending_visit = false; // Cambia el estado de pending_visit a false

            // Guarda los cambios realizados en la visita
            $visit->save();

            Cache::flush();

            // Retorna a la pagina principal
            return redirect(route("visit"));
        } catch (\Throwable $e) {
            // Retorna a la pagina principal
            return redirect(route("visit"));
        }
    }


    /**
     * Eliminación de una visita.
     *
     * @param  int $id Recibe un ID para la eliminación de una visita.
     * 
     * @return \Inertia\Inertia redirecciona a route("visit")
     */
    public function destroy($id)
    {   
        try {
            // Busca la visita por su ID y lanza una excepción si no se encuentra
            $visit = Visit::findOrFail($id); // Busca la visita con el ID proporcionado

            // Elimina la visita encontrada
            $visit->delete(); // Llama al método delete para eliminar la visita de la base de datos

            Cache::flush();

            // Retorna a la pagina principal
            return redirect(route("visit"));
            
        } catch (\Throwable $e) {
            // Retorna a la pagina principal
            return redirect(route("visit"));
        }
    }
}
