<p align="center"><a href="https://github.com/Ndnestor098/RealState" target="_blank"><img src="/public/images/page.webp" width="100%" alt="Real State Logo"></a></p>

# Real State

## Descripción

Real State es una aplicación web para la gestión de bienes raíces, desarrollada con Laravel, Inertia.js y React. Laravel actúa como el backend, manejando la lógica del servidor y la base de datos, mientras que Inertia.js facilita la renderización de las vistas sin necesidad de una API tradicional. React se encarga de la interfaz de usuario, proporcionando una experiencia dinámica y fluida. La aplicación permite visualizar propiedades, gestionar sus características, programar visitas y recibir notificaciones, todo en un entorno moderno y eficiente.

## Tecnologías

-   **Backend:** Laravel 11.9
-   **Framework:** Inertia 2.0
-   **Frontend:** React 18.2
-   **Base de datos:** MySQL o SQLite

## Requisitos

-   **PHP:** ^8.2
-   **Node.js y NPM:** Requeridos para la instalación de dependencias del frontend
-   **Composer:** Para manejar dependencias de PHP
-   **MySQL:** Para almacenar la base de datos

## Instalación

1. Clona el repositorio:

```bash
git https://github.com/Ndnestor098/RealState.git
cd RealState
```

2. Configura el entorno:

    Copia el archivo `.env.example` a `.env` y ajusta las configuraciones necesarias para la base de datos y otros servicios.

```bash
cp .env.example .env
```

3. Instala las dependencias de PHP y Node.js:

```bash
composer install
npm install
```

4. Genera la clave de la aplicación:

```bash
php artisan key:generate
```

5. Configura la base de datos en el archivo .env con las credenciales correspondientes:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_de_tu_base_de_datos
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
```

6. Ejecuta las migraciones de la base de datos:

```bash
php artisan migrate
```

7. (Opcional) Si deseas poblar la base de datos con datos de prueba:

```bash
php artisan migrate --seed
```

8. (Opcional) Guarda algunas imágenes en la carpeta storage/app/public/images para mejor visualización:

```
casa-1-1.jpeg
casa-1-2.jpeg
casa-1-3.jpeg
casa-2-1.jpeg
casa-2-2.jpeg
casa-2-3.jpeg
```

9. (Opcional) El usuario creado por el seeder para pruebas en el Dashboard en la ruta "/dashboard":

```
Email: test@example.com
Password: test
```

10. (Opcional) Ejecuta los test para verificar que la aplicación esté funcionando correctamente:

```bash
php artisan test
```

10. Inicia el servidor de desarrollo:

```bash
php artisan serve
npm run dev
```

## Dependencias principales

### Backend

```json
"require": {
    "php": "^8.2",
    "inertiajs/inertia-laravel": "^2.0",
    "laravel/framework": "^11.31",
    "laravel/sanctum": "^4.0",
    "laravel/tinker": "^2.9",
    "tightenco/ziggy": "^2.0"
},
```

### Frontend

```json
"dependencies": {
    "bootstrap": "^5.3.3",
    "react-bootstrap": "^2.10.9",
    "react-flatpickr": "^3.10.13",
    "react-image-gallery": "^1.4.0",
    "recharts": "^2.15.1",
    "suneditor": "^2.47.5"
}
```

### Dev Dependencies

```json
"devDependencies": {
    "@headlessui/react": "^2.0.0",
    "@inertiajs/react": "^2.0.0",
    "@tailwindcss/forms": "^0.5.3",
    "@vitejs/plugin-react": "^1.3.2",
    "autoprefixer": "^10.4.12",
    "axios": "^1.7.4",
    "concurrently": "^9.0.1",
    "laravel-vite-plugin": "^1.2.0",
    "postcss": "^8.4.31",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.2.1",
    "vite": "^6.1.0"
}
```

## Contribución

¡Las contribuciones son bienvenidas! Para contribuir, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commits (`git commit -am 'Agrega nueva característica'`).
4. Sube los cambios a tu fork (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

Nota: Asegúrate de que tu código pase los tests y siga las guías de estilo del proyecto antes de hacer un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Apache License 2.0. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Si tienes alguna pregunta o sugerencia, por favor contacta a [Nestor Daniel](mailto:trabajo.nestor.098@gmail.com).

---

¡Gracias por usar Real State!
