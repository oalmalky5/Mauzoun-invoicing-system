<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Role;

class UserController extends Controller
{
    public function me()
    {
        return response()->json([
            'status' => TRUE,
            'data' => Auth::user()
        ]);
    }

    public function all()
    {
        return response()->json([
            'status' => true,
            'data' => User::with('role')->get()
        ]);
    }

    public function show(Request $request)
    {
        return response()->json([
            'status' => true,
            'data' => User::find($request->id)
        ]);

    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first()
            ]);
        }

        $Role = Role::where('key', 'staff')->first();

        User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'notes' => $request->notes,
            'password' => Hash::make($request->password),
            'role_id' => $Role->id,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'User saved successfully'
        ]);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first()
            ]);
        }

        $User = User::find($request->id);
        $User->first_name = $request->first_name;
        $User->last_name = $request->last_name;
        $User->email = $request->email;
        $User->notes = $request->notes;

        $User->save(); // Can use update here as well

        return response()->json([
            'status' => true,
            'message' => 'User updated successfully'
        ]);
    }

    public function destroy(Request $request)
    {
        User::where('id', $request->id)->delete();
        return response()->json([
            'status' => true,
            'message' => 'Record deleted successfully'
        ]);
    }

    public function staff()
    {
        return response()->json([
            'status' => true,
            'data' => User::with('role')->get()
        ]);

        /*
         * ['role' => function ($role) {
                $role->where('key', '=', 'admin');
            }]
         * */
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required',
            'confirm_password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first()
            ]);

        }

        if ($request->new_password != $request->confirm_password) {
            return response()->json([
                'status' => false,
                'message' => "Password does not match"
            ]);
        }

        if (Hash::check($request->old_password, Auth::user()->getAuthPassword())) {
            User::where('id', Auth::user()->id)->update(['password' => Hash::make($request->new_password)]);

            return response()->json([
                'status' => true,
                'message' => 'Password Changed Successfully'
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Current Password is wrong'
            ]);
        }
    }

    public function updateAccount(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first()
            ]);
        }

        $User = User::find(Auth::id());
        $User->first_name = $request->first_name;
        $User->last_name = $request->last_name;
        $User->notes = $request->notes;

        $User->save(); // Can use update here as well

        return response()->json([
            'status' => true,
            'message' => 'Account updated successfully'
        ]);
    }
}
