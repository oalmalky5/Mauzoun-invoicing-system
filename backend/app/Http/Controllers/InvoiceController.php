<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class InvoiceController extends Controller
{
    public function all()
    {
        return response()->json([
            'status' => true,
            'data' => Invoice::with('customer')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_id' => 'required',
            'date' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first()
            ]);
        }

        $Invoice = Invoice::create([
            'sr_no' => $request->sr_no,
            'date' => $request->date,//Carbon::createFromFormat('Y-m-d', $request->date)->format('Y-m-d'),
            'due_date' => $request->due_date, //Carbon::createFromFormat('Y-m-d', $request->due_date)->format('Y-m-d'),
            'billing_name' => $request->billing_name,
            'billing_company_name' => $request->billing_company_name,
            'billing_email' => $request->billing_email,
            'billing_street' => $request->billing_street,
            'billing_city' => $request->billing_city,
            'billing_state' => $request->billing_state,
            'billing_zip_code' => $request->billing_zip_code,
            'billing_country' => $request->billing_country,
            'total' => $request->total,
            'vat' => $request->vat,
            'sub_total' => $request->sub_total,
            'notes' => $request->notes,
            'currency' => $request->currency,
            'customer_id' => $request->customer_id,
            'created_by' => Auth::id()
        ]);

        if (empty($request->sr_no)) {
            $sr_no = date('y') . str_pad(date("z"), 3, "0", STR_PAD_LEFT);
            $Invoice->sr_no = $sr_no . str_pad($Invoice->id, 5, '0', STR_PAD_LEFT);
            $Invoice->save();
        }


        foreach ($request->items as $key => $detail) {

            $details = [
                'item' => $detail['item'],
                'description' => $detail['description'],
                'qty' => $detail['qty'],
                'price' => $detail['price'],
                'total' => $detail['total']
            ];

            $Invoice->details()->create($details);
            //InvoiceDetail::created($details);
        }

        return response()->json([
            'status' => true,
            'message' => 'Invoice saved successfully'
        ]);
    }

    public function edit(Request $request)
    {
        return view('invoice/edit');
    }

    public function show(Request $request)
    {
        return response()->json([
            'status' => true,
            'data' => Invoice::with(['customer', 'details'])->firstWhere('id', $request->id)
        ]);

    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'customer_id' => 'required',
            'date' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first()
            ]);
        }

        $Invoice = Invoice::find($request->id);
        $Invoice->invoice_no = $request->invoice_no;
        $Invoice->date = Carbon::createFromFormat('d/m/Y', $request->date)->format('Y-m-d');
        $Invoice->due_date = Carbon::createFromFormat('d/m/Y', $request->due_date)->format('Y-m-d');
        $Invoice->is_recurring = $request->is_recurring;
        $Invoice->recurring_interval_value = $recurring_interval_value;
        $Invoice->recurring_interval_unit = $recurring_interval_unit;
        $Invoice->is_infinity_cycle = $is_infinity_cycle;
        $Invoice->recurring_cycle = $recurring_cycle;
        $Invoice->billing_city = $request->billing_city;
        $Invoice->billing_state = $request->billing_state;
        $Invoice->billing_zip_code = $request->billing_zip_code;
        $Invoice->billing_street = $request->billing_street;
        $Invoice->billing_country = $request->billing_country;
        $Invoice->shipping_city = $request->shipping_city;
        $Invoice->shipping_state = $request->shipping_state;
        $Invoice->shipping_zip_code = $request->shipping_zip_code;
        $Invoice->shipping_address = $request->shipping_address;
        $Invoice->shipping_country_id = $request->shipping_country_id;
        $Invoice->quantity_type = $request->quantity_type;
        $Invoice->discount_type = $request->discount_type;
        $Invoice->total = $request->total;
        $Invoice->discount_unit = $request->discount_unit;
        $Invoice->discount_value = $request->discount_value;
        $Invoice->discount_amount = $request->discount_amount;
        $Invoice->adjustment_amount = $request->adjustment_amount;
        $Invoice->net_amount = $request->net_amount;
        $Invoice->admin_notes = $request->admin_notes;
        $Invoice->client_notes = $request->client_notes;
        $Invoice->terms_and_conditions = $request->terms_and_conditions;
        $Invoice->currency_id = $request->currency_id;
        $Invoice->customer_id = $request->customer_id;
        $Invoice->sale_agent_id = $request->sale_agent_id;

        $Invoice->save();


        $items = array_filter(array_column($request->details, 'item_id'));
        InvoiceDetail::where('invoice_id', $request->id)->whereNotIn('item_id', $items)->delete();

        foreach ($request->details as $key => $detail) {

            $InvoiceDetail = $Invoice->details()->updateOrCreate(
                [
                    'invoice_id' => $request->id,
                    'item_id' => $detail['item_id']
                ],
                [
                    'item_id' => $detail['item_id'],
                    'description' => $detail['description'],
                    'long_description' => $detail['long_description'],
                    'qty' => $detail['qty'],
                    'unit' => $detail['unit'],
                    'unit_id' => $detail['unit_id'],
                    'rate' => $detail['rate'],
                    'total' => $detail['net_amount'], //same as net amount
                    'net_amount' => $detail['net_amount'],
                ]
            );

            $taxes = [];
            foreach ($detail['taxes'] as $tax) {
                $tax_id = Arr::pull($tax, 'id');
                $taxes[$tax_id] = $tax;
            }

            $InvoiceDetail->taxes()->sync($taxes)->save();

        }

        return response()->json([
            'status' => true,
            'message' => 'Invoice saved successfully'
        ]);
    }

    public function view()
    {
        return view('invoice.view');
    }

    public function detail(Request $request)
    {
        return response()->json([
            'status' => true,
            'data' => Invoice::with(['details', 'currency', 'customer', 'customer.user', 'billingCountry', 'shippingCountry'])->firstWhere('id', $request->id)
        ]);

    }

    public function destroy(Request $request)
    {
        $Invoice = Invoice::find($request->id);
        $Invoice->delete();

        return response()->json([
            'status' => true,
            'message' => 'Record deleted successfully'
        ]);
    }
}
