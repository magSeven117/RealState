<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RoleAccess
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if (!$user) {
            abort(403, 'Acceso denegado. Usuario no autenticado.');
        }

        // Obtener roles del usuario
        $allowedRoles = ['admin', 'employee'];
        $hasAccess = $user->roles()->whereIn('slug', $allowedRoles)->exists();

        if (!$hasAccess) {
            abort(403, 'Acceso denegado. No tienes los permisos necesarios.');
        }

        return $next($request);
    }
}

