<?php

namespace Database\Factories;

use App\Models\Like;
use Illuminate\Database\Eloquent\Factories\Factory;

class LikeFactory extends Factory
{
    protected $model = Like::class;

    public function definition()
    {
        return rand(0,1)?[
            'user_id' => rand(1, 10),
            'post_id' => rand(1, 10),
            'type' =>rand(0,1)?'like':'dislike'
        ]: [
                'user_id' => rand(1, 10),
                'comment_id'=> rand(1, 20),
                'type' =>rand(0,1)?'like':'dislike'
            ];
    }
}
