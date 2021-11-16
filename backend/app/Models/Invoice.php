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
    use \Staudenmeir\EloquentJsonRelations\HasJsonRelationships;

    protected $guarded = [];
    protected $appends = ['paymentMethodIds', 'InvoiceDateFormatted', 'DueDateFormatted'];
    protected $casts = [
        'taxes' => 'json',
        'payment_methods' => 'json'
    ];

    public function getPaymentMethodIdsAttribute()
    {
        return $this->paymentMethods()->pluck('id')->toArray();
    }

    public function taxes()
    {
        return $this->belongsToJson(Tax::class, 'taxes->list[]->id');
    }

    public function paymentMethods()
    {
        return $this->belongsToJson(PaymentMethod::class, 'payment_methods->pm_ids');
    }

    public function billingCountry()
    {
        return $this->belongsTo(Country::class, 'billing_country_id', 'id');
    }

    public function shippingCountry()
    {
        return $this->belongsTo(Country::class, 'shipping_country_id', 'id');
    }

    public function details()
    {
        return $this->hasMany(InvoiceDetail::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
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
