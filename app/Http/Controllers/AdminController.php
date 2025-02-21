<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Models\User;
use App\Models\Visit;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $visit = Visit::select('house_id', DB::raw('COUNT(*) as visit_count')) 
            ->groupBy('house_id') // Agrupa los resultados por 'house_id'
            ->orderBy('visit_count', 'DESC')
            ->limit(4)
            ->get(); // Ordena los resultados de manera descendente por el conteo de visitas
        
        $house = House::orderBy('viewed', 'Desc')->limit(4)->get();

        $house->transform(function ($item) {
            // Asegúrate de que $item->images es un array.
            if (is_string($item->images)) {
                // Convierte la cadena de imágenes en un array.
                $item->images = json_decode($item->images, true);
            }

            // Verifica si $item->images es un array antes de usar array_map.
            if (is_array($item->images)) {
                $item->images = array_map(function ($image) {
                    return url('storage/' . $image); // Modifica la URL de cada imagen.
                }, $item->images);
            }

            return $item; // Retorna el objeto de casa modificado.
        });

        $users = User::where('active', true)->limit(4)->get();

        $pending = Visit::where('pending_visit', true)->limit(4)->get();

        $notification = DatabaseNotification::whereNull('read_at')->orderBy('created_at', 'DESC')->get();

        return Inertia::render('Auth/Dashboard', [
            'visit' => $visit,
            'house' => $house,
            'user' => Auth::user(), 
            'users' => $users,
            'pending' => $pending,
            'notification' => $notification
        ]);
    }
}
