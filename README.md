<p align="center"><a href="https://github.com/Ndnestor098/RealState" target="_blank"><img src="https://ndnestor098.github.io/WebCV/assets/img/Villa.png" width="100%" alt="Real State Logo"></a></p>

# Real State Villa

## Descripción

Real State Villa es una aplicación web desarrollada con Laravel y React, donde Laravel actúa como la API backend y React como el frontend. Esta aplicación está diseñada para gestionar bienes raíces, incluyendo funcionalidades como la visualización de casas, características de las propiedades, visitas, y notificaciones.

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

5. Ejecuta las migraciones de la base de datos:

```bash
php artisan migrate
```

6. Inicia el servidor de desarrollo:

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

## Licencia

Este proyecto está licenciado bajo la Apache License 2.0. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Si tienes alguna pregunta o sugerencia, por favor contacta a [Nestor Daniel](mailto:trabajo.nestor.098@gmail.com).

---

¡Gracias por usar Real State Villa!
