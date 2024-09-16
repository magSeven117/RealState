<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use function PHPUnit\Framework\isNull;

class House extends Model
{
    use HasFactory;

    protected $guarded = [];
    public $timestamps = false;

    //================================== Relaciones de Tablas ==================================

     // Define la relación con TypeHouse
    public function typeHouse()
    {
        return $this->belongsTo(TypeHouse::class, 'type_house_id');
    }

    public function features()
    {
        return $this->belongsToMany(Feature::class, 'feature_house');
    }

    //================================== Filtros de busquedas ==================================
    public function scopeMaxPrice($query, $price)
    {
        if(!is_null($price))
            return $query->where('price', '<=', intval($price));

        return $query;
    }

    public function scopeMinPrice($query, $price)
    {
        if(!is_null($price))
            return $query->where('price', '>=', intval($price));

        return $query;
    }
    
    public function scopeMaxSize($query, $size)
    {
        if(!is_null($size))
            return $query->where('size', '<=', intval($size));

        return $query;
    }
    
    public function scopeMinSize($query, $size)
    {
        if(!is_null($size))
            return $query->where('size', '>=', intval($size));


        return $query;
    }
    
    public function scopeQuarter($query, $quarter)
    {
        if (!is_null($quarter)) {
            if ($quarter >= 4) {
                return $query->where('quarters', '>=', intval($quarter));
            } else {
                return $query->where('quarters', intval($quarter));
            }
        }

        return $query;
    }
    
    public function scopeBath($query, $bath)
    {
        if (!is_null($bath)) {
            if ($bath >= 3) {
                return $query->where('bathroom', '>=', intval($bath));
            } else {
                return $query->where('bathroom', intval($bath));
            }
        }

        return $query;
    }
    
    public function scopeFeatures($query)
    {
        return $query;
    }
    
    public function scopeTypeHouse($query, $value)
    {
        if (!is_null($value)) {
            if (is_numeric($value)) {
                return $query->where('type_house_id', $value);
            } else {
                $typeHouse = TypeHouse::where('type_house', $value)->first();

                if ($typeHouse) {
                    return $query->where('type_house_id', $typeHouse->id);
                }

                return $query->whereRaw('1 = 0');
            }
        }

        return $query;
    }

    public function scopeSearch($query, $value)
    {
        if(!is_null($value)){
            return $query->where("address", "LIKE", "%".$value."%");
        }
    }
}
