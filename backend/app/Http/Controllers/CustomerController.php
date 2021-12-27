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
            "status" => true,
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
            'first_name' => 'required',
            'email' => 'required|unique:customers'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first()
            ]);
        }

        Customer::create([
            'first_name' => $request->first_name,
            'first_name_arabic' => $request->first_name_arabic,
            'last_name' => $request->last_name,
            'last_name_arabic' => $request->last_name_arabic,
            'email' => $request->email,
            'phone' => $request->phone,
            'website' => $request->website,
            'company_name' => $request->company_name,
            'company_name_arabic' => $request->company_name_arabic,
            'street' => $request->street,
            'street_arabic' => $request->street_arabic,
            'city' => $request->city,
            'city_arabic' => $request->city_arabic,
            'state' => $request->state,
            'state_arabic' => $request->state_arabic,
            'zip_code' => $request->zip_code,
            'country' => $request->country,
            'country_arabic' => $request->country_arabic,
            'notes' => $request->notes,
            'notes_arabic' => $request->notes_arabic,
            'district' => $request->district,
            'district_arabic' => $request->district_arabic,
            'building_no' => $request->building_no,
            'building_no_arabic' => $request->building_no_arabic,
            'vat_number' => $request->vat_number,
            'other_buyer_id' => $request->other_buyer_id,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Customer saved successfully'
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

        $Customer = Customer::find($request->id);
        $Customer->first_name = $request->first_name;
        $Customer->first_name_arabic = $request->first_name_arabic;
        $Customer->last_name = $request->last_name;
        $Customer->last_name_arabic = $request->last_name_arabic;
        $Customer->email = $request->email;
        $Customer->phone = $request->phone;
        $Customer->website = $request->website;
        $Customer->company_name = $request->company_name;
        $Customer->company_name_arabic = $request->company_name_arabic;
        $Customer->street = $request->street;
        $Customer->street_arabic = $request->street_arabic;
        $Customer->city = $request->city;
        $Customer->city_arabic = $request->city_arabic;
        $Customer->state = $request->state;
        $Customer->state_arabic = $request->state_arabic;
        $Customer->zip_code = $request->zip_code;
        $Customer->country = $request->country;
        $Customer->country_arabic = $request->country_arabic;
        $Customer->notes = $request->notes;
        $Customer->notes_arabic = $request->notes_arabic;
        $Customer->district = $request->district;
        $Customer->district_arabic = $request->district_arabic;
        $Customer->building_no = $request->building_no;
        $Customer->building_no_arabic = $request->building_no_arabic;
        $Customer->vat_number = $request->vat_number;
        $Customer->other_buyer_id = $request->other_buyer_id;

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
