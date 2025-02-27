<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? 'Error' }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 100px;
        }
        h1 {
            font-size: 50px;
        }
        p {
            font-size: 20px;
            color: #666;
        }
        a {
            border: 1px solid black;
            padding: 7px 14px;
            text-decoration: none;
            color: black;
            font-weight: 600;
            border-radius: 5px;
            transition: all ease 0.4s;
        }

        a:hover {
            font-size: 18px;
        }
    </style>
</head>
<body>
<h1>{{ $title ?? 'Oops!' }}</h1>
<p>{{ $message ?? 'Algo salió mal' }}</p>
<a href="{{ url('/') }}">Volver al inicio</a>
</body>
</html>
