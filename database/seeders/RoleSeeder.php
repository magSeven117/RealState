<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'employee']);

        $role = Role::find(1);
        $role->permissions()->attach([1, 2, 3]);

        $role = Role::find(2);
        $role->permissions()->attach([3]);
    }
}
