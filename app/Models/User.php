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


    public function scopeRole($query, $role)
    {
        if(!is_null($role)){
            return $query->where('role', $role);
        }

        return $query;
    }

    public function scopeName($query, $name)
    {
        if(!is_null($name))
        {
            return $query->where('name', 'LIKE', `%$name&`);
        }

        return $query;
    }

    public function scopeEmail($query, $email)
    {
        if(!is_null($email))
        {
            return $query->where('email', 'LIKE', `%$email%`);
        }

        return $query;
    }
}

