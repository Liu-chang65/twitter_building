<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

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
        $post->save();
        $res = [
            'status' => 'create_post_success',
            'data' => $post
        ];
        return response()->json($res, 200);     
    }

    public function getAllPosts()
    {
        $posts = Post::all();
        // if($posts->count()>0){
        //     $res = [
        //         'status' => 'get_all_posts_success',
        //         'data' => $post
        //     ];
        // } else {
        //     $res = [
        //         'status' => 'get_all_posts_empty',
        //         'data' => $post
        //     ];
        // }
        $res = [
            'status' => 'get_all_posts_success',
            'data' => $posts
        ];
        return response()->json($res, 200);     
    }
}
