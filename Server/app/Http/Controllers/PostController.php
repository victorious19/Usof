<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Models\PostCategory;
use App\Models\Category;
use App\Models\Like;
use App\Models\User;

class PostController extends Controller
{
    function create_post(Request $request) {
        $request->validate([
            'title' => 'required',
            'author' => 'required',
            'content' => 'required',
            'categories' => 'json'
        ]);
        $request['author'] = auth()->user()->id;
        $post = Post::create($request->all());
        $categories = json_decode($request['categories']);
        foreach($categories as $title) {
            $category = Category::where('title', $title)->first();
            if (empty($category)) $category = Category::create(['title' => $title]);
            PostCategory::create([
                'post_id' => $post->id,
                'category_id' => $category->id
            ]);
        }
        return response($post, 201);
    }
    function show_pages(Request $request) {
        if($request->sort) {
            $sort_params = explode(',', $request->sort);
            if (!($sort_params[0] == 'created_at' || $sort_params[0] == 'title') ||
                !($sort_params[1] == 'asc' || $sort_params[1] == 'desc')) {
                $sort_params = ['created_at', 'desc'];
            }
        }
        else $sort_params = ['created_at', 'desc'];
        if (auth()->user() && auth()->user()->role != 'admin') {
            $posts = Post::where('status', 'active')->orderBy($sort_params[0], $sort_params[1]);
        }
        else $posts = Post::orderBy($sort_params[0], $sort_params[1]);
        $posts = $posts->paginate(5);

        foreach($posts as $post) {
            $this->more_info($post);
        }
        return $posts;
    }
    function search(Request $request) {
        if ($request->search_value) {
            $posts = Post::where('status', 'active')->where('title', 'LIKE', '%' . $request->search_value . '%')->orWhere('content', 'LIKE', '%' . $request->search_value . '%')->get();
            foreach($posts as $post) {
                $this->more_info($post);
            }
            return $posts;
        }
        else return null;
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
    function find_index($id) {
        $post = Post::find($id);
        if (empty($post)) return response(['message'=>"Post is not found"], 404);
        $this->more_info($post);
        return response($post, 201);
    }
    function delete($id) {
        $post = Post::find($id);
        if (auth()->user()->role != 'admin' && $post->author != auth()->user()->id) {
            return response(['message'=>"Access denied!"], 401);
        }
        else {
            if (empty($post)) return response(['message'=>"Post is not found"], 404);

            return Post::destroy($id);
        }
    }
    function update(Request $request, $post_id) {
        $request->validate([
            'title' => 'string',
            'content' => 'string',
            'status' => 'string',
            'categories' => 'json'
        ]);
        $post = Post::find($post_id);
        if ($post->author != auth()->user()->id && auth()->user()->role != 'admin') {
            return response(['message'=>"Access denied!"], 401);
        }
        $categories = json_decode($request['categories']);
        $post = Post::find($post_id);
        foreach($categories as $title) {
            $category = Category::where('title', $title)->first();
            if (empty($category)) $category = Category::create(['title' => $title]);
            $post_category = PostCategory::create([
                'post_id' => $post->id,
                'category_id' => $category->id
            ]);
        }
        return $post->update($request->all());
    }
    function get_categories($post_id) {
        return Post::find($post_id)->categories;
    }
    function get_my_posts() {
        $posts = Post::where('author', auth()->user()->id)->orderBy('updated_at', 'DESC')->paginate(5);
        foreach($posts as $post) {
            $this->more_info($post);
        }
        return $posts;
    }
    function get_user_posts($user_id) {
        $posts = Post::where('author', $user_id)->orderBy('updated_at', 'DESC')->paginate(5);
        foreach($posts as $post) {
            $this->more_info($post);
        }
        return $posts;
    }
}
