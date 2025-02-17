<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Visit>
 */
class VisitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date = fake()->dateTimeBetween('tomorrow', '+3 months');

        $random = random_int(0, 1);

        return [
            'name' => fake()->name(),
            'lastname' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'date_visit' => $date,
            'pending_visit' => $random,
            'visited_date' => $random ? $date : null,
            'house_id' => random_int(1, 50),
            'user_id' => random_int(1, 20),
        ];
    }
}
