<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * Visualiza la informacion de la base de datos de usuarios.
     *
     * @param  \Illuminate\Http\Request  $request Contiene los datos de la solicitud.
     * 
     * @return \Inertia\Inertia renderiza la visita Auth/Users
     */
    public function index(Request $request)
    {
        $Cache_Name = "roles_" . $request->page;
        Cache::flush();
        if(Cache::has($Cache_Name)){
            $roles = Cache::get($Cache_Name);
        } else {
            $roles = Role::paginate(10);

            $roles->getCollection()->transform(function ($role) {
                $role->permissions_array = $role->permissions->pluck('name');
                return $role;
            });

            Cache::put($Cache_Name, $roles, now()->addMinutes(60));
        }

        return Inertia::render('Auth/Roles', [
            'auth' => Auth::user()->load('roles.permissions'),
            'roles' => $roles,
            'permissions' => Permission::all(),
        ]);
    }

    /**
     * Crea un Role.
     * 
     * @param  \Illuminate\Http\Request  $request Contiene los datos de la solicitud.
     * 
     * @return \Inertia\Inertia renderiza el area para crear Roles
     */
    public function store(Request $request)
    {
        $request->validate([
            'role' => 'required|string',
            'permissions' => 'required|array'
        ]);

        $role = Role::create(['name' => $request->role]);
        $role->permissions()->sync($request->permissions);
        $role->save();

        Cache::flush();

        return redirect(route("roles"));
    }

    /**
     * Actualiza un Role.
     * 
     * @param  \Illuminate\Http\Request  $request Contiene los datos de la solicitud.
     * 
     * @return \Inertia\Inertia renderiza el area para crear Roles
     */
    public function update(Request $request)
    {
        $request->validate([
            'role' => 'required|string',
            'permissions' => 'required|array'
        ]);

        $role = Role::where('name', $request->role)->first();
        $role->permissions()->sync($request->permissions);
        $role->save();

        Cache::flush();

        return redirect(route("roles"));
    }

    /**
     * Eliminar un Role.
     * 
     * @param  int $id Contiene el Role a eliminar.
     * 
     * @return \Inertia\Inertia renderiza el area para crear Roles
     */
    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        
        Cache::flush();

        return redirect(route("roles"));
    }
}
