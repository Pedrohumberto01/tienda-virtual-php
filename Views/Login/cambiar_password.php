<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Pedro Romero">
    <meta name="theme-color" content="#009688">
    <link rel="shortcut icon" href="<?= media();?>/images/shop.ico">
    <!-- Main CSS-->
    <link rel="stylesheet" type="text/css" href="<?= media();?>/css/main.css">
    <link rel="stylesheet" type="text/css" href="<?= media();?>/css/style.css">
    <!-- Font-icon css-->
    <title><?= $data['page_tag']; ?></title>
  </head>
  <body>
    <section class="material-half-bg">
      <div class="cover"></div>
    </section>
    <section class="login-content">
      <div class="logo">
        <h1><?= $data['page_title']; ?></h1>
      </div>
      <div class="login-box flipped">
        <form class="forget-form" id="formCambiarPass" name="formCambiarPass" action="">
          <input type="hidden" name="idUsuario" id="idUsuario" value="<?= $data['idpersona']; ?>" required>
          <input type="hidden" name="txtEmail" id="txtEmail" value="<?= $data['email']; ?>" required>
          <input type="hidden" name="txtToken" id="txtToken" value="<?= $data['token']; ?>" required>
          <h3 class="login-head"><i class="fas fa-key"></i> Cambiar contraseña</h3>
          <div class="form-group">
            <input id="txtPassword" name="txtPassword" class="form-control" type="password" placeholder="Nueva contraseña" required>
          </div>
          <div class="form-group">
            <input id="txtPasswordConfirm" name="txtPasswordConfirm" class="form-control" type="password" placeholder="Repita la contraseña" required>
          </div>
          <div class="form-group btn-container">
            <button type="submit" class="btn btn-primary btn-block"><i class="fa fa-unlock fa-lg fa-fw"></i>Reiniciar</button>
          </div>
        </form>
      </div>
    </section>

    <script>
    	const base_url = "<?= base_url(); ?>";
    </script>

    <!-- Essential javascripts for application to work-->
    <script src="<?= media();?>/js/jquery-3.3.1.min.js"></script>
    <script src="<?= media();?>/js/popper.min.js"></script>
    <script src="<?= media();?>/js/bootstrap.min.js"></script>
    <script src="<?= media();?>/js/fontawesome.js"></script>
    <script src="<?= media();?>/js/main.js"></script>
    <!-- The javascript plugin to display page loading on top-->

    <script type="text/javascript" src="<?= media(); ?>/js/plugins/sweetalert.min.js"></script>
    <script src="<?= media();?>/js/<?= $data['page_functions_js']; ?>"></script>

    <script src="<?= media();?>/js/plugins/pace.min.js"></script>
    
  </body>
</html>