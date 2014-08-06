<div id="topmenu">
	<ul style="display:inline;">
		<li><a href="http://www.imperdiblesoft.com" target="_blank"><img src="img/logo-imperdible.png" style="vertical-align: middle;"> Imperdible Soft</a></li>
	</ul>
	<ul id="menu_cabecera" style="position:relative; display:inline-block; float:right;">
		<li><a href="/dejar_partida">Dejar partida</a></li>
		<li id="nombre_usuario" class="explicacion" alt="Tu nombre de usuario"><?php echo "<img height='18px' style='vertical-align: middle;' src='http://www.imperdiblesoft.com/img/tipos_cuenta/".$tipo_cuenta[$_SESSION['tipo_cuenta']]['nombre'].".png'  class='explicacion' alt='Tipo de cuenta ".$tipo_cuenta[$_SESSION['tipo_cuenta']]['nombre']."' /> ".$_SESSION['nombre']; ?></li>
		<?php
		if(isset($_SESSION['administrador']) && $_SESSION['administrador'] > 0){
			echo '<li><a href="/admin" target="_blank">'.$idioma["menu_administrar"].'</a></li>';
		}else{
			echo '<li class="explicacion" alt="Abre una consulta para que sea respondida por un GM."><a id="boton_ticket" href="javascript:abrir_ticket()">Ticket</a></li>';
		}
		if($_SESSION['tipo_cuenta'] != 0){
		}
		?>
		<li id="reloj_server" class="explicacion" alt="Hora del servidor"><?php echo date("H:i"); ?></li>
		<li class="explicacion" alt="Versión del juego">v<?php echo $version; ?></li>
	</ul>
</div>

