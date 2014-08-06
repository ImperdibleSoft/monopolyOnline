<?php
	if(isset($_SESSION['id_usuario'])){
		$logeado = true;
	}else{
		$logeado = false;
	}

	include "includes/cabecera_error.php";
?>
<div id="portada_contenido">
	<div class="espaciador"></div>
	<div class="feature">
		<h1>Error</h1>
		<br />
		<p><?php echo $error; ?></p>
	</div>
	<div class="espaciador"></div>
</div>
<?php include "includes/pie.php"; ?>