<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    use HasFactory;

    // Permite asignar de manera masiva los siguientes campos en el modelo
    protected $fillable = [
        'house_id',       // ID de la casa relacionada
        'name',           // Nombre del visitante
        'lastname',       // Apellido del visitante
        'email',          // Correo electrónico del visitante
        'phone',          // Número de teléfono del visitante
        'date_visit',     // Fecha programada para la visita
        'visited_date',   // Fecha en que se realizó la visita
    ];

    // Define la relación con el modelo House
    public function house()
    {
        // Indica que este registro pertenece a una casa específica
        return $this->belongsTo(House::class);
    }

    // Define la relación con el modelo User
    public function user()
    {
        // Indica que este registro pertenece a un usuario específico
        return $this->belongsTo(User::class);
    }

    // Alcance para buscar visitantes por nombre
    public function scopeSearch($query, $value) {
        // Verifica si el valor de búsqueda no es nulo
        if (!is_null($value)) {
            // Filtra los registros cuyo nombre coincida con el valor proporcionado
            return $query->where('name', 'LIKE', "%$value%"); // Corrige el uso de '%' para que se interprete correctamente
        }

        // Si el valor es nulo, retorna la consulta sin cambios
        return $query;
    }

    // Alcance para filtrar visitas realizadas
    public function scopeVisited($query, $value) {
        // Si el valor es 'yes' o verdadero, filtra registros que tienen una fecha de visita
        if ($value === 'yes' || $value === true) {
            return $query->whereNotNull("visited_date");
        } 

        // Si el valor es 'no' o falso, filtra registros que no tienen una fecha de visita
        if ($value === 'no' || $value === false) {
            return $query->whereNull('visited_date');
        }

        // Si el valor es nulo o no coincide, retorna la consulta sin cambios
        return $query;
    }

    // Alcance para filtrar visitas pendientes
    public function scopePending($query, $value) {
        // Si el valor es 'yes' o verdadero, filtra registros que son pendientes
        if ($value === 'yes' || $value === true) {
            return $query->where('pending_visit', true);
        }

        // Si el valor es 'no' o falso, filtra registros que no son pendientes
        if ($value === 'no' || $value === false) {
            return $query->where('pending_visit', "!=", true);
        }

        // Si el valor es nulo o no coincide, retorna la consulta sin cambios
        return $query;
    }
}
