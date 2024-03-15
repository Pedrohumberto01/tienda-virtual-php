
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tienda Virtual</title>
    <link rel="shortcut icon" href="<?= media();?>/images/shop.ico">
    <link rel="stylesheet" type="text/css" href="<?= media(); ?>/css/main.css">
    <link rel="stylesheet" type="text/css" href="<?= media(); ?>/css/bootstrap-select.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f2f2f2;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
    </style>
</head>
<body>

<div class="card mb-3" style="max-width: 500px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="<?=media();?>/images/panel.png" class="card-img" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title text-center">Tienda Virtual</h5>
        <p class="card-text text-center">Bienvenido al panel de control de Tienda Virtual | Proyecto elaborado por: Pedro Humberto Romero Colindres.</p>
        <a class="btn btn-success" href="<?=base_url();?>/dashboard">Ver Proyecto</a>
      </div>
    </div>
  </div>
</div>

</body>
</html>
