<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    use HasFactory;
    protected $fillable = [
        'house_id', 'name', 'lastname', 'email', 'phone', 'date_visit', 'visited_date',
    ];

    public function house()
    {
        return $this->belongsTo(House::class);
    }
}
