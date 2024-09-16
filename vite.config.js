import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        // react(),
    ],
    server: {
        historyApiFallback: true, 
        host: '192.168.1.117',  // Permite conexiones desde cualquier IP
        port: 3000,       // Asegúrate de que el puerto sea el correcto
      },
});
