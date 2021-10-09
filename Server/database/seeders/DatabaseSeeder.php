<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
         \App\Models\User::factory(10)->create();
         \DB::table('users')->insert([
             'login' => 'admin',
            'full_name' => 'vipidlatiu',
            'profile_picture' => '0.png',
            'email' => 'email@example.com',
            'password' => '$2y$10$TsrPMjIUNZcyXymh1olwf.W91WO8kITLyK6sYESA4xKGZ/gkS0AFO', 
            'remember_token' => Str::random(42),
            'rating' => 0,
            'role' => 'admin',
            ]);
         \App\Models\Post::factory(10)->create();
         \App\Models\Comment::factory(20)->create();
         \App\Models\Like::factory(40)->create();
         \App\Models\Category::factory(10)->create();
    }
}
