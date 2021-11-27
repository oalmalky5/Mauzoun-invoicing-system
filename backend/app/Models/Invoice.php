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
    protected $appends = ['address'];

    public function details()
    {
        return $this->hasMany(InvoiceDetail::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function getAddressAttribute()
    {
        return $this->street . ', ' . $this->city . ', ' . $this->state . ', ' . $this->zip_code . ', ' . $this->country;
    }

    public function getInvoiceDateFormattedAttribute()
    {
        return Carbon::parse($this->invoice_date)->format('d M, Y');
    }

    public function getDueDateFormattedAttribute()
    {
        return Carbon::parse($this->due_date)->format('d M, Y');
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
