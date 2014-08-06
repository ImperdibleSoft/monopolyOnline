<?php
	
	/* Cuenta el numero de jugadores */
	echo "<div id='titulo'>";
		echo "<h1 class='juego'>Jugadores: <span id='partida_numero_jugadores'>".sizeof($jugadores)."</span></h1>";
	echo "</div>";
	echo "<div id='jugadores'>";
		echo "<div id='jugador1'></div>";
		echo "<div id='jugador2'></div>";
		echo "<div id='jugador3'></div>";
		echo "<div id='jugador4'></div>";
		echo "<div id='mensaje_estado'></div>";
		echo "<div id='datosjugador'></div>";
	echo "</div>";	
?>
