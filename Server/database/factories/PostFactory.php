<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition()
    {
        return [
            'author' => rand(1, 10),
            'title' => $this->faker->text(10),
            'content' => $this->faker->text(100),
            'status' => 'active',
            'categories' => '[]'
        ];
    }
}
