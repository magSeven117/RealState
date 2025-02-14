<?php

namespace Database\Seeders;

use App\Models\Feature;
use App\Models\House;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Definir las características únicas que quieres crear
        $features = ['balcony', 'parking', 'garage', 'attic', 'basement', 'elevator', 'garden', 'pool', 'terrace', 'airs'];

        // Crear características únicas en la base de datos si no existen
        foreach ($features as $featureName) {
            Feature::firstOrCreate(['name' => $featureName]);
        }

        // Crear 10 casas usando el factory
        $houses = House::factory()->count(50)->create();

        // Asignar características a cada casa asegurándote de que sean únicas
        foreach ($houses as $house) {
            // Obtener un número aleatorio de características (1 a 5)
            $randomFeatureIds = Feature::inRandomOrder()->take(rand(1, 5))->pluck('id')->toArray();

            // Asignar estas características a la casa
            $house->features()->sync($randomFeatureIds);
        }
    }
}
