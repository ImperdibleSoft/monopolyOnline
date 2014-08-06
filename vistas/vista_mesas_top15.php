<div id="top_usuarios">
	<h1>
		<img height="40px" style="vertical-align: middle;" src="img/homescreen.png" /> 
		<?php echo $idioma['top_ranking']; ?>
	</h1>
	<hr />
	<br />
	
	<table id="top15_tabla" border="1px">
	</table>
	<a class="letrapeque" href="/clasificacion">Ver toda la clasificación</a>
	<br />
	
	<p class="letrapeque" align="center">
		<span style="float:left;"><a class="letrapeque" href="/online"><?php echo $idioma['glo_usuarios_online']; ?></a>: <span id="usuarios_online"></span></span>
		<span style="float:right;"><?php echo $idioma['glo_usuarios_registrados']; ?>: <span id="usuarios_registrados"></span></span>
	</p>
</div>