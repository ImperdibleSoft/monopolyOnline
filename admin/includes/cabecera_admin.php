<html>
<head>
	<title>Monopoly Online 2.0</title>
	
	<link rel="shortcut icon" href="../favicon.ico" >
	<link href="../img/homescreen.png" rel="apple-touch-icon" />
	
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=1044, user-scalable=no" />
	
	<link rel="stylesheet" type="text/css" href="../reseteo.css" />
	<link rel="stylesheet" type="text/css" href="../estilos.css" />
	<link href='http://fonts.googleapis.com/css?family=Maven+Pro' rel='stylesheet' type='text/css'>

	<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
	<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
	<script src="../js/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
	<script src="../admin/includes/efectos.js" type="text/javascript"></script>
</head>

<body class="principal" style="background:#000 url('<?php echo "http://www.imperdiblesoft.com/img/".$wallpaper['ruta']; ?>') <?php echo $wallpaper['propiedades']; ?>">
	<div id="consultarecibida" style="width:100%; background:white; word-wrap: break-word;"></div>
	<?php include "includes/menu_admin.php"; ?>
	<div id="anuncios">
		<script src="../js/adsense.js" type="text/javascript"></script>
		<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>
	</div>
	<div id="contenedor">
		<?php if(isset($mensaje)){echo "<div id='sysmsg'>".$mensaje."</div>";}?>
		<?php include "includes/menu_secciones.php"; ?>
