<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VisitController;
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
    Route::get('/propertie/{id}', 'show');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

Route::controller(AdminController::class)->group(function () {
    Route::get('/dashboard', 'index')->name("dashboard")->middleware("auth");
});

Route::middleware("auth")->controller(UserController::class)->group(function () {
    Route::get('/dashboard/users', 'index')->name("users");
    Route::get('/dashboard/users/create', 'create');
    Route::post('/dashboard/users/create', 'store');
    
    Route::get('/dashboard/users/update/{id}', 'edit');
    Route::post('/dashboard/users/update/{id}', 'update');
    Route::delete('/dashboard/users/delete/{id}', 'destroy');
});

Route::middleware("auth")->controller(HouseController::class)->group(function () {
    Route::get('/dashboard/properties', 'index_administer')->name("properties");
    Route::get('/dashboard/propertie/create', 'create');
    Route::post('/dashboard/propertie/create', 'store');

    Route::get('/dashboard/propertie/update/{id}', 'edit');
    Route::post('/dashboard/propertie/update/{id}', 'update');

    Route::delete('/dashboard/propertie/delete/{id}', 'destroy');
});

Route::controller(VisitController::class)->group(function () {
    Route::get('/dashboard/visit', 'index')->name("visit")->middleware("auth");
    
    Route::get('/visit/{id}', 'show');
    Route::post('/visit/{id}', 'create');

    Route::post('/dashboard/visit/pending/{id}/{id_employee}', 'markAsPending')->middleware("auth");
    Route::post('/dashboard/visit/visited/{id}', 'markAsVisited')->middleware("auth");

    Route::post('/dashboard/visit/delete/{id}', 'destroy')->middleware("auth");
});

Route::post('/notification/{id}', [NotificationController::class, 'markRead'])->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
