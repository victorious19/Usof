<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\PostCategory;
use App\Models\Post;
use App\Models\Like;
use App\Models\User;

class CategoryController extends Controller
{
    function create(Request $request) {
        if (auth()->user()->role == 'admin') {
            $request->validate([
                'title' => 'required|string|unique:categories,title',
                'description'=>'string'
            ]);
            $category = Category::create($request->all());
            return $category;
        }
        return response(['message'=>"Access denied!"], 401);
    }
    function get_all() {
        return Category::paginate(5);
    }
    function get_user_all() {
        return Category::all();
    }
    function get($category_id) {
        return Category::find($category_id);
    }
    function posts_with_category($category_id) {
        $post_category = PostCategory::where('category_id', $category_id)->get();
        $posts = [];
        foreach ($post_category as $pc) {
            $post = Post::find($pc->post_id);
            $this->more_info($post);
            $posts[] = $post;
        }
        return $posts;
    }
    function more_info($post) {
        $likes = Like::where('post_id', $post->id)->get();
        $rating = 0;
        foreach($likes as $like) {
            if ($like->type === 'like') $rating += 1;
            else $rating -= 1;
        }
        $categories = json_decode($post->categories);
        $categories_id = [];
        foreach($categories as $title) {
            $category_id = Category::where('title', $title)->first()->id;
            $categories_id[] = $category_id;
        }
        $post->categories_id = $categories_id;
        $post->rating = $rating;
        $user = User::find($post->author);
        $post->author_login = $user->login;
        $post->img = $user->profile_picture;
    }
    function update(Request $request, $category_id) {
        if (auth()->user()->role == 'admin') {
            $request->validate(['description'=>'required|string']);
            $category = Category::find($category_id);
            $category->update(['description'=>$request->description]);
            return $category;
        }
        return response(['message'=>"Access denied!"], 401);
    }
    function delete($category_id) {
        if (auth()->user()->role == 'admin') {
            $posts_category = PostCategory::where('category_id', $category_id)->get();
            foreach($posts_category as $pc) {
                $post = Post::find($pc->post_id);
                $categories = json_decode($post->categories);
                $category = Category::find($category_id);
                $categories = array_diff($categories, [$category->title]);
                $post->update(['categories'=>json_encode($categories)]);
            }
            return Category::destroy($category_id);
        }
        return response(['message'=>"Access denied!"], 401);
    }
}
