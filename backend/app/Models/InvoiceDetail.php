<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InvoiceDetail extends Model
{
    use HasFactory;
    use SoftDeletes;
    use \Staudenmeir\EloquentJsonRelations\HasJsonRelationships;

    protected $guarded = [];
    protected $appends = ['tax_ids'];
    protected $casts = [
        'taxes' => 'json',
    ];

    public function getTaxIdsAttribute()
    {
        return $this->taxes()->pluck('id')->toArray();
    }

    public function taxes()
    {
        return $this->belongsToJson(Tax::class, 'taxes->list[]->id');
    }
}
