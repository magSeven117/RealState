<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use function Laravel\Prompts\error;

class UserController extends Controller
{
    /**
     * Funcion para hacer login.
     *
     * @param  \Illuminate\Http\Request  $request Recibe toda la data del formulario.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request) : JsonResponse
    {   
        try {
            $data = User::name($request->name)
                    ->email($request->email)
                    ->role($request->role)
                    ->get();
            
            if($request->has('id')){
                $data = User::find($request->input('id'));
            }

            return response()->json([
                'message' => 'Successful operation.',
                'data' => $data,
                'status' => 200
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while creating the user.',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }

    /**
     * Funcion para hacer login.
     * 
     * @param  \Illuminate\Http\Request  $request Recibe toda la data del formulario.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request) : JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required',
                        'email',
                        'string',
                        function ($attribute, $value, $fail) {
                            if(User::where('email', $value)->exists()){
                                $fail('The email address is already in use.');
                            }
                        }
            ],
            'name' => 'required|string|max:50',
            'password' => 'required|string|min:8',
            'role' => ['required',
                        function ($attribute, $value, $fail) {
                            if(!in_array($value, ['admin', 'employee'])){
                                $fail('Do not manipulate the values');
                            }
                        }
            ]
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Validation failed. Confirm the fields.',
                'errors' => $validator->errors(),
                'status' => 422
            ],422);
        }

        try {
            $user = User::create([
                'email' => $request->input('email'),
                'name' => $request->input('name'),
                'password' => Hash::make($request->input('password')),
                'role' => $request->input('role')
            ]);

            return response()->json([
                'message' => 'Successful operation.',
                'data' => $user,
                'status' => 200
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while creating the user.',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }

    /**
     * Funcion para hacer login.
     * 
     * @param  \Illuminate\Http\Request  $request Recibe toda la data del formulario.
     * 
     * @param int $id El ID del usuario a actualizar.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id) : JsonResponse
    {
        $user = User::find($id);

        if(!$user){
            return response()->json([
                'message' => 'User not found.',
                'errors' => 'User not found.',
                'status' => 500
            ], 500);
        }

        $validator = Validator::make($request->all(), [
            'email' => ['required',
                        'email',
                        'string',
                        function ($attribute, $value, $fail) use ($user) {
                            if(User::where('email', $value)->where('id', '!=', $user->id)->exists()){
                                $fail('The email address is already in use.');
                            }
                        }
            ],
            'name' => 'required|string|max:50',
            'password' => 'required|string|min:8|confirmed',
            'role' => ['required',
                        function ($attribute, $value, $fail) {
                            if(!in_array($value, ['admin', 'employee'])){
                                $fail('Do not manipulate the values');
                            }
                        }
            ]
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Validation failed. Confirm the fields.',
                'errors' => $validator->errors(),
                'status' => 422
            ], 422);
        }

        

        try {
            $user->email = $request->input('email');
            $user->name = $request->input('name');
            $user->password = Hash::make($request->input('password'));
            $user->role = $request->input('role');
            $user->save();

            return response()->json([
                'message' => 'Successful operation.',
                'data' => $user,
                'status' => 200
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the user.',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }


    /**
     * Funcion para hacer login.
     * 
     * @param int $id El ID del usuario a actualizar.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id) : JsonResponse
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'message' => 'User not found.',
                    'error' => 'User not found.',
                    'status' => 404
                ], 404);
            }

            $user->delete();

            return response()->json([
                'message' => 'Successful operation.',
                'status' => 200
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting the user.',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
        
    }
}
