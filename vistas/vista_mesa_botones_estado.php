<?php
	echo "<form id='usuario_listo' action='' method='POST'>";

		/* Crea el boton para cambiar mi estado. */
		echo "<input type='button' id='estado_izda' name='usuario_listo' style='display: none' />";
	
		/* Crea el botón "Dejar mesa" o "Empezar". Los valores se asignarán por javascript. */
		echo "<input id='estado_dcha' style='display: none' />";
	
		echo "<input type='hidden' name='idmesa' value='".$datosmesa['id_mesa']."' />";
	echo "</form>";
?>
