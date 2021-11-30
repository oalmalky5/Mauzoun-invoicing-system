<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => [
                'required',
                'string',
                'min:10',             // must be at least 10 characters in length
                'regex:/[a-z]/',      // must contain at least one lowercase letter
                'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
                'regex:/[@$!%*#?&]/', // must contain a special character
            ]
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => FALSE,
                'message' => $validator->errors()
            ]);
        }

        $User = User::where('email', $request->email)->first();
        // check if User exist or not
        if (!$User) {
            return response()->json([
                'status' => false,
                'message' => 'No user registered with this email'
            ]);
        }

        // check if password match or not
        if (Hash::check($request->password, $User->password)) {
            $token = $User->createToken('Admin')->plainTextToken;
            return response()->json([
                'status' => true,
                'message' => 'Logged in',
                'token' => ['token' => $token]
            ])->header('Cache-Control', 'private')->header('Authorization', $token);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Invalid Password!'
            ]);
        }
    }
}
