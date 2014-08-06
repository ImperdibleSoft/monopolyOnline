<?php include "includes/cabecera_comun.php"; ?>

<body class="principal" <?php 
	if(isset($_SESSION['email'])){
		echo 'style="background: url('.$wallpaper['ruta'].') '.$wallpaper['propiedades'].'"';
	}else{
		echo 'style="background: url(wallpapers/tapete.jpg) repeat;"';
	}	?>>
	<div id="consultarecibida"></div>
	<?php include "includes/widget_social.php"; ?>
	<?php include "includes/menu_error.php"; ?>
	<div id="anuncios" class="anuncios">
		<script src="js/adsense.js" type="text/javascript"></script>
		<script src="http://pagead2.googlesyndication.com/pagead/show_ads.js" type="text/javascript"></script>
	</div>
	<div id="contenedor">
		<?php if(isset($mensaje)){echo "<div id='sysmsg'>".$mensaje."</div>";}?>
