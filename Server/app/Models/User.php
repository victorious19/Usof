<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory, Notifiable, HasApiTokens;


    protected $fillable = [
        'login',
        'full_name',
        'profile_picture',
        'email',
        'password',
        'rating',
        'role',
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];
}
