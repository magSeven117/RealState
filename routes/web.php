<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VisitController;
use App\Http\Middleware\Properties;
use App\Http\Middleware\Users;
use App\Http\Middleware\Vistis;
use App\Models\House;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function ()  {
    $data = House::with(['features', 'typeHouse'])->limit(6)->published(true)->get();

    $data->transform(function ($item) {
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

    return Inertia::render('Home', ['data' => $data]);
})->name("home");

Route::controller(HouseController::class)->group(function () {
    Route::get('/properties', 'index');
    Route::get('/property/{id}', 'show');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::middleware(["auth", "admin.employee"])->prefix("dashboard")->group(function () {

    // Admin Dashboard
    Route::controller(AdminController::class)->group(function () {
        Route::get('/', 'index')->name("dashboard");
    });

    // Roles
    Route::controller(RoleController::class)->group(function () {
        Route::get('/roles', 'index')->name("roles");
        Route::post('/role/create', 'store');
        Route::post('/role/update', 'update');
        Route::delete('/role/delete/{id}', 'destroy');
    });

    // Users
    Route::controller(UserController::class)->group(function () {
        Route::get('/users', 'index')->name("users")->middleware(Users::class);
        Route::get('/users/create', 'create')->middleware(Users::class);
        Route::post('/users/create', 'store')->middleware(Users::class);
        
        Route::get('/users/update/{id}', 'edit');
        Route::post('/users/update/{id}', 'update');
        Route::delete('/users/delete/{id}', 'destroy')->middleware(Users::class);
    });

    // Properties
    Route::controller(HouseController::class)->middleware(Properties::class)->group(function () {
        Route::get('/properties', 'index_administer')->name("properties");
        Route::get('/property/create', 'create');
        Route::post('/property/create', 'store');

        Route::get('/property/update/{id}', 'edit');
        Route::post('/property/update/{id}', 'update');

        Route::delete('/property/delete/{id}', 'destroy');
    });

    // Visits
    Route::controller(VisitController::class)->middleware(Vistis::class)->group(function () {
        Route::get('/visit', 'index')->name("visit");
        Route::get('/visit/pending', 'pending')->name("visit.pending");
        Route::get('/visit/visited', 'visited')->name("visit.visited");

        Route::post('/visit/pending/{id}/{id_employee}', 'markAsPending');
        Route::post('/visit/visited/{id}', 'markAsVisited');

        Route::post('/visit/delete/{id}', 'destroy');
    });
});

// Fuera del dashboard
Route::controller(VisitController::class)->group(function () {
    Route::get('/visit/{id}', 'show');
    Route::post('/visit/{id}', 'create');
});

Route::post('/notification/{id}', [NotificationController::class, 'markRead'])->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
