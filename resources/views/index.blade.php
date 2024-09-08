<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Villa</title>

    @viteReactRefresh
    @vite('resources/js/app.js')

    <link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css">
    @vite('resources/js/assets/css/fontawesome.css')
    @vite('resources/js/assets/css/templatemo-villa-agency.css')
    @vite('resources/js/assets/css/owl.css')
    @vite('resources/js/assets/css/animate.css')
</head>

<body>
    <div id="root"></div>

    @vite('resources/js/assets/js/isotope.min.js')
</body>

</html>
