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
            'Townhouse',
            'Apartment',
            'Penthouse',
            'Chalet',
            'Cabin',
            'Mansion',
            'Farm House',
            'Annexe',
            'House'
        ];

        foreach ($array as $item) {
            TypeHouse::create([
                'type_house' => $item
            ]);
        }
        
    }
}
