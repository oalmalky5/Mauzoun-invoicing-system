<?php

namespace App\Models;

use App\Helpers\SiteHelper;
use App\Http\Middleware\Authenticate;
use App\Scopes\LabScope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class BaseModel extends \Illuminate\Database\Eloquent\Model
{

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $user_id = Auth::id();
            $model->created_by = $user_id;
        });

        static::saving(function ($model) {
            $user_id = Auth::id();
            $model->created_by = $user_id;
        });

        
    }
}
