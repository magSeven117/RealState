<?php

namespace Database\Seeders;

use App\Models\TypeHouse;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeHouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $array = [
            'townhouse',
            'apartment',
            'penthouse',
            'chalet',
            'cabin',
            'mansion',
            'farm house',
            'annexe',
            'house'
        ];

        foreach ($array as $item) {
            TypeHouse::create([
                'name' => $item
            ]);
        }
        
    }
}
