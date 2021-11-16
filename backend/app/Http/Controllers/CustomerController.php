<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    public function all()
    {
        return response()->json([
            'data' => Customer::all()
        ]);
    }

    public function show(Request $request)
    {
        return response()->json([
            'status' => true,
            'data' => Customer::find($request->id)
        ]);

    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|unique:customers',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first()
            ]);
        }

        Customer::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'website' => $request->website,
            'company_name' => $request->company_name,
            'street' => $request->street,
            'city' => $request->city,
            'state' => $request->state,
            'zip_code' => $request->zip_code,
            'country' => $request->country,
            'dob' => $request->dob,
            'notes' => $request->notes,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Customer saved successfully'
        ]);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first()
            ]);
        }

        $Customer = Customer::find($request->id);
        $Customer->first_name = $request->first_name;
        $Customer->last_name = $request->last_name;
        $Customer->email = $request->email;
        $Customer->website = $request->website;
        $Customer->company_name = $request->company_name;
        $Customer->street = $request->street;
        $Customer->city = $request->city;
        $Customer->state = $request->state;
        $Customer->zip_code = $request->zip_code;
        $Customer->country = $request->country;
        $Customer->dob = $request->dob;
        $Customer->notes = $request->notes;

        $Customer->save(); // Can use update here as well

        return response()->json([
            'status' => true,
            'message' => 'Customer updated successfully'
        ]);
    }

    public function destroy(Request $request)
    {
        Customer::where('id', $request->id)->delete();
        return response()->json([
            'status' => true,
            'message' => 'Record deleted successfully'
        ]);
    }
}
