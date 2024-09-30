<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeHouse extends Model
{
    use HasFactory;

    // Define la propiedad $fillable para la clase, especificando los atributos que se pueden asignar masivamente
    protected $fillable = ['name'];

    // Desactiva el manejo automático de timestamps para esta clase
    public $timestamps = false;

    // Define la relación con el modelo House
    public function houses()
    {
        // Establece una relación de "tiene muchos" (hasMany) con el modelo House
        // Indica que este modelo (probablemente TypeHouse) puede tener muchas casas asociadas
        return $this->hasMany(House::class, 'type_house_id');
    }
}
