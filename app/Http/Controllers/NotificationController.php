<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Cache;

class NotificationController extends Controller
{
    /**
     * Visualiza la informacion de la base de datos de Notificaciones.
     *
     * @param  \Illuminate\Http\Request  $request Contiene los datos de la solicitud.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request) : JsonResponse
    {
        try {
            // Intenta obtener las notificaciones del cache
            $query = Cache::get('notifications');

            // Si no hay notificaciones en cache, proceder a consultarlas de la base de datos
            if (!$query) {
                // Realiza la consulta para obtener notificaciones no leídas, ordenadas por fecha de creación en orden descendente
                $query = DatabaseNotification::whereNull('read_at')->orderBy('created_at', 'DESC');

                // Si la solicitud incluye un parámetro 'limit', aplica el límite a la consulta
                if ($request->has('limit')) {
                    $query->limit($request->input('limit'));
                }

                // Ejecuta la consulta y obtiene las notificaciones
                $query = $query->get();

                // Para cada notificación obtenida, se añade un campo 'created_at_human' con el tiempo desde su creación en formato legible
                $query->each(function ($notification) {
                    $notification->created_at_human = Carbon::parse($notification->created_at)->diffForHumans();
                });

                // Guarda las notificaciones en cache por 5 minutos (300 segundos)
                Cache::put('notifications', $query, 300);
            }

            // Retorna una respuesta JSON con el mensaje de éxito, las notificaciones y un estado 200
            return response()->json([
                'message' => 'Successful operation.',
                'data' => $query,
                'status' => 200
            ]);

        } catch (\Throwable $e) {
            // En caso de un error, retorna una respuesta JSON con el mensaje de error y un estado 500
            return response()->json([
                'message' => 'An error occurred while creating the user.', // Considera cambiar este mensaje a algo más relevante
                'error' => $e->getMessage(), // Proporciona detalles del error
                'status' => 500
            ], 500);
        }
    }

    /**
     * Marca como leido las notificaciones.
     *
     * @param  Illuminate\Notifications\DatabaseNotification $notify La notificación a marcar como leída..
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function markRead($notify) : JsonResponse
    {
        try {
            // Intenta encontrar la notificación en la base de datos usando su ID
            $query = DatabaseNotification::find($notify);

            // Verifica si no se encontró la notificación
            if (!$query) {
                // Si no se encuentra, retorna una respuesta JSON con un mensaje de error y un estado 422 (Unprocessable Entity)
                return response()->json([
                    'message' => 'Failed operation',
                    'error' => ['Property Not Found.'], // Mensaje de error específico
                    'status' => 422
                ], 422);
            }

            // Marca la notificación como leída
            $query->markAsRead();

            // Borra la entrada de notificaciones del cache, ya que se ha actualizado
            Cache::forget('notifications');

            // Retorna una respuesta JSON indicando que la operación fue exitosa, junto con los datos de la notificación
            return response()->json([
                'message' => 'Successful operation.',
                'data' => $query, // Aquí se devuelven los detalles de la notificación
                'status' => 200 // Código de estado HTTP 200
            ], 200);

        } catch (\Throwable $e) {
            // Captura cualquier excepción que ocurra durante el proceso
            return response()->json([
                'message' => 'An error occurred while creating the user.', // Mensaje de error genérico
                'error' => $e->getMessage(), // Detalle del error capturado
                'status' => 500 // Código de estado HTTP 500 (Internal Server Error)
            ], 500);
        }
    }
}
