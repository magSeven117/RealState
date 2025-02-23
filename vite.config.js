import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx',
                'resources/css/fontawesome.css',
                'resources/css/templatemo-villa-agency.css',
                'resources/css/animate.css',
                'resources/css/flex-slider.css',
                'resources/css/owl.css',
                'resources/css/style.css',

            ],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
});
