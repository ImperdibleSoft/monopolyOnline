<div id="header_inicio">
	<?php include "includes/menu_comun.php"; ?>
	<ul style="position:relative; display:inline-block; float:right;">
		<?php 
		if(isset($_SESSION['id_usuario'])){
			if($server == true && $_SESSION['nombre'] != "usuario" && !preg_match('/ver_mesas/', $_SERVER['REQUEST_URI']) && $_SERVER['REQUEST_URI'] != "/"){
				echo '<li><a href="/ver_mesas">'.$idioma['menu_mesas'].'</a></li>';
			}
			if($_SESSION['nombre'] != "usuario" && $_SESSION['nombre'] != "home" && $_SESSION['nombre'] != "productos" && $_SESSION['nombre'] != "servicios" && $_SESSION['nombre'] != "tecnologias" && $_SESSION['nombre'] != "portfolio" && $_SESSION['nombre'] != "contacto" && $_SESSION['nombre'] != "imperdiblesoft" && $_SESSION['nombre'] != "galerias" && $_SESSION['nombre'] != "skype" && $_SESSION['nombre'] != "formulario"){
				$enlace = $_SESSION['nombre'];
				
			}else{
				$enlace = $_SESSION['id_usuario'];
			}
			echo '<li><a href="http://www.imperdiblesoft.com/'.$enlace.'">'.$idioma['menu_micuenta'].'</a></li>';
			echo '<li><a id="cerrar_sesion" href="http://login.imperdiblesoft.com/?opt=logout">'.$idioma['menu_logout'].'</a></li>';
			echo '<li id="nombre_usuario" class="explicacion" alt="Tu nombre de usuario"><img height="18px" style="vertical-align: middle;" src="tipos_cuenta/'.$tipo_cuenta[$_SESSION['tipo_cuenta']]['nombre'].'.png"  class="explicacion" alt="Tipo de cuenta '.$tipo_cuenta[$_SESSION['tipo_cuenta']]['nombre'].'" /> '.$_SESSION['nombre'].'</li>';
			if(isset($_SESSION['administrador']) && $_SESSION['administrador'] > 0){
				echo '<li><a href="/admin">'.$idioma["menu_administrar"].'</a></li>';
			}else{
				echo '<li class="explicacion" alt="Abre una consulta para que sea respondida por un GM."><a id="boton_ticket" href="javascript:abrir_ticket()">Ticket</a></li>';
			}
		} 
		?>
		<li id="reloj_server" class="explicacion" alt="Hora del servidor"><?php echo date("H:i"); ?></li>
	</ul>
</div>
