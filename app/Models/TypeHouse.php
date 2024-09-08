<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeHouse extends Model
{
    use HasFactory;

    protected $fillable = ['name'];
    public $timestamps = false;
    
     // Define la relación con House
    public function houses()
    {
        return $this->hasMany(House::class, 'type_house_id');
    }
}
