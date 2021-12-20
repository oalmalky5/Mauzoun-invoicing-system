<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InvoiceCustomField extends Model
{
    use HasFactory;

    protected $guarded = [];

    /* Creating */
    protected static function booted()
    {
        static::creating(function ($InvoiceCustomField) {
            $InvoiceCustomField->sorting_order = (self::where('invoice_id', $InvoiceCustomField->invoice_id)->count()) + 1;
        });
    }
}
