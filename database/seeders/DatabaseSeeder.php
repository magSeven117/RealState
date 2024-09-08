<?php

namespace Database\Seeders;

use App\Models\TypeHouse;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(TypeHouseSeeder::class);

        $this->call(HouseSeeder::class);
    }
}
