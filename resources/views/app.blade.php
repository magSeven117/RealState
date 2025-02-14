<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @vite('resources/css/fontawesome.css')
        @vite('resources/css/templatemo-villa-agency.css')
        @vite('resources/css/owl.css')
        @vite('resources/css/animate.css')
        @vite('resources/css/style.css')
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

    </body>
</html>
