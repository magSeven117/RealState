<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Models\User;
use App\Models\Visit;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Visualiza la informacion del Dashboard para los usuarios.
     * 
     * @return \Inertia\Inertia renderiza la visita Auth/Users
     */
    public function index()
    {
        $cache_visit = 'visit';
        $cache_house = 'house';
        $cache_users = 'users';
        $cache_pending = 'pending';
        $cache_notification = 'notification';
        Cache::flush();
        if( Cache::has($cache_house) && Cache::has($cache_notification) && Cache::has($cache_visit) && Cache::has($cache_pending) && Cache::has($cache_users) ) {
            $visit = Cache::get($cache_visit);
            $house = Cache::get($cache_house);
            $pending = Cache::get($cache_pending);
            $notification = Cache::get($cache_notification);
            $users = Cache::get($cache_users);
        } else {
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
                        return Storage::url($image); // Modifica la URL de cada imagen.
                    }, $item->images);
                }

                return $item; // Retorna el objeto de casa modificado.
            });

            $users = User::where('active', true)->limit(4)->get();

            $pending = Visit::where('pending_visit', true)->limit(4)->get();

            $notification = DatabaseNotification::whereNull('read_at')->orderBy('created_at', 'DESC')->get();

            Cache::put($cache_visit, $visit, now()->addMinutes(10));
            Cache::put($cache_house, $house, now()->addMinutes(10));
            Cache::put($cache_pending, $pending, now()->addMinutes(10));
            Cache::put($cache_notification, $notification, now()->addMinutes(10));
            Cache::put($cache_users, $users, now()->addMinutes(10));
        }
       

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
