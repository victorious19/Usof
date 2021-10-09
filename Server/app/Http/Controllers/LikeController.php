<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use App\Models\Comment;


class LikeController extends Controller
{
    function put_post_like(Request $request, $post_id) {
        $request->validate(['type'=>'string|required']);
        $like = Like::where('post_id', $post_id)->where('user_id', auth()->user()->id)->first();
        if (isset($like) && $like->type == $request->type)
            return $this->delete_post_like($post_id);
        $post = Post::find($post_id);
        if (isset($like)) $this->delete_post_like($post_id);
        if ($post->author != auth()->user()->id) {
            $user = User::find($post->author);
            if ($request->type =='like') $user->update(['rating'=>$user->rating+1]);
            else $user->update(['rating'=>$user->rating-1]);
            return Like::create(['user_id' => auth()->user()->id,'post_id' => $post_id, 'type' => $request->type]);
        }
        return response(['message'=>'don`t put like yourself'], 400);
    }
    function put_comment_like(Request $request, $comment_id) {
        $request->validate(['type'=>'string|required']);
        $like = Like::where('comment_id', $comment_id)->where('user_id', auth()->user()->id)->first();
        if (isset($like) && $like->type == $request->type)
            return $this->delete_comment_like($comment_id);
        $comment = Comment::find($comment_id);
        if (isset($like)) $this->delete_comment_like($comment_id);
        if ($comment->user_id != auth()->user()->id) {
            $user = User::find($comment->user_id);
            if ($request->type =='like') $user->update(['rating'=>$user->rating+1]);
            else $user->update(['rating'=>$user->rating-1]);
            return Like::create(['user_id' => auth()->user()->id,'comment_id' => $comment_id, 'type' => $request->type]);
        }
        return response(['message'=>'don`t put like yourself'], 400);
    }
    function get_post_like($post_id) {
        return Like::where('post_id', $post_id)->orderBy('created_at')->get();
    }
    function get_comment_like($comment_id) {
        return Like::where('comment_id', $comment_id)->orderBy('created_at')->get();
    }
    function delete_post_like($post_id) {
        $post = Post::find($post_id);
        $user_id = auth()->user()->id;
        $like = Like::where('post_id', $post_id)->where('user_id', $user_id)->first();
        
        if (empty($like)) return response(['message'=>'like is not exists'], 404);
        $user = User::find($post->author);
        if ($like->type =='like') $user->update(['rating'=>$user->rating-1]);
        else $user->update(['rating'=>$user->rating+1]);
        return Like::destroy($like->id);
    }
    function delete_comment_like($comment_id) {
        $comment = Comment::find($comment_id);
        $user_id = auth()->user()->id;
        $like = Like::where('comment_id', $comment_id)->where('user_id', $user_id)->first();
        
        if (empty($like)) return response(['message'=>'like/dislike is not exists'], 404);
        $user = User::find($comment->user_id);
        if ($like->type =='like') $user->update(['rating'=>$user->rating-1]);
        else $user->update(['rating'=>$user->rating+1]);
        return Like::destroy($like->id);
    }
    function get_my_postlike($post_id) {
        return Like::where('post_id', $post_id)->where('user_id', auth()->user()->id)->first();
    }
    function get_my_commentlike($comment_id) {
        return Like::where('comment_id', $comment_id)->where('user_id', auth()->user()->id)->first();
    }
}
