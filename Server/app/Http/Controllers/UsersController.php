<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    function index() {
        return User::orderBy('rating', 'DESC')->paginate(5);
    }
    function user_info($id) {
        $user = User::find($id);
        if (empty($user)) return response(['message'=>"User is not found"], 404);
        return response($user, 201);
    }
    function store(Request $request)
    {
        $user = User::where('login', auth()->user()->login)->first();
        if (empty($user)) return 'empty';
        if ($user['role'] != 'admin') return response(['message'=>"Access denied!"], 401);
        $request->validate([
            'login' => 'required|string|unique:users,login',
            'password'=>'required|confirmed',
            'full_name'=>'required|string',
            'email'=>'required|string|unique:users,email',
            'profile_picture'=>'string'
        ]);
        $request['password'] = bcrypt($request['password']);
        $user = User::create($request->all());
        $token = $user->createToken('remember_token')->plainTextToken;
        $user->remember_token = $token;
        $user->save();
        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }
    function update(Request $request, $id) {
        $request->validate([
            'login' => 'string|unique:users,login',
            'full_name'=>'string',
            'email'=>'string|unique:users,email',
            'profile_picture'=>'image'
        ]);
        if(isset($request['password'])) $request['password'] = bcrypt($request['password']);
        $user = User::find($id);
        if (empty($user)) return response(['message'=>"User is not found"], 404);
        if (auth()->user()->role != 'admin' && $user->id != auth()->user()->id) {
            return response(['message'=>"Access denied!"], 401);
        }
        if(auth()->user()->role != 'admin') $user->role = 'user';

        $user->update($request->all());

        if (isset($request->profile_picture))  {
            $img_name = $user->id.'.'.$request->profile_picture->extension();
            $path = 'public/images/'.$img_name;
            if ($user->profile_picture != '0.png' && file_exists($path)) unlink($path);
            $request->profile_picture->move(public_path('images'), $img_name);
            $user->update(['profile_picture' => $img_name]);
        }
        return response($user, 201);
    }
    function delete($id) {
        $user = User::find($id);
        if (auth()->user()->role != 'admin' && $user->id != auth()->user()->id) {
            return response(['message'=>"Access denied!"], 401);
        }
        else {
            if (empty($user)) return response(['message'=>"User is not found"], 404);
            User::destroy($id);
            return response('Successfully removed!',201);
        }
    }
    function avatar(Request $request) {
        $request->validate(['profile_picture' => 'required|image']);
        $user = auth()->user();
        $img_name = $user->id.'.'.$request->profile_picture->extension();
        $path = 'public/images/'.$img_name;
        if ($user->profile_picture != '0.png' && file_exists($path)) unlink($path);
        $request->profile_picture->move(public_path('images'), $img_name);
        $user->update(['profile_picture' => $img_name]);
        return response($user, 201);
    }
}
