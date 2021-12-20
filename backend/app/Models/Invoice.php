<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];
    protected $with = ['details', 'customer'];
    protected $appends = ['address', 'pdf_url', 'report_url'];

    public function details()
    {
        return $this->hasMany(InvoiceDetail::class);
    }

    public function custom_fields()
    {
        return $this->hasMany(InvoiceCustomField::class)->orderBy('sorting_order');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function getAddressAttribute()
    {
        return $this->billing_street . ', ' . $this->billing_city . ', ' . $this->billing_state . ', ' . $this->billing_zip_code . ', ' . $this->billing_country;
    }

    public function getInvoiceDateFormattedAttribute()
    {
        return Carbon::parse($this->invoice_date)->format('d M, Y');
    }

    public function getDueDateFormattedAttribute()
    {
        return Carbon::parse($this->due_date)->format('d M, Y');
    }

    public function getPdfUrlAttribute()
    {
        return env('BASE_URL') . 'invoices/' . $this->sr_no . '_' . $this->id . '.pdf?v=' . date('YmdHis');
    }

    public function getReportUrlAttribute()
    {
//        return 'https://pay.mauzoun.com/invoice/' . $this->sr_no;
        return env('BASE_URL') . 'invoice_view/' . $this->sr_no;
    }

    protected static function booted()
    {
        static::deleting(function ($Invoice) {
            foreach ($Invoice->details as $detail) {
                $detail->delete();
            }
        });
    }
}
