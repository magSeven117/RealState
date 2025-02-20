<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $Cache_Name = "users_" . $request->page;

        if(Cache::has($Cache_Name)){
            $users = Cache::get($Cache_Name);
        } else {
            $users = User::paginate(15);

            Cache::put($Cache_Name, $users, now()->addMinutes(60));
        }

        return Inertia::render('Auth/Users', [
            'auth' => [
                'name'=>'Nestor',
                'id' => 1,
            ],
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Auth/CreateUser',[
            'auth' => [
                'name' => "Nestor",
                'id' => '1',
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|string|unique:users,email',
            'password' => 'required|string',
            'role' => 'required|string'
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->input('password')),
            'role' => $request->role,
        ]);

        Cache::flush();

        return redirect(route("users"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('Auth/UpdateUser', [
            'auth' => [
                'name' => 'Nestor',
                'id' => 1
            ],
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => [
                'required',
                'email',
                'string',
                Rule::unique('users', 'email')->ignore($id),
                
            ],
            'password' => 'required|string',
            'role' => 'required|string'
        ]);

        User::findOrFail($id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->input('password')),
            'role' => $request->role,
        ]);

        Cache::flush();

        return redirect(route("users"));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        User::findOrFail($id)->delete;

        Cache::flush();

        return redirect(route('users'));
    }
}
