<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    use HasFactory;

    // Desactiva el manejo automático de timestamps para esta clase
    public $timestamps = false;

    public function houses()
    {
        // Establece una relación de "pertenece a muchos" (belongsToMany) con el modelo House
        // Utiliza la tabla intermedia 'feature_house' para gestionar la relación entre características (Feature) y casas (House).
        return $this->belongsToMany(House::class, 'feature_house');
    }
}
