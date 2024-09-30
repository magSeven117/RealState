<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Define la relación con el modelo Visit
    public function visits()
    {
        // Indica que un usuario puede tener muchas visitas
        return $this->hasMany(Visit::class);
    }

    // Alcance para filtrar por rol
    public function scopeRole($query, $role)
    {
        // Verifica si el rol no es nulo
        if (!is_null($role)) {
            // Filtra los usuarios por el rol especificado
            return $query->where('role', $role);
        }

        // Si el rol es nulo, retorna la consulta sin cambios
        return $query;
    }

    // Alcance para filtrar por nombre
    public function scopeName($query, $name)
    {
        // Verifica si el nombre no es nulo
        if (!is_null($name)) {
            // Filtra los usuarios cuyo nombre coincida con el valor proporcionado
            return $query->where('name', 'LIKE', "%$name%"); // Corrige el uso de '%' para que se interprete correctamente
        }

        // Si el nombre es nulo, retorna la consulta sin cambios
        return $query;
    }

    // Alcance para filtrar por correo electrónico
    public function scopeEmail($query, $email)
    {
        // Verifica si el correo electrónico no es nulo
        if (!is_null($email)) {
            // Filtra los usuarios cuyo correo electrónico coincida con el valor proporcionado
            return $query->where('email', 'LIKE', "%$email%"); // Corrige el uso de '%' para que se interprete correctamente
        }

        // Si el correo electrónico es nulo, retorna la consulta sin cambios
        return $query;
    }


}

