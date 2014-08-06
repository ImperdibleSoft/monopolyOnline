<?php	

	/* Si hemos iniciado sesión */
	if(isset($_SESSION['id_usuario']) && !empty($_SESSION['id_usuario'])){

		/* Cargamos el idioma del usuario en $idioma */
		$sql = "SELECT idioma FROM usuarios WHERE id_usuario='".$_SESSION['id_usuario']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$error = mysqli_error($conexion);
			include "error.php";
			exit();
		}
		$temp = array();
		while($fila = mysqli_fetch_array($resul)){
			$idiomas = $fila['idioma'];
		}
		
		/* Cargamos el wallpaper del usuario en $wallpaper */
		$sql = "SELECT ruta, propiedades FROM mon_wallpapers WHERE id_wallpapers=(SELECT wallpaper FROM usuarios WHERE id_usuario='".$_SESSION['id_usuario']."')";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$error = mysqli_error($conexion);
			include "error.php";
			exit();
		}
		$wallpaper = array();
		while ($fila = mysqli_fetch_array($resul)){
			$wallpaper = array("ruta" => $fila['ruta'], "propiedades" => $fila['propiedades']);
		}
		
		/* Cargamos el tipo de cuenta del usuario en $tipo_cuenta */
		$sql = "SELECT * FROM tipos_cuenta ORDER BY id_tipos_cuenta ASC";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$error = mysqli_error($conexion);
			include "error.php";
			exit();
		}
		$tipo_cuenta = array();
		while ($fila = mysqli_fetch_array($resul)){
			$tipo_cuenta[$fila['id_tipos_cuenta']] = limpiar_array($fila);
		}
		
	/* Si no hemos iniciado sesión */
	}else{
	
		/* Cargamos el idioma de la cookie o del navegador */
		if(isset($_SERVER["HTTP_ACCEPT_LANGUAGE"])){
			$idiomas = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"],0,5);
			$idiomas = substr($idiomas,0,2).substr($idiomas,3,4);
		}
		if(!isset($idiomas)){
			$idiomas = "esES";
		}else if(($idiomas != "esES" && $idiomas != "eses")){
			$idiomas = "enEN";
		}
		/* True = Fuerza un idioma */
		if(false){$idiomas = "esES";}
		
		/* Cargamos el wallpaper por defecto */
		$wallpaper = array("ruta" => "wallpapers/tapete.jpg", "propiedades" => "repeat");
	}
	
	$sql = "SELECT id_mensajes, ".$idiomas." FROM mon_mensajes";
	$resul = mysqli_query($conexion, $sql);
	if(!$resul){
		$error = mysqli_error($conexion);
		include "error.php";
		exit();
	}
	$idioma = array();
	while ($fila = mysqli_fetch_array($resul)){
		$idioma[$fila['id_mensajes']] = $fila[$idiomas];
	}
	$idioma[$fila['id_mensajes']] = $fila[$idiomas];
?>
