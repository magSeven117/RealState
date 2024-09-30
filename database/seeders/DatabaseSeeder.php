<?php

namespace Database\Seeders;

use App\Models\TypeHouse;
use App\Models\User;
use App\Models\Visit;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'realstate',
            'email' => 'realstate@gmail.com',
            'password' => Hash::make('realstate'),
            'role' => 'admin'
        ]);

        $this->call(TypeHouseSeeder::class);

        $this->call(HouseSeeder::class);

        Visit::factory()->count(50)->create();

    }
}
