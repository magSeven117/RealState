<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    /**
     * Funcion para hacer login.
     *
     * @param  \Illuminate\Http\Request  $request Recibe toda la data del formulario.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request) : JsonResponse
    {   
        $validator = Validator::make($request->all(), 
        [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:8',
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Validation failed. Confirm the fields.',
                'errors' => $validator->errors(),
                'status' => 422
            ], 422);
        }

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
    
            // Verificar si el usuario no es administrador
            if ($user->role !== 'admin') {
                Auth::logout();

                return response()->json([
                    'message' => 'You are not an administrator.',
                    'status' => 403
                ], 403);
            }
    
            // Regenerar la sesión
            $request->session()->regenerate();
    
            // Responder con éxito
            return response()->json([
                'message' => 'Successful operation.',
                'data' => $user,
                'url' => '/dashboard',
                'status' => 200
            ], 200);
        }

        return response()->json([
            'message' => 'Invalid login.',
            'status' => 400
        ], 400);
    }

    /**
     * Funcion para hacer login.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() : JsonResponse
    {
        return response()->json();
    }
}
