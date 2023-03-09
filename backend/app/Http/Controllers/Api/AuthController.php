<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $attr = $request->validate([
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6'
        ]);
        if (!Auth::attempt($attr)) {
            $respon1 = [
                'status' => 'login_failed',
                'msg' => 'Invalid login detail!'
            ];
       
            return response()->json($respon1, 200);
        }
        $token = auth()->user()->createToken('auth_token')->plainTextToken;
        $user = auth()->user();
  
        $respon = [
            'status' => 'success',
            'msg' => 'Login successfully',
            'content' => [
                'status_code' => 200,
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user_name' => $user->name,
                'user_email' => $user->email,
                'user_id' => $user->id,
            ]
        ];
   
        return response()->json($respon, 200);
    }

    public function signup(Request $request)
    {
        
        $signup = $request->validate([
            'name' => 'required|string | unique:users',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required | string | email | unique:users',
            'password' => 'required|string|min:6'
        ]);
  
        $user = new User();
        $user->name = $request->name;
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();
        $respon = [
            'status' => 'success',
            'msg' => 'SignUp successfully',
        ];

        return response()->json($respon, 200);     
    }
}