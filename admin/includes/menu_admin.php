<div id="topmenu">
	<ul style="display:inline;">
		<li style="display:inline;"><a href="http://www.imperdiblesoft.com" target="_blank"><img src="../img/logo-imperdible.png" style="vertical-align: middle;"> ImperdibleSoft</a></li>
	</ul>
	
	<ul style="position:relative; display:inline-block; float:right;">
		<?php 
		if(isset($_SESSION['id_usuario'])){
			echo '<li id="nombre_usuario"><img height="18px" style="vertical-align: middle;" src="http://www.imperdiblesoft.com/img/tipos_cuenta/'.$tipo_cuenta[$_SESSION['tipo_cuenta']]['nombre'].'.png" /> '.$_SESSION['nombre'].'</li>';
			
			if($_SESSION['administrador'] >= 1){
				echo '<li><a href="/ver_mesas">Usuario</a></li>';
			}
		} 
		?>
		<li><?php echo date("H:i"); ?></li>
		<li>v<?php echo $version; ?></li>
	</ul>
</div>