<?php
namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class FilterErrorService
{
    /**
     * Valida los filtros proporcionados en la solicitud.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function filterErrorsHouses(Request $request)
    {
        // Valida los filtros de precios.
        $result = $this->ErrorsPrice($request);
        if($result['error'])
            return $result;

        // Valida los filtros de tamaño.
        $result = $this->ErrorsSize($request);
        if($result['error'])
            return $result;

        // Valida el filtro de cuartos.
        if ($request->has('quarter') && $request->quarter <= 0) {
            return ['error' => true, 'message' => 'Quarter filter value must be greater than zero'];
        }
            
        // Valida el filtro de baños.
        if ($request->has('bathroom') && $request->bathroom <= 0) {
            return ['error' => true, 'message' => 'Bathroom filter value must be greater than zero'];
        }

        // Valida el filtro de tipo de casa.
        if ($request->has('type_house')) {
            // Verifica si type_house no es numérico
            if (is_numeric($request->type_house)) {
                return ['error' => true, 'message' => 'Type house filter value must not be numeric.'];
            }

            // Verifica la longitud de type_house
            if (Str::length($request->type_house) <= 0 || Str::length($request->type_house) >= 50) {
                return ['error' => true, 'message' => 'Type house filter value must be greater than zero and less than 50 characters.'];
            }
        }

        // Valida el filtro de características de la casa.
        if ($request->has('features')) {
            $features = $request->features;

            // Verifica si $features es un número
            if (is_numeric($features)) {
                return ['error' => true, 'message' => 'Features filter must not be a number.'];
            }

            // Verifica la longitud de $features
            if (Str::length($features) <= 0 || Str::length($features) >= 50) {
                return ['error' => true, 'message' => 'Features filter value must be greater than zero and less than 50 characters.'];
            }
        }

        // Si todos los filtros son válidos, retorna sin errores.
        return ['error' => false];
    }

    /**
     * Valida los filtros proporcionados en la solicitud.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function ErrorsSize(Request $request)
    {
        // Valida los filtros de tamaño.
        if ($request->has('maxSize')) {
            // Verifica si maxSize no es numérico
            if (!is_numeric($request->maxSize)) {
                return ['error' => true, 'message' => 'Max size must be a numeric value.'];
            }

            // Verifica si maxSize es menor o igual a 0
            if ($request->maxSize <= 0) {
                return ['error' => true, 'message' => 'Max size cannot be less than or equal to 0.'];
            }
        }

        if ($request->has('minSize')) {
            // Verifica si minSize no es numérico
            if (!is_numeric($request->minSize)) {
                return ['error' => true, 'message' => 'Min size must be a numeric value.'];
            }

            // Verifica si minSize es menor o igual a 0
            if ($request->minSize <= 0) {
                return ['error' => true, 'message' => 'Min size cannot be less than or equal to 0.'];
            }
        }

        // Verifica la consistencia de los valores
        if ($request->has('maxSize') && $request->has('minSize')) {
            if ($request->maxSize <= $request->minSize || $request->minSize >= $request->maxSize) {
                return ['error' => true, 'message' => 'Size filter values are inconsistent.'];
            }
        }

        // Si todos los filtros son válidos, retorna sin errores.
        return ['error' => false];
    }

    /**
     * Valida los filtros proporcionados en la solicitud.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function ErrorsPrice(Request $request)
    {
        // Valida los filtros de precios.
        if ($request->has('maxPrice')) {
            // Verifica si maxPrice no es numérico
            if (!is_numeric($request->maxPrice)) {
                return ['error' => true, 'message' => 'Max price must be a numeric value.'];
            }

            // Verifica si maxPrice es menor a 0
            if ($request->maxPrice < 0) {
                return ['error' => true, 'message' => 'Max price cannot be less than 0.'];
            }
        }

        if ($request->has('minPrice')) {
            // Verifica si minPrice no es numérico
            if (!is_numeric($request->minPrice)) {
                return ['error' => true, 'message' => 'Min price must be a numeric value.'];
            }

            // Verifica si minPrice es menor a 0
            if ($request->minPrice < 0) {
                return ['error' => true, 'message' => 'Min price cannot be less than 0.'];
            }
        }

        // Verifica la consistencia de los valores
        if ($request->has('maxPrice') && $request->has('minPrice')) {
            if ($request->maxPrice <= $request->minPrice || $request->minPrice >= $request->maxPrice) {
                return ['error' => true, 'message' => 'Price filter values are inconsistent.'];
            }
        }

        // Si todos los filtros son válidos, retorna sin errores.
        return ['error' => false];
    }
}