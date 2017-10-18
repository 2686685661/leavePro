<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Larvuent</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>
<body>
    <div id="app"></div>

    <script src="{{ url('js/manifest.js') }}"></script>
    <script src="{{ url('js/vendor.js') }}"></script>
    <script src="{{ url('js/app.js') }}"></script>
</body>
</html>