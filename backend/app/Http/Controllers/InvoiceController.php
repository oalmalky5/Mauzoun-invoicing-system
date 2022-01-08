<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceCustomField;
use App\Models\InvoiceDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Meneses\LaravelMpdf\LaravelMpdf;
use PDF;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Salla\ZATCA\GenerateQrCode;
use Salla\ZATCA\Tags\InvoiceDate;
use Salla\ZATCA\Tags\InvoiceTaxAmount;
use Salla\ZATCA\Tags\InvoiceTotalAmount;
use Salla\ZATCA\Tags\Seller;
use Salla\ZATCA\Tags\TaxNumber;

class InvoiceController extends Controller
{
    public function all(Request $request)
    {
        $Invoice = Invoice::with('customer')->latest();

        if ($request->customer_id)
            $Invoice->where('customer_id', $request->customer_id);

        return response()->json([
            'status' => true,
            'data' => $Invoice->get()
        ]);
    }

    public function invoice_view($id = 0, $status)
    {
        $Invoice = Invoice::firstWhere('sr_no', $id);
        return view('invoice', ['invoice' => $Invoice, 'status' => $status, 'web_view' => true]);
    }

    public function invoice_pdf($id = 0)
    {
        $Invoice = Invoice::firstWhere('sr_no', $id);
        $generatedString = $this->generateSallaQRCode($Invoice);

        $filename = $Invoice->sr_no . '.pdf';
        //File::delete($filename);

        $report_url = env('BASE_URL') . 'invoice_pdf/' . $id;

        QrCode::format('svg')->size(100)->errorCorrection('H')->encoding('UTF-8')->generate($report_url, public_path('qrcodes/' . $Invoice->id . '.svg'));

        $view = "invoice_new";
        $pdf = PDF::loadView($view, array(
            'invoice' => $Invoice,
            'title' => $filename,
            'is_pdf' => true,
            'qrcode' => $generatedString,
            'report_url' => $report_url
        ));
        return $pdf->stream($filename);
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

            'billing_first_name' => $request->billing_first_name,
            'billing_first_name_arabic' => $request->billing_first_name_arabic,
            'billing_last_name' => $request->billing_last_name,
            'billing_last_name_arabic' => $request->billing_last_name_arabic,
            'billing_email' => $request->billing_email,
            'billing_phone' => $request->billing_phone,
            'billing_website' => $request->billing_website,
            'billing_company_name' => $request->billing_company_name,
            'billing_company_name_arabic' => $request->billing_company_name_arabic,
            'billing_street' => $request->billing_street,
            'billing_street_arabic' => $request->billing_street_arabic,
            'billing_city' => $request->billing_city,
            'billing_city_arabic' => $request->billing_city_arabic,
            'billing_state' => $request->billing_state,
            'billing_state_arabic' => $request->billing_state_arabic,
            'billing_zip_code' => $request->billing_zip_code,
            'billing_country' => $request->billing_country,
            'billing_country_arabic' => $request->billing_country_arabic,
            'billing_notes' => $request->billing_notes,
            'billing_notes_arabic' => $request->billing_notes_arabic,
            'billing_district' => $request->billing_district,
            'billing_district_arabic' => $request->billing_district_arabic,
            'billing_building_no' => $request->billing_building_no,
            'billing_building_no_arabic' => $request->billing_building_no_arabic,
            'billing_vat_number' => $request->billing_vat_number,
            'billing_vat_number_arabic' => $request->billing_vat_number_arabic,
            'billing_other_buyer_id' => $request->billing_other_buyer_id,
            'billing_additional_no' => $request->billing_additional_no,
            'total_amount' => $request->total_amount,
            'tax_amount' => $request->tax_amount,
            'total' => $request->total,
            'vat' => $request->vat,
            'sub_total' => $request->sub_total,
            'expiry_date' => $request->expiry_date,
            'business_days' => $request->business_days,
            'has_approved' => 0,
            'notes' => $request->notes,
            'currency' => $request->currency,
            'customer_id' => $request->customer_id,
            'created_by' => Auth::id()
        ]);

        if (empty($request->sr_no)) {
            $sr_no = date('Y');
            $Invoice->sr_no = 'QT' . date('Y') . $Invoice->id;
            $Invoice->save();
        }


        foreach ($request->items as $key => $detail) {

            $details = [
                'item' => $detail['item'],
                'description' => $detail['description'],
                'qty' => $detail['qty'],
                'price' => $detail['price'],
                'taxable_amount' => $detail['taxable_amount'],
                'discount' => $detail['discount'],
                'tax_rate' => $detail['qty'],
                'tax_amount' => $detail['tax_amount'],
                'total' => $detail['total']
            ];

            $Invoice->details()->create($details);
        }

        foreach ($request->custom_fields as $key => $custom_field) {

            $custom_field_data = [
                'name' => $custom_field['name'],
                'name_arabic' => $custom_field['name_arabic'],
                'value' => $custom_field['value'],
            ];

            $Invoice->custom_fields()->create($custom_field_data);
        }

        $report_url = env('BASE_URL') . 'invoice_pdf/' . $Invoice->id;
        $qrcode = base64_encode(QrCode::format('svg')->size(100)->errorCorrection('H')->generate($report_url));

        $filename = '/' . $Invoice->sr_no . '_' . $Invoice->id . '.pdf';
        File::delete(public_path() . '/invoices/' . $filename);

        $view = "invoice";
        PDF::loadView($view, array(
            'invoice' => $Invoice,
            'is_pdf' => true,
            'qrcode' => $qrcode,
            'report_url' => $report_url
        ))->save(public_path() . '/invoices/' . $filename, 'F');

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
        $Invoice = Invoice::with(['customer', 'details', 'custom_fields'])->firstWhere('id', $request->id);

        return response()->json([
            'status' => true,
            'data' => $Invoice
        ]);
    }

    public function preview(Request $request)
    {
        $Invoice = Invoice::with(['customer', 'details'])->firstWhere('sr_no', $request->sr_no);

        $report_url = $Invoice->report_url . '/' . $request->status;

        // File::delete(public_path('qrcodes/' . $Invoice->id . '.svg'));
        // $qrcode = base64_encode(QrCode::format('svg')->size(100)->errorCorrection('H')->generate($report_url, public_path('qrcodes/' . $Invoice->id . '.svg')));
        $qrcode = $generatedString = $this->generateSallaQRCode($Invoice);
        $filename = '/' . $Invoice->sr_no . '_' . $Invoice->id . '.pdf';
        File::delete(public_path() . 'invoices/' . $filename);

        $view = "invoice_new";
        PDF::loadView($view, array(
            'invoice' => $Invoice,
            'is_pdf' => true,
            'qrcode' => $qrcode,
            'report_url' => $report_url,
            'status' => $request->status
        ))->save(public_path() . '/invoices/' . $filename, 'F');

        return response()->json([
            'status' => true,
            'data' => $Invoice
        ]);
    }

    public function update(Request $request)
    {
        /*return response()->json([
            'status' => false,
            'message' => $request->toArray()
        ]);*/
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
        $Invoice->sr_no = $request->sr_no;
        $Invoice->date = $request->date;//Carbon::createFromFormat('Y-m-d', $request->date)->format('Y-m-d'),
        $Invoice->due_date = $request->due_date; //Carbon::createFromFormat('Y-m-d', $request->due_date)->format('Y-m-d'),

        $Invoice->billing_first_name = $request->billing_first_name;
        $Invoice->billing_first_name_arabic = $request->billing_first_name_arabic;
        $Invoice->billing_last_name = $request->billing_last_name;
        $Invoice->billing_last_name_arabic = $request->billing_last_name_arabic;
        $Invoice->billing_email = $request->billing_email;
        $Invoice->billing_phone = $request->billing_phone;
        $Invoice->billing_website = $request->billing_website;
        $Invoice->billing_company_name = $request->billing_company_name;
        $Invoice->billing_company_name_arabic = $request->billing_company_name_arabic;
        $Invoice->billing_street = $request->billing_street;
        $Invoice->billing_street_arabic = $request->billing_street_arabic;
        $Invoice->billing_city = $request->billing_city;
        $Invoice->billing_city_arabic = $request->billing_city_arabic;
        $Invoice->billing_state = $request->billing_state;
        $Invoice->billing_state_arabic = $request->billing_state_arabic;
        $Invoice->billing_zip_code = $request->billing_zip_code;
        $Invoice->billing_country = $request->billing_country;
        $Invoice->billing_country_arabic = $request->billing_country_arabic;
        $Invoice->billing_notes = $request->billing_notes;
        $Invoice->billing_notes_arabic = $request->billing_notes_arabic;
        $Invoice->billing_district = $request->billing_district;
        $Invoice->billing_district_arabic = $request->billing_district_arabic;
        $Invoice->billing_building_no = $request->billing_building_no;
        $Invoice->billing_building_no_arabic = $request->billing_building_no_arabic;
        $Invoice->billing_vat_number = $request->billing_vat_number;
        $Invoice->billing_vat_number_arabic = $request->billing_vat_number_arabic;
        $Invoice->billing_other_buyer_id = $request->billing_other_buyer_id;
        $Invoice->billing_additional_no = $request->billing_additional_no;
        $Invoice->total_amount = $request->total_amount;
        $Invoice->tax_amount = $request->tax_amount;
        $Invoice->total = $request->total;
        $Invoice->vat = $request->vat;
        $Invoice->sub_total = $request->sub_total;
        $Invoice->expiry_date = $request->expiry_date;
        $Invoice->business_days = $request->business_days;
        $Invoice->notes = $request->notes;
        $Invoice->currency = $request->currency;
        $Invoice->customer_id = $request->customer_id;
        $Invoice->save();

        if (empty($request->sr_no)) {
            $sr_no = date('Y');
            $Invoice->sr_no = 'QT' . date('Y') . $Invoice->id;
            $Invoice->save();
        }

        $items = array_filter(array_column($request->items, 'id'));
        InvoiceDetail::where('invoice_id', $request->id)->whereNotIn('id', $items)->delete();

        foreach ($request->items as $key => $detail) {
            if (empty($detail['id'])) {
                $details = [
                    'item' => $detail['item'],
                    'description' => $detail['description'],
                    'qty' => $detail['qty'],
                    'price' => $detail['price'],
                    'taxable_amount' => $detail['taxable_amount'],
                    'discount' => $detail['discount'],
                    'tax_rate' => $detail['qty'],
                    'tax_amount' => $detail['tax_amount'],
                    'total' => $detail['total']
                ];

                $Invoice->details()->create($details);
            } else {
                $InvoiceDetail = InvoiceDetail::find($detail['id']);
                $InvoiceDetail->item = $detail['item'];
                $InvoiceDetail->description = $detail['description'];
                $InvoiceDetail->qty = $detail['qty'];
                $InvoiceDetail->price = $detail['price'];
                $InvoiceDetail->taxable_amount = $detail['taxable_amount'];
                $InvoiceDetail->discount = $detail['discount'];
                $InvoiceDetail->tax_rate = $detail['qty'];
                $InvoiceDetail->tax_amount = $detail['tax_amount'];
                $InvoiceDetail->total = $detail['total'];

                $InvoiceDetail->save();
            }

        }


        $custom_fields = array_filter(array_column($request->custom_fields, 'id'));
        InvoiceCustomField::where('invoice_id', $request->id)->whereNotIn('id', $custom_fields)->delete();
        foreach ($request->custom_fields as $key => $custom_field) {
            if (empty($custom_field['id'])) {
                $custom_field_data = [
                    'name' => $custom_field['name'],
                    'name_arabic' => $custom_field['name_arabic'],
                    'value' => $custom_field['value'],
                ];

                $Invoice->custom_fields()->create($custom_field_data);
            } else {
                $InvoiceCustomField = InvoiceCustomField::find($custom_field['id']);
                $InvoiceCustomField->name = $custom_field['name'];
                $InvoiceCustomField->name_arabic = $custom_field['name_arabic'];
                $InvoiceCustomField->value = $custom_field['value'];
                $InvoiceCustomField->save();
            }

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

    public function approve(Request $request)
    {
        $Invoice = Invoice::find($request->id);
        $Invoice->has_approved = 1;
        $Invoice->save();

        return response()->json([
            'status' => true,
            'message' => 'Record Approved successfully'
        ]);
    }

    private function generateSallaQRCode($Invoice)
    {
        return $generatedString = GenerateQrCode::fromArray([
            new Seller('مؤسسة موزون للدعاية والاعلان'), // seller name
            new TaxNumber('٣١٠١٤٥٨٠٦١٠٠٠٠٣'), // seller tax number
            new InvoiceDate(Carbon::parse($Invoice->date . ' ' . $Invoice->created_at->format('H:i:s'))->format('Y-m-d\TH:i:s\Z')), // invoice date as Zulu ISO8601 @see https://en.wikipedia.org/wiki/ISO_8601
            new InvoiceTotalAmount($Invoice->total_amount), // invoice total amount
            new InvoiceTaxAmount($Invoice->tax_amount) // invoice tax amount
        ])->render();
    }
}
