<?php
namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageService
{
    /**
     * Confirma y guarda las imagenes en el almacenamiento.
     * 
     * @param array $images Este array de imágenes debe venir del Request para guardar las nuevas imágenes.
     * @return array|JsonResponse Retorna un array de rutas de las imágenes guardadas o un JSON de error si alguna imagen es inválida.
     */
    public function SaveImage($images) {
        // Inicializa un array para almacenar las rutas de las imágenes guardadas.
        $imagePaths = [];

        // Recorre cada imagen en el array proporcionado.
        foreach ($images as $image) {
            // Verifica si la imagen es válida.
            if($image->isValid()){
                // Genera un nombre único para la imagen utilizando la marca de tiempo y un identificador único.
                $fileName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                // Guarda la imagen en el directorio 'images' en el almacenamiento público y obtiene la ruta de la imagen.
                $path = $image->storeAs('images', $fileName, 'public');
                // Agrega la ruta de la imagen al array de rutas.
                array_push($imagePaths, $path);
            } else {
                // Si la imagen no es válida, retorna una respuesta JSON con el mensaje de error.
                return response()->json([
                    'message' => 'The image is invalid.',
                    'error' => ['The image is invalid.'],
                    'status' => 422
                ], 422);
            }
        }

        // Retorna el array de rutas de las imágenes que se han guardado exitosamente.
        return $imagePaths;
    }


    /**
     * Confirma el cambio entre el Request y el Modelo en relación a las imágenes.
     * 
     * @param array $image_model Este array de imágenes debe venir del modelo para confirmar si hay algún cambio entre la Request y el modelo.
     * @param array $image_old Este array de imágenes debe venir del Request que contendría los posibles nuevos cambios.
     * @return bool Retorna verdadero si hay cambios en las imágenes; de lo contrario, retorna falso.
     */
    public function checkChangeImages($image_model, $image_old) {
        // Recorre cada imagen en el array proveniente del modelo.
        foreach ($image_model as $value) {
            // Verifica si la imagen del modelo no está presente en el array de imágenes nuevas del Request.
            if (!empty($image_old) && !in_array($value, $image_old)) {
                // Si se encuentra una imagen que no coincide, significa que hay un cambio.
                return true;
            }
        }

        // Si no se encontraron cambios, retorna falso.
        return false;
    }

    /**
     * Elimina las imágenes del almacenamiento.
     * 
     * @param array $images Array de rutas de las imágenes que deben eliminarse.
     * 
     * @return void
     */
    public function deleteImages(array $images)
    {
        // Recorre cada imagen en el array proporcionado.
        foreach ($images as $image) {
            // Verifica si el archivo existe antes de intentar eliminarlo.
            if (Storage::disk('public')->exists($image)) {
                // Elimina la imagen del almacenamiento público.
                Storage::disk('public')->delete($image);
            }
        }
    }

}