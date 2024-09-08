<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function houses()
    {
        return $this->belongsToMany(House::class, 'feature_house');
    }
}
