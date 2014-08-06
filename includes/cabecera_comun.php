<html>
<head>
	<title>Monopoly Online 2.0</title>	
	<link rel="shortcut icon" href="favicon.ico" >
	<link href="img/homescreen.png" rel="apple-touch-icon" />
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=1156, initial-scale=1" />
	<meta name="description" content="Monopoly Online v2.0. Juega online a este adictivo clásico." />

	<meta property="fb:app_id" content="230793537061670" />
	<meta property="fb:admins" content="1354010527" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Monopoly Online v2.0" />
	<meta property="og:author" content="http://www.imperdiblesoft.com" />
	<meta property="og:title" content="Monopoly Online v2.0" />
	<meta property="og:url" content="http://monopoly2.imperdiblesoft.com" />
	<meta property="og:image" content="http://www.imperdiblesoft.com/img/prod-monopoly.png" />	
	<meta property='og:description' content="Monopoly Online v2.0. Juega online a este adictivo clásico." />
	
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@ImperdibleSoft" />
	<meta name="twitter:creator" content="@ImperdibleSoft" />
	<meta name="twitter:title" content="Monopoly Online v2.0" />
	<meta name="twitter:url" content="http://monopoly2.imperdiblesoft.com" />
	<meta name="twitter:domain" content="imperdiblesoft.com" />
	<meta name="twitter:image" content="http://www.imperdiblesoft.com/img/prod-monopoly.png" />
	<meta name="twitter:description" content="Monopoly Online v2.0. Juega online a este adictivo clásico." />
	
	<link rel="author" href="https://plus.google.com/+Imperdiblesoft/" />
	<meta itemprop="url" content="http://monopoly2.imperdiblesoft.com" />
	<meta itemprop="name" content="Monopoly Online v2.0" />
	<meta itemprop="description" content="Monopoly Online v2.0. Juega online a este adictivo clásico." />
	<meta itemprop="thumbnail" content="http://schema.org/ImageObject" />
	<meta itemprop="thumbnailUrl" content="http://www.imperdiblesoft.com/img/prod-monopoly.png" />
	<link rel="stylesheet" type="text/css" href="reseteo.css" />
	<link rel="stylesheet" type="text/css" href="estilos.css" />
	<link href='http://fonts.googleapis.com/css?family=Maven+Pro' rel='stylesheet' type='text/css'>
	<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
	<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
	<script src="js/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
	<script src="js/analytics.js" type="text/javascript"></script>
	<script src="js/efectos.js" type="text/javascript"></script>
	<script type="text/javascript">
		precargar_ui();
		<?php if(preg_match("/partida/", $_SERVER['SCRIPT_NAME'])){
			echo "precargar_juego();";
		} ?>
	</script>
	<?php if(isset($_SESSION['id_usuario'])){
		echo '<script type="text/javascript">';
			echo 'estado_partida("'.$_SESSION['id_usuario'].'"); ';
			echo '$(document).ready(function(){';
				echo '$("div#portada_contenido").children("div.espaciador").each(function(){';
					echo '$(this).css("background", "url(http://www.imperdiblesoft.com/img/'.$wallpaper['ruta'].') '.$wallpaper['propiedades'].'");';
				echo '});';
			echo '});';
		echo '</script>';
	} ?>
	
</head>