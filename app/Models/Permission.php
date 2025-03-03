<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Permission extends Model
{
    protected $fillable = ['name'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($permission) {
            $permission->slug = Str::slug($permission->name);
        });

        static::updating(function ($permission) {
            $permission->slug = Str::slug($permission->name);
        });
    }

    public function roles(){
        return $this->belongsToMany(Role::class);
    }
}
