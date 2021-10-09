<?php

namespace Database\Factories;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition()
    {
        return [
            'user_id' => rand(1, 10),
            'post_id' => rand(1, 10),
            'content' => $this->faker->text(50)
        ];
    }
}
