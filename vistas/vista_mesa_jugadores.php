<div id="lista_jugadores">
	<h1>
		<img height="40px" style="vertical-align: middle;" src="img/homescreen.png" /> 
		<?php echo $idioma['mesa_titulo']; ?> 
		<span id="id_mesa_actual"><?php echo $datosmesa['id_mesa']; ?></span>
	</h1>
	<hr />

	<table width="100%" border="1px" id="tabla_jugadores">
	</table>
	
	
	<?php
	/* Comprueba si soy o no espectador. En caso de NO ser espectador */
	/* supone que soy jugador, y carga los botones para modificar mi estado. */
	if(!isset($soyespectador) || $soyespectador == false){
		echo "<span id='selector_de_avatar' style='display: none;'><br />Selecciona tu ficha:";
		echo "<span style='float:right;'><select id='avatar' name='avatar' onChange='javascript:actualizar_avatar()'>";
			foreach($avatares as $avatar){
				if($avatar['id_avatares'] == $miAvatar){
					echo "<option id='avatar".$avatar['id_avatares']."' value='".$avatar['id_avatares']."' selected='selected'>";
				}else{
					echo "<option id='avatar".$avatar['id_avatares']."' value='".$avatar['id_avatares']."'>";
				}
				echo $avatar[$_SESSION['idioma']];
			}
		echo "</select></span><br /></span><br />";
		include "vistas/vista_mesa_botones_estado.php";
	}
?>
</div>
