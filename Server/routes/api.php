<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('/login', 'App\Http\Controllers\AuthController@login');
    Route::post('/register', 'App\Http\Controllers\AuthController@register');
    Route::post('/password-reset', 'App\Http\Controllers\AuthController@passwordReset');
    Route::post('/password-reset/{confirm_token}', 'App\Http\Controllers\AuthController@passwordChange');

});

Route::group(['prefix' => 'posts'], function () {
    Route::get('', 'App\Http\Controllers\PostController@show_pages');
    Route::get('/search', 'App\Http\Controllers\PostController@search');
    Route::get('{id}', 'App\Http\Controllers\PostController@find_index');
    Route::get('{id}/like', 'App\Http\Controllers\LikeController@get_post_like');
    Route::get('{id}/categories', 'App\Http\Controllers\PostController@get_categories');
    Route::get('{id}/comments', 'App\Http\Controllers\CommentController@get_all_comment');
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/auth/logout', 'App\Http\Controllers\AuthController@logout');
    Route::group(['prefix' => 'users'], function() {
        Route::post('', 'App\Http\Controllers\UsersController@store');
        Route::post('/avatar', 'App\Http\Controllers\UsersController@avatar');
        Route::get('/myposts', 'App\Http\Controllers\PostController@get_my_posts');
        Route::post('/{id}', 'App\Http\Controllers\UsersController@update');
        Route::delete('/{id}', 'App\Http\Controllers\UsersController@delete');
    });
    Route::group(['prefix' => 'posts'], function () {
        Route::post('', 'App\Http\Controllers\PostController@create_post');
        Route::post('{id}/comments', 'App\Http\Controllers\CommentController@create_comment');
        Route::delete('{id}', 'App\Http\Controllers\PostController@delete');
        Route::post('{id}/like', 'App\Http\Controllers\LikeController@put_post_like');
        Route::get('{id}/mylike', 'App\Http\Controllers\LikeController@get_my_postlike');
        Route::delete('{id}/like', 'App\Http\Controllers\LikeController@delete_post_like');
        Route::patch('{id}', 'App\Http\Controllers\PostController@update');
    });
    Route::group(['prefix' => 'comments'], function () {
        Route::post('{id}/like', 'App\Http\Controllers\LikeController@put_comment_like');
        Route::get('{id}/mylike', 'App\Http\Controllers\LikeController@get_my_commentlike');
        Route::patch('{id}', 'App\Http\Controllers\CommentController@update');
        Route::delete('{id}', 'App\Http\Controllers\CommentController@delete');
        Route::delete('{id}/like', 'App\Http\Controllers\LikeController@delete_comment_like');
    });
    Route::group(['prefix' => 'categories'], function () {
        Route::post('', 'App\Http\Controllers\CategoryController@create');
        Route::patch('{id}', 'App\Http\Controllers\CategoryController@update');
        Route::delete('{id}', 'App\Http\Controllers\CategoryController@delete');
    });
});

Route::group(['prefix' => 'users'], function() {
    Route::get('', 'App\Http\Controllers\UsersController@index');
    Route::get('/{id}', 'App\Http\Controllers\UsersController@user_info');
    Route::get('/{id}/posts', 'App\Http\Controllers\PostController@get_user_posts');
});

Route::group(['prefix' => 'comments'], function () {
    Route::get('{id}', 'App\Http\Controllers\CommentController@get_comment');
    Route::get('{id}/like', 'App\Http\Controllers\LikeController@get_comment_like');
});
Route::get('/all_categories', 'App\Http\Controllers\CategoryController@get_user_all');
Route::group(['prefix' => 'categories'], function () {
    Route::get('', 'App\Http\Controllers\CategoryController@get_all');
    Route::get('{id}', 'App\Http\Controllers\CategoryController@get');
    Route::get('{id}/posts', 'App\Http\Controllers\CategoryController@posts_with_category');
});
