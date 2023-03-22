<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\FollowController;
use App\Http\Controllers\Api\CommentController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

// Protected routes

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/create_post', [PostController::class, 'createPost']);
    Route::post('/repost', [PostController::class, 'rePost']);
    Route::get('/all_posts', [PostController::class, 'getAllPosts']);
    Route::get('/post/{id}', [PostController::class, 'getOnePost']);
    Route::get('/myposts/{name}', [PostController::class, 'getMyPosts']);

    Route::post('/follow_users', [FollowController::class, 'followUsers']);
    Route::post('/follow/add_follow_user', [FollowController::class, 'addFollowUser']);
    Route::get('/follow/get_follow_info/{user_id}', [FollowController::class, 'getFollowInfo']);

    Route::post('/create_comment', [CommentController::class, 'createComment']);
    Route::get('/get_comments/{post_id}', [CommentController::class, 'getComments']);
});