<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\VisitController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::controller(HouseController::class)->group(function () {
    Route::get('/houses', 'index')->name('houses');
});

Route::controller(FeatureController::class)->group(function () {
    Route::get('/features', 'index')->name('features');
});

Route::controller(VisitController::class)->group(function () {
    Route::get('/visit/{id}', 'create')->name('visit');
});