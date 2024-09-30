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
     * Función de visualización de la base de datos de usuarios.
     *
     * @param  \Illuminate\Http\Request  $request Recibe toda la data del formulario.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request) : JsonResponse
    {   
        try {
            // Verifica si se ha proporcionado un ID en la solicitud.
            if ($request->has('id')) {
                // Busca un usuario por su ID y lo almacena en la variable $query.
                $query = User::find($request->input('id'));
                // Retorna la respuesta en formato JSON con el usuario encontrado.
                return response()->json([
                    'message' => 'Successful operation.', // Mensaje de éxito.
                    'data' => $query, // Datos del usuario encontrado.
                    'status' => 200 // Código de estado HTTP 200.
                ], 200);
            }

            // Realiza una consulta en el modelo User aplicando filtros según el nombre, email y rol.
            $query = User::name($request->input('name'))
                    ->email($request->input('email'))
                    ->role($request->input('role'));
            
            // Aplica el límite de resultados si está presente en la solicitud.
            if ($request->has('limit')) {
                $query->limit($request->limit);
            }

            // Ejecuta la consulta y obtiene los resultados.
            $query = $query->get();

            // Retorna la respuesta en formato JSON con los usuarios encontrados.
            return response()->json([
                'message' => 'Successful operation.', // Mensaje de éxito.
                'data' => $query, // Datos de los usuarios encontrados.
                'status' => 200 // Código de estado HTTP 200.
            ], 200);

        } catch (\Exception $e) {
            // Captura cualquier excepción y retorna un mensaje de error.
            return response()->json([
                'message' => 'An error occurred while creating the user.', // Mensaje de error.
                'error' => $e->getMessage(), // Mensaje de la excepción.
                'status' => 500 // Código de estado HTTP 500 (error interno del servidor).
            ], 500);
        }
    }


    /**
     * Función de creación de la base de datos de usuario.
     * 
     * @param  \Illuminate\Http\Request  $request Recibe toda la data del formulario.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request) : JsonResponse
    {
        // Se crea un validador para validar los datos recibidos en la solicitud.
        $validator = Validator::make($request->all(), [
            'email' => [
                'required', // El email es obligatorio.
                'email', // Debe ser un formato de email válido.
                'string', // Debe ser una cadena de texto.
                function ($attribute, $value, $fail) {
                    // Verifica si el email ya está en uso.
                    if(User::where('email', $value)->exists()){
                        $fail('The email address is already in use.'); // Mensaje de error si el email ya existe.
                    }
                }
            ],
            'name' => 'required|string|max:50', // Nombre obligatorio, debe ser una cadena y tener máximo 50 caracteres.
            'password' => 'required|string|min:8', // Contraseña obligatoria, debe ser una cadena y tener al menos 8 caracteres.
            'role' => [
                'required', // El rol es obligatorio.
                function ($attribute, $value, $fail) {
                    // Verifica si el rol es válido.
                    if(!in_array($value, ['admin', 'employee'])){
                        $fail('Do not manipulate the values'); // Mensaje de error si el rol no es válido.
                    }
                }
            ]
        ]);

        // Si la validación falla, retorna un mensaje de error.
        if($validator->fails()){
            return response()->json([
                'message' => 'Validation failed. Confirm the fields.', // Mensaje de error de validación.
                'error' => $validator->errors(), // Errores de validación.
                'status' => 422 // Código de estado HTTP 422 (Error de validación).
            ], 422);
        }

        try {
            // Crea un nuevo usuario en la base de datos.
            $user = User::create([
                'email' => $request->input('email'), // Asigna el email recibido.
                'name' => $request->input('name'), // Asigna el nombre recibido.
                'password' => Hash::make($request->input('password')), // Hash de la contraseña para seguridad.
                'role' => $request->input('role') // Asigna el rol recibido.
            ]);

            // Retorna la respuesta en formato JSON con el usuario creado.
            return response()->json([
                'message' => 'Successful operation.', // Mensaje de éxito.
                'data' => $user, // Datos del usuario creado.
                'status' => 200 // Código de estado HTTP 200.
            ], 200);
        } catch (\Exception $e) {
            // Captura cualquier excepción y retorna un mensaje de error.
            return response()->json([
                'message' => 'An error occurred while creating the user.', // Mensaje de error.
                'error' => $e->getMessage(), // Mensaje de la excepción.
                'status' => 500 // Código de estado HTTP 500 (error interno del servidor).
            ], 500);
        }
    }


    /**
     * Función de actualización de la base de datos de usuario.
     * 
     * @param  \Illuminate\Http\Request  $request Recibe toda la data del formulario.
     * 
     * @param int $id El ID del usuario a actualizar.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id) : JsonResponse
    {
        // Busca al usuario por su ID.
        $user = User::find($id);

        // Verifica si el usuario no fue encontrado.
        if(!$user){
            return response()->json([
                'message' => 'User not found.', // Mensaje de error si el usuario no se encuentra.
                'error' => 'User not found.', // Mensaje de error adicional.
                'status' => 500 // Código de estado HTTP 500.
            ], 500);
        }

        // Se crea un validador para validar los datos recibidos en la solicitud.
        $validator = Validator::make($request->all(), [
            'email' => [
                'required', // El email es obligatorio.
                'email', // Debe ser un formato de email válido.
                'string', // Debe ser una cadena de texto.
                function ($attribute, $value, $fail) use ($user) {
                    // Verifica si el email ya está en uso por otro usuario.
                    if(User::where('email', $value)->where('id', '!=', $user->id)->exists()){
                        $fail('The email address is already in use.'); // Mensaje de error si el email ya existe.
                    }
                }
            ],
            'name' => 'required|string|max:50', // Nombre obligatorio, debe ser una cadena y tener máximo 50 caracteres.
            'password' => 'required|string|min:8|confirmed', // Contraseña obligatoria, debe ser una cadena, tener al menos 8 caracteres y estar confirmada.
            'role' => [
                'required', // El rol es obligatorio.
                function ($attribute, $value, $fail) {
                    // Verifica si el rol es válido.
                    if(!in_array($value, ['admin', 'employee'])){
                        $fail('Do not manipulate the values'); // Mensaje de error si el rol no es válido.
                    }
                }
            ]
        ]);

        // Si la validación falla, retorna un mensaje de error.
        if($validator->fails()){
            return response()->json([
                'message' => 'Validation failed. Confirm the fields.', // Mensaje de error de validación.
                'error' => $validator->errors(), // Errores de validación.
                'status' => 422 // Código de estado HTTP 422 (Error de validación).
            ], 422);
        }

        try {
            // Asigna los nuevos valores al usuario.
            $user->email = $request->input('email'); // Actualiza el email.
            $user->name = $request->input('name'); // Actualiza el nombre.
            $user->password = Hash::make($request->input('password')); // Hash de la nueva contraseña para seguridad.
            $user->role = $request->input('role'); // Actualiza el rol.
            $user->save(); // Guarda los cambios en la base de datos.

            // Retorna la respuesta en formato JSON con el usuario actualizado.
            return response()->json([
                'message' => 'Successful operation.', // Mensaje de éxito.
                'data' => $user, // Datos del usuario actualizado.
                'status' => 200 // Código de estado HTTP 200.
            ], 200);
        } catch (\Exception $e) {
            // Captura cualquier excepción y retorna un mensaje de error.
            return response()->json([
                'message' => 'An error occurred while updating the user.', // Mensaje de error.
                'error' => $e->getMessage(), // Mensaje de la excepción.
                'status' => 500 // Código de estado HTTP 500 (error interno del servidor).
            ], 500);
        }
    }

    /**
     * Función de eliminación de la base de datos de usuario.
     * 
     * @param int $id El ID del usuario a eliminar.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id) : JsonResponse
    {
        try {
            // Busca al usuario por su ID.
            $user = User::find($id);

            // Verifica si el usuario no fue encontrado.
            if (!$user) {
                return response()->json([
                    'message' => 'User not found.', // Mensaje de error si el usuario no se encuentra.
                    'error' => 'User not found.', // Mensaje de error adicional.
                    'status' => 404 // Código de estado HTTP 404 (No encontrado).
                ], 404);
            }

            $user->delete(); // Elimina al usuario.

            // Retorna la respuesta en formato JSON indicando que la operación fue exitosa.
            return response()->json([
                'message' => 'Successful operation.', // Mensaje de éxito.
                'status' => 200 // Código de estado HTTP 200.
            ], 200);

        } catch (\Exception $e) {
            // Captura cualquier excepción y retorna un mensaje de error.
            return response()->json([
                'message' => 'An error occurred while deleting the user.', // Mensaje de error.
                'error' => $e->getMessage(), // Mensaje de la excepción.
                'status' => 500 // Código de estado HTTP 500 (error interno del servidor).
            ], 500);
        }
    }

}
