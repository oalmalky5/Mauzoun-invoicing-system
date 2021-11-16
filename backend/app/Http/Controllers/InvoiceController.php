<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
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
            'invoice_no' => 'required',
            'customer_id' => 'required',
            'invoice_date' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first()
            ]);
        }

        /*$is_infinity_cycle = $recurring_interval_value = $recurring_cycle = $recurring_cycle = 0;
        $recurring_interval_unit = NULL;
        if ($request->is_recurring) {
            $recurring_interval_value = $request->recurring_interval_value;
            $recurring_interval_unit = $request->recurring_interval_unit;
            if ($request->is_infinity_cycle) {
                $is_infinity_cycle = 1;
            } else {
                $recurring_cycle = $request->recurring_cycle;
            }
        }*/

        $Invoice = Invoice::create([
            'invoice_no' => $request->invoice_no,
            'invoice_date' => Carbon::createFromFormat('d/m/Y', $request->invoice_date)->format('Y-m-d'),
            'due_date' => Carbon::createFromFormat('d/m/Y', $request->due_date)->format('Y-m-d'),
            'is_recurring' => $request->is_recurring,
            'billing_city' => $request->billing_city,
            'billing_state' => $request->billing_state,
            'billing_zip_code' => $request->billing_zip_code,
            'billing_address' => $request->billing_address,
            'billing_country_id' => $request->billing_country_id,
            'shipping_city' => $request->shipping_city,
            'shipping_state' => $request->shipping_state,
            'shipping_zip_code' => $request->shipping_zip_code,
            'shipping_address' => $request->shipping_address,
            'shipping_country_id' => $request->shipping_country_id,
            'quantity_type' => $request->quantity_type,
            'discount_type' => $request->discount_type,
            'total_amount' => $request->total_amount,
            'discount_unit' => $request->discount_unit,
            'discount_value' => $request->discount_value,
            'discount_amount' => $request->discount_amount,
            'adjustment_amount' => $request->adjustment_amount,
            'net_amount' => $request->net_amount,
            'admin_notes' => $request->admin_notes,
            'client_notes' => $request->client_notes,
            'terms_and_conditions' => $request->terms_and_conditions,
            'currency_id' => $request->currency_id,
            'customer_id' => $request->customer_id,
            'sale_agent_id' => $request->sale_agent_id
        ]);

        $Invoice->save();

        /*foreach ($request->taxes as $tax) {
            $tax_id = Arr::pull($tax, 'id');
            $Invoice->taxes()->attach([$tax_id => $tax])->save();
        }*/

        foreach ($request->details as $key => $detail) {

            $details = [
                'item_id' => $detail['item_id'],
                'description' => $detail['description'],
                'long_description' => $detail['long_description'],
                'qty' => $detail['qty'],
                'unit' => $detail['unit'],
                'unit_id' => $detail['unit_id'],
                'rate' => $detail['rate'],
                'total_amount' => $detail['net_amount'], //same as net amount
                'net_amount' => $detail['net_amount'],
            ];
            $InvoiceDetail = $Invoice->details()->create($details);

            /*foreach ($detail['taxes'] as $tax) {
                $tax_id = Arr::pull($tax, 'id');
                $InvoiceDetail->taxes()->attach([$tax_id => $tax])->save();
            }*/
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
            'invoice_no' => 'required',
            'customer_id' => 'required',
            'invoice_date' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first()
            ]);
        }

        $is_infinity_cycle = $recurring_interval_value = $recurring_cycle = $recurring_cycle = 0;
        $recurring_interval_unit = NULL;
        if ($request->is_recurring) {
            $recurring_interval_value = $request->recurring_interval_value;
            $recurring_interval_unit = $request->recurring_interval_unit;
            if ($request->is_infinity_cycle) {
                $is_infinity_cycle = 1;
            } else {
                $recurring_cycle = $request->recurring_cycle;
            }
        }

        $Invoice = Invoice::find($request->id);
        $Invoice->invoice_no = $request->invoice_no;
        $Invoice->invoice_date = Carbon::createFromFormat('d/m/Y', $request->invoice_date)->format('Y-m-d');
        $Invoice->due_date = Carbon::createFromFormat('d/m/Y', $request->due_date)->format('Y-m-d');
        $Invoice->is_recurring = $request->is_recurring;
        $Invoice->recurring_interval_value = $recurring_interval_value;
        $Invoice->recurring_interval_unit = $recurring_interval_unit;
        $Invoice->is_infinity_cycle = $is_infinity_cycle;
        $Invoice->recurring_cycle = $recurring_cycle;
        $Invoice->billing_city = $request->billing_city;
        $Invoice->billing_state = $request->billing_state;
        $Invoice->billing_zip_code = $request->billing_zip_code;
        $Invoice->billing_address = $request->billing_address;
        $Invoice->billing_country_id = $request->billing_country_id;
        $Invoice->shipping_city = $request->shipping_city;
        $Invoice->shipping_state = $request->shipping_state;
        $Invoice->shipping_zip_code = $request->shipping_zip_code;
        $Invoice->shipping_address = $request->shipping_address;
        $Invoice->shipping_country_id = $request->shipping_country_id;
        $Invoice->quantity_type = $request->quantity_type;
        $Invoice->discount_type = $request->discount_type;
        $Invoice->total_amount = $request->total_amount;
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
        $Invoice->paymentMethods()->sync($request->payment_methods)->save();

        $taxes = [];
        foreach ($request->taxes as $tax) {
            $tax_id = Arr::pull($tax, 'id');
            $taxes[$tax_id] = $tax;
        }
        $Invoice->taxes()->sync($taxes)->save();

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
                    'total_amount' => $detail['net_amount'], //same as net amount
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
