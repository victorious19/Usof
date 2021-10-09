<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\User;
use App\Models\Like;

class CommentController extends Controller
{
    function create_comment(Request $request, $post_id) {
        $user_id = auth()->user()->id;
        $request->validate(['content' => 'required|string']);
        $comment = Comment::create([
            'user_id' => $user_id,
            'post_id' => $post_id,
            'content' => $request->content
        ]);
        return response($comment, 201);
    }
    function get_all_comment($post_id) {
        $comments = Comment::where('post_id', $post_id)->orderBy('created_at')->get();
        foreach($comments as $comment) {
            $likes = Like::where('comment_id', $comment->id)->get();
            $rating = 0;
            foreach($likes as $like) {
                if ($like->type === 'like') $rating += 1;
                else $rating -= 1;
            }
            $user = User::find($comment->user_id);
            $comment->user_login = $user->login;
            $comment->rating = $rating;
            $comment->img = $user->profile_picture;
        }
        return $comments;
    }
    function get_comment($comment_id) {
        return Comment::find($comment_id);
    }
    function update(Request $request, $comment_id) {
        $comment = Comment::find($comment_id);
        if (empty($comment_id)) return response(['message'=>"Comment is not found"], 404);
        $request->validate(['content' => 'required|string']);
        if (auth()->user()->id != $comment->user_id) return response(['message'=>"Access denied!"], 401);
        $comment->update(['content' => $request->content]);
        return $comment;
    }
    function delete($comment_id) {
        $comment = Comment::find($comment_id);
        if (auth()->user()->id != $comment->user_id  && auth()->user()->role != 'admin') {
            return response(['message'=>"Access denied!"], 401);
        }
        return Comment::destroy($comment->id);
    }
}
