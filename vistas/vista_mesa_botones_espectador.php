<?php
	echo "<form id='usuario_listo' action='/entrar_mesa-".$datosmesa['id_mesa']."' method='POST'>";

	/* Crea el botón "Dejar mesa". */
	echo "<input type='submit' name='dejar_mesa_espectador' class='cancelar' value='".$idioma['mesas_dejar']."'/>";
	
	echo "<input type='hidden' name='idmesa' value='".$datosmesa['id_mesa']."' />";
	echo "</form>";
?>
