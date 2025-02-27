<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecureHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        $policy = "
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval';
            style-src 'self' 'unsafe-inline';
            img-src 'self' data:;
            font-src 'self' data:;
            frame-src 'self' https://www.google.com;
        ";

        header("Content-Security-Policy: " . str_replace("\n", '', $policy));
        
	    return $next($request);
    }
}
