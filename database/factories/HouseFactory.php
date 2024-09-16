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
            ['images/casa1-1.jpg',
            'images/casa1-2.jpg',
            'images/casa1-3.jpg',
            'images/casa1-4.jpg',
            'images/casa1-5.jpg'],

            ['images/casa2-1.jpg',
            'images/casa2-2.jpg',
            'images/casa2-3.jpg',
            'images/casa2-4.jpg',
            'images/casa2-5.jpg',
            'images/casa2-6.jpg',
            'images/casa2-7.jpg'],

            ['images/casa3-1.jpg',
            'images/casa3-2.jpg',
            'images/casa3-3.jpg',
            'images/casa3-4.jpg',
            'images/casa3-5.jpg'],

            ['images/casa4-1.jpg',
            'images/casa4-2.jpg',
            'images/casa4-3.jpg'],

            ['images/casa5-1.jpg',
            'images/casa5-2.jpg',
            'images/casa5-3.jpg'],

            ['images/casa6-1.jpg',
            'images/casa6-2.jpg',
            'images/casa6-3.jpg',
            'images/casa6-4.jpg',
            'images/casa6-5.jpg'],

            ['images/casa7-1.jpg',
            'images/casa7-2.jpg',
            'images/casa7-3.jpg'],

            ['images/casa8-1.jpg',
            'images/casa8-2.jpg',
            'images/casa8-3.jpg',
            'images/casa8-4.jpg',
            'images/casa8-5.jpg'],

            ['images/casa9-1.jpg',
            'images/casa9-2.jpg'],
            
            ['images/casa10-1.jpg',
            'images/casa10-2.jpg',
            'images/casa10-3.jpg']
        ]);

        return [
            'address' => $this->faker->streetAddress() . ', ' .
                        $this->faker->city() . ', ' .
                        $this->faker->stateAbbr() . ' ' .
                        $this->faker->postcode(),
            'images' => json_encode($images),
            'price' => $this->faker->numberBetween(50000, 500000),
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
