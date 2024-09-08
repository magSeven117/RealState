<?php

use Illuminate\Support\Facades\Route;

// Sirve la vista 'index' para todas las rutas que no comienzan con 'api'
Route::get('/{path?}', function () {
    return view('index'); // Sirve la vista 'index' para la aplicación React
})->where('path', '^(?!api).*$'); // Excluye rutas que comienzan con 'api'

