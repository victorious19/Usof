<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'login' => $this->faker->name(),
            'full_name' => $this->faker->name(),
            'profile_picture' => '0.png',
            'email' => $this->faker->unique()->safeEmail(),
            'password' => bcrypt('123'), 
            'remember_token' => Str::random(42),
            'rating' => 0,
            'role' => 'user',
        ];
    }
}
