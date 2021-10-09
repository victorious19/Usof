<?php


Route::group([
    'prefix'     => config('backpack.base.route_prefix', 'admin'),
    'middleware' => array_merge(
        (array) config('backpack.base.web_middleware', 'web'),
        (array) config('backpack.base.middleware_key', 'admin')
    ),
    'namespace'  => 'App\Http\Controllers\Admin',
], function () { 
    Route::crud('user', 'UserCrudController');
    Route::crud('post', 'PostCrudController');
    Route::crud('comment', 'CommentCrudController');
    Route::crud('like', 'LikeCrudController');
    Route::crud('category', 'CategoryCrudController');
    Route::crud('postcategory', 'PostCategoryCrudController');
}); 