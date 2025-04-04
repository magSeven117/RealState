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

Route::controller(AdminController::class)->group(function () {
    Route::get('/dashboard', 'index')->name("dashboard")->middleware("auth");
});

Route::middleware(["auth", Users::class])->controller(RoleController::class)->group(function () {
    Route::get('/dashboard/roles', 'index')->name("roles");
    Route::post('/dashboard/role/create', 'store');
    Route::post('/dashboard/role/update', 'update');
    Route::delete('/dashboard/role/delete/{id}', 'destroy');
});

Route::middleware("auth")->controller(UserController::class)->group(function () {
    Route::get('/dashboard/users', 'index')->name("users")->middleware(Users::class);
    Route::get('/dashboard/users/create', 'create')->middleware(Users::class);
    Route::post('/dashboard/users/create', 'store')->middleware(Users::class);
    
    Route::get('/dashboard/users/update/{id}', 'edit');
    Route::post('/dashboard/users/update/{id}', 'update');
    Route::delete('/dashboard/users/delete/{id}', 'destroy')->middleware(Users::class);
});

Route::middleware(["auth", Properties::class])->controller(HouseController::class)->group(function () {
    Route::get('/dashboard/properties', 'index_administer')->name("properties");
    Route::get('/dashboard/property/create', 'create');
    Route::post('/dashboard/property/create', 'store');

    Route::get('/dashboard/property/update/{id}', 'edit');
    Route::post('/dashboard/property/update/{id}', 'update');

    Route::delete('/dashboard/property/delete/{id}', 'destroy');
});

Route::controller(VisitController::class)->group(function () {
    Route::get('/dashboard/visit', 'index')->name("visit")->middleware(["auth", Vistis::class]);
    Route::get('/dashboard/visit/pending', 'pending')->name("visit.pending")->middleware(["auth", Vistis::class]);
    Route::get('/dashboard/visit/visited', 'visited')->name("visit.visited")->middleware(["auth", Vistis::class]);

    Route::get('/visit/{id}', 'show');
    Route::post('/visit/{id}', 'create');

    Route::post('/dashboard/visit/pending/{id}/{id_employee}', 'markAsPending')->middleware(["auth", Vistis::class]);
    Route::post('/dashboard/visit/visited/{id}', 'markAsVisited')->middleware(["auth", Vistis::class]);

    Route::post('/dashboard/visit/delete/{id}', 'destroy')->middleware(["auth", Vistis::class]);
});

Route::post('/notification/{id}', [NotificationController::class, 'markRead'])->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
