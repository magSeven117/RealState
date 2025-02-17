<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\ProfileController;
use App\Models\House;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function ()  {
    $data = House::with(['features', 'typeHouse'])->limit(6)->get();

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

    Route::post('/houses/create', 'create');
    Route::post('/houses/update/{house}', 'update');
    Route::delete('/houses/delete/{house_id}', 'delete');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

Route::controller(AdminController::class)->group(function () {
    Route::get('/dashboard', 'index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
