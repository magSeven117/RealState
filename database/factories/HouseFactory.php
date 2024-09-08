<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\House>
 */
class HouseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $images = $this->faker->randomElement([
            ['images/casa1.1.webp', 
            'images/casa1.2.webp', 
            'images/casa1.3.webp', 
            'images/casa1.4.webp', 
            'images/casa1.5.webp'],
            ['images/casa2.1.webp', 
            'images/casa2.2.webp', 
            'images/casa2.3.webp', 
            'images/casa2.4.webp', 
            'images/casa2.5.webp'],
            ['images/casa3.1.webp', 
            'images/casa3.2.webp', 
            'images/casa3.3.webp', 
            'images/casa3.4.webp', 
            'images/casa3.5.webp'],
            ['images/casa4.1.webp', 
            'images/casa4.2.webp', 
            'images/casa4.3.webp', 
            'images/casa4.4.webp', 
            'images/casa4.5.webp'],
        ]);


        return [
            'address' => $this->faker->address(),
            'images' => json_encode($images),
            'price' => $this->faker->numberBetween(50000, 200000),
            'description' => $this->faker->text(),
            'size' => $this->faker->numberBetween(50, 200),
            'bathroom' => $this->faker->numberBetween(1,5),
            'quarters' => $this->faker->numberBetween(1,5),
            'floor' => $this->faker->numberBetween(1,5),

            'published' => $this->faker->randomElement([true, false]),
            'date_construction' => $this->faker->date(),
            'type_house_id' => $this->faker->numberBetween(1,9),
        ];
    }
}
