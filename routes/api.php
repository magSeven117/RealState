<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\HouseController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::controller(HouseController::class)->group(function () {
    Route::get('/houses', 'index')->name('houses');
});

Route::controller(FeatureController::class)->group(function () {
    Route::get('/features', 'index')->name('features');
});