<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VisitController;
use App\Http\Middleware\EnsureAdmin;
use Illuminate\Support\Facades\Auth;

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
    Route::post('/visit/{house}', 'create')->name('visit');
});


Route::post('/login', [UserController::class, 'index'])->middleware('web')->name('login');

Route::controller(UserController::class)->group(function () {
    
    Route::get('/users/alls', 'showAll')->name('users.all');



    Route::post('/logout', 'logout')->name('logout');

})->middleware(['web', 'auth', EnsureAdmin::class]);

Route::middleware('web')->get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

Route::middleware(['web', 'auth', EnsureAdmin::class])->get('/authorization', function () {
    return response()->json([
        'message' => 'Authorization Completed.',
        'user' => Auth::user(),
        'status' => 200
    ], 200);
});

