<div id="lista_espectadores" style="display:none;">
	<h1>
		<img height="40px" style="vertical-align: middle;" src="img/homescreen.png" /> 
		<?php echo $idioma['mesas_espectadores']; ?>
	</h1>
	<hr />
	<table width="100%" id="tabla_espectadores">
	</table>
	
	<?php
	/* Comprueba si soy o no espectador. En caso de NO ser espectador */
	/* supone que soy jugador, y carga los botones para modificar mi estado. */
	if(isset($soyespectador) && $soyespectador == true){
		include "vistas/vista_mesa_botones_espectador.php";
	}
	?>
	<br />
</div>
