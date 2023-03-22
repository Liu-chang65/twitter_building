<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Str;


class PostController extends Controller
{
    //
    public function createPost(Request $request)
    {
        $post = new Post();
        $post->user_id = $request->user_id;
        $post->first_name = $request->first_name;
        $post->last_name = $request->last_name;
        $post->name = $request->name;
        $post->content = $request->content;
        $post->parent_id = 0;
        $post->slug = Str::random(20);
        $post->save();
        $res = [
            'status' => 'create_post_success',
            'data' => $post
        ];
        return response()->json($res, 200);     
    }

    public function rePost(Request $request)
    {
        $post = new Post();
        $post->user_id = $request->user_id;
        $post->first_name = $request->first_name;
        $post->last_name = $request->last_name;
        $post->name = $request->name;
        $post->content = $request->content;
        $post->parent_id = $request->parent_id;
        $post->slug = Str::random(20);
        $post->save();
        $res = [
            'status' => 're_post_success',
            'data' => $post
        ];
        return response()->json($res, 200);     
    }

    public function getAllPosts()
    {
        $posts = Post::orderBy('created_at', 'desc')->get();
        $res = [
            'status' => 'get_all_posts_success',
            'data' => $posts
        ];
        return response()->json($res, 200);     
    }

    public function getOnePost($id)
    {
        $post = Post::find($id);
        $res = [
            'status' => 'get_one_post_success',
            'data' => $post
        ];
        return response()->json($res, 200);     
    }

    public function getMyPosts($name)
    {
        $posts = Post::orderBy('created_at', 'desc')->where('name',$name)->get();
        $user = User::where('name', $name)->first();
        $res = [
            'status' => 'get_my_posts_success',
            'data' => $posts,
            'user' => $user
        ];
        return response()->json($res, 200);     
    }
}
