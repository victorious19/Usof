<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMail;

class AuthController extends Controller
{
    function register(Request $request) {
        $request->validate([
            'login' => 'required|string|unique:users,login',
            'password'=>'required|confirmed',
            'full_name'=>'required|string',
            'email'=>'required|string|unique:users,email',
            'profile_picture'=>'string'
        ]);
        $request['password'] = bcrypt($request['password']);
        $user = User::create($request->all());
        $user->update(['role'=>'user']);
        $token = $user->createToken('remember_token')->plainTextToken;
        $user->remember_token = $token;
        $user->save();
        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }
    function login(Request $request) {
        $auth = $request->only(['login', 'password']);
        if (empty($auth['login']) or empty($auth['password'])) {
            return response(['message'=>"Empty fields"], 422);
        }
        $user = User::where('login', $auth['login'])->first();
        if (empty($user)) $user = User::where('email', $auth['login'])->first();
        if (empty($user) or !Hash::check($auth['password'], $user->password)){
            return response(['message'=>"Bad login or password"], 400);
        }
        $token = $user->createToken('remember_token')->plainTextToken;
        $user->remember_token = $token;
        $user->save();
        $response = [
            'user' => $user,
            'token' => $token
        ];
        return response($response, 201);
    }
    static function logout() {
        auth()->user()->tokens()->delete();
        return [
            'message' => 'Logged out'
        ];
    }
    function passwordReset(Request $request) {
        $request->validate(['email'=>'required|string']);
        $email = $request->input('email');
        $user = User::where('email', $email)->first();
        if (empty($user)) return response(['message' => 'User does not exist!'], 404);
        $token = $user->createToken('remember_token')->plainTextToken;
        $user->remember_token = $token;
        $user->save();
        
        $this->sendEmail($email,$user->login,$token);
        return $token;
    }

    function sendEmail($email,$login,$token) {
        $obj = new \stdClass();
        $obj->login = $login;
        $obj->link = 'http://localhost:3000/password-reset/'.$token;
        Mail::to($email)->send(new SendMail($obj));
    }

    function passwordChange(Request $request, $token) {
        $user = User::where('remember_token', $token)->first();
        $request->validate(['password'=>'required']);
        if (empty($user)) return response(['message' => 'Invalid token!'], 400);
        $password = $request['password'];
        $user->password = bcrypt($password);
        $user->save();
        return response('A password has been changed', 201);
    }

}
