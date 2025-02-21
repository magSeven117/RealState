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
     * Marca como leido las notificaciones.
     *
     * @param  Illuminate\Notifications\DatabaseNotification $id La notificación a marcar como leída..
     * 
     */
    public function markRead($id) 
    {
        try {
            // Intenta encontrar la notificación en la base de datos usando su ID
            $query = DatabaseNotification::findOrFail($id);

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
            Cache::flush();

            return redirect(route("dashboard"));

        } catch (\Throwable $e) {
            // Captura cualquier excepción que ocurra durante el proceso
            return redirect(route("dashboard"));

        }
    }
}
