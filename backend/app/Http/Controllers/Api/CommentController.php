<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Str;

class CommentController extends Controller
{
    //
    public function createComment(Request $request)
    {
        $comment = new Comment();
        $comment->post_id = $request->post_id;
        $comment->user_id = $request->user_id;
        $comment->parent_id = $request->parent_id;
        $comment->name = $request->name;
        $comment->body = $request->body;
        $comment->save();
        $res = [
            'status' => 'creat_comment_success',
            'data' => $comment,
        ];
        return response()->json($res, 200);     
    }

    public function getComments($post_id)
    {
        $comments = Comment::where('post_id', $post_id)->orderBy('created_at', 'desc')->get();
        $res = [
            'status' => 'get_comments_success',
            'data' => $comments,
        ];
        return response()->json($res, 200);     
    }
}
