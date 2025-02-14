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
            ['images/casa-1-1.jpg',
            'images/casa-1-2.jpg',
            'images/casa-1-3.jpg'],

            ['images/casa-2-1.jpg',
            'images/casa-2-2.jpg',
            'images/casa-2-3.jpg',],
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
