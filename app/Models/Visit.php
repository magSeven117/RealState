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

    public function scopeSearch($query, $value) {
        if(!is_null($value)) {
            return $query->where('name', 'LIKE', `%$value%`);
        }

        return $query;
    }

    public function scopeVisited($query, $value) {
        if($value === 'yes') {
            return $query->whereNotNull("visited_date");
        } 
        if ($value === 'no') {
            return $query->whereNull('visited_date');
        }

        return $query;
    }

    public function scopePending($query, $value){
        if ($value) {
            return $query->where('pending_visit', true);
        }

        return $query;
    }
}
