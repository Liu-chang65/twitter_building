<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Following;
use Illuminate\Support\Str;

class FollowController extends Controller
{
    //
    public function followUsers(Request $request)
    {
        $arr = explode(",", $request->following_users);
        $follow_users = User::whereNotIn('id', $arr)->get();
        $res = [
            'status' => 'get_follow_users_success',
            'data' => $follow_users,
        ];
        return response()->json($res, 200);     
    }

    public function addFollowUser(Request $request)
    {

        $followings = Following::where('user_id', $request->user_id)->where('follow_user_id', $request->follow_user_id)->get();
        if(count($followings)) return false;
        $following = new Following();
        $following->user_id = $request->user_id;
        $following->follow_user_id = $request->follow_user_id;
        $following->save();
        $res = [
            'status' => 'add_follow_user_success',
            'data' => $following,
        ];
        return response()->json($res, 200);     
    }

    public function getFollowInfo($user_id)
    {

        $followings = Following::where('user_id', $user_id)->get();
        $followers = Following::where('follow_user_id', $user_id)->get();
        $followings_count = count($followings);
        $followers_count = count($followers);
        $res = [
            'status' => 'get_follow_info_success',
            'data' => [
                'followings'=> $followings,
                'followers'=> $followers,
                'followings_count'=> $followings_count,
                'followers_count'=> $followers_count
            ]
        ];
        return response()->json($res, 200);     
    }
}
