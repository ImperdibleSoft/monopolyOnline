<?php
	include "funciones/conexion.php";
	include "funciones/funciones.php";
	session_start();
	include "funciones/configuracion.php";
	
	/*	Obtiene la versión del sistema */
	$sql = "SELECT version FROM mon_changelog ORDER BY version DESC LIMIT 1";
	$resul = mysqli_query($conexion, $sql);
	if(!$resul){
		$error = mysqli_error($conexion);
		include "error.php";
		exit();
	}
	$version = array();
	while($fila = mysqli_fetch_array($resul)){
		$version = $fila['version'];
	}

	/* Actualiza el dato de la última conexión */
	$sql = "UPDATE usuarios SET
			online = 1,
			ip_ultima_conexion = '".$_SERVER['REMOTE_ADDR']."',
			fecha_ultima_conexion = now()
		WHERE id_usuario='".$_SESSION['id_usuario']."'";
	$resul = mysqli_query($conexion, $sql);
	if(!$resul){
		$error = mysqli_error($conexion);
		include "error.php";
		exit();
	}
	
	/*	Comprueba si está como espectador en alguna mesa, y carga sus datos */
	$sql = "SELECT * FROM mon_espectadores WHERE id_usuario='".$_SESSION['id_usuario']."'";
	$resul = mysqli_query($conexion, $sql);
	if(!$resul){
		$error = mysqli_error($conexion);
		include "error.php";
		exit();
	}
	$espectadores = array();
	while($fila = mysqli_fetch_array($resul)){
		$espectadores[$fila['id_usuario']] = limpiar_array($fila);
	}
	
	/*	Si no hay espectadores, busca la mesa en donde estoy sentado */
	if(empty($espectadores)){
		$sql = "SELECT * FROM mon_partidas_jugadores WHERE id_partida=(SELECT id_mesa FROM mon_mesas WHERE 
			jugador1='".$_SESSION['id_usuario']."' OR 
			jugador2='".$_SESSION['id_usuario']."' OR 
			jugador3='".$_SESSION['id_usuario']."' OR 
			jugador4='".$_SESSION['id_usuario']."')";
	}
	
	/*	Si soy espectador, busca los jugadores de la partida que estoy mirando */
	else{
		$sql = "SELECT * FROM mon_partidas_jugadores WHERE id_partida='".$espectadores[$_SESSION['id_usuario']]['id_mesa']."'";
	}
	
	$resul = mysqli_query($conexion, $sql);
	if(!$resul){
		$error = mysqli_error($conexion);
		include "error.php";
		exit();
	}
	$jugadores = array();
	while($fila = mysqli_fetch_array($resul)){
		$jugadores[$fila['id_jugador']] = limpiar_array($fila);
	}

	
	/*	Si no está sentado en ninguna mesa, y no está de espectador */
	/*	redirige a la página principal */
	if(empty($jugadores) && empty($espectadores)){
	
		header("Location: /ver_mesas");
		exit();
	}
	
	else{
		if(!empty($jugadores)){
			foreach($jugadores as $jugador){
				$mesa_actual = $jugador['id_partida'];
				$mimesa = $jugador['id_partida'];
			}
			
		}else{
			$mesa_actual = $espectadores[$_SESSION['id_usuario']]['id_mesa'];
			$mimesa = $espectadores[$_SESSION['id_usuario']]['id_mesa'];
		}
	}
	
	/*	Dejar la partida */
	if(isset($_GET['action']) && $_GET['action'] == "dejar_partida"){
		
		/*	Obtiene los datos de la mesa */
		$sql = "SELECT * FROM mon_mesas WHERE id_mesa='".$mesa_actual."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$error = mysqli_error($conexion);
			include "error.php";
			exit();
		}
		$mesa = array();
		while($fila = mysqli_fetch_array($resul)){
			$mesa = limpiar_array($fila);
		}
		
		/*	Obtiene los datos de los jugadores */
		$sql = "SELECT * FROM mon_partidas_jugadores WHERE id_partida='".$mesa_actual."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$error = mysqli_error($conexion);
			include "error.php";
			exit();
		}
		$jugadores = array();
		while($fila = mysqli_fetch_array($resul)){
			$jugadores[$fila['id_jugador']] = limpiar_array($fila);
		}
		
		/*	Obtiene los datos de los espectadores */
		$sql = "SELECT * FROM mon_espectadores WHERE id_mesa='".$mesa_actual."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$error = mysqli_error($conexion);
			include "error.php";
			exit();
		}
		$espectadores = array();
		while($fila = mysqli_fetch_array($resul)){
			$espectadores[$fila['id_usuario']] = limpiar_array($fila);
		}
		
		foreach($mesa as $clave => $valor){
		
			/*	Comprueba si soy jugador */
			if(($clave == "jugador1" || $clave == "jugador2" || $clave == "jugador3" || $clave == "jugador4") && $valor == $_SESSION['id_usuario']){
	
				/*	Comprueba si soy el último jugador en salir */
				if(count($jugadores) > 1){
				
					/*	Añade 1 desconexión si abandono sin ser el último */
					$sql = "INSERT INTO mon_desconexiones (id_usuario, id_partida, fecha) VALUES ('".$_SESSION['id_usuario']."', '".$mesa_actual."', now())";
					$resul = mysqli_query($conexion, $sql);
					if(!$resul){
						$error = mysqli_error($conexion);
						include "error.php";
						exit();
					}
				}
				
				/*	Le entrega las propiedades al banco */
				$sql = "UPDATE mon_partidas_propiedades SET id_propietario = '0', casas = '0', hipotecada = '0' WHERE id_propietario = '".$valor."'";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
				
				/*	Le entrega las tarjetas al banco */
				$sql = "UPDATE mon_partidas_comunidades SET propietario = '0' WHERE propietario = '".$valor."'";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
				
				$sql = "UPDATE mon_partidas_suertes SET propietario = '0' WHERE propietario = '".$valor."'";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
				
				/*	Sale de la mesa */
				$sql = "UPDATE mon_mesas SET ".$clave."=NULL, ".$clave."ok=NULL, ".$clave."avatar='0' WHERE id_mesa='".$mesa_actual."'";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$error = mysqli_error($conexion);
					include "error.php";
					exit();
				}
		
				/*	Sale de la partida */
				$sql = "DELETE FROM mon_partidas_jugadores WHERE id_jugador='".$_SESSION['id_usuario']."'";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$error = mysqli_error($conexion);
					include "error.php";
					exit();
				}
				
				unset($jugadores[$_SESSION['id_usuario']]);
			}
			
			/*	Si soy espectador */
			else{
				$sql = "DELETE FROM mon_espectadores WHERE id_usuario='".$_SESSION['id_usuario']."'";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$error = mysqli_error($conexion);
					include "error.php";
					exit();
				}
				
				unset($espectadores[$_SESSION['id_usuario']]);
			}
		}
		
		/*	Manda una notificación */
		$sql = "INSERT INTO mon_notificaciones (id_usuario, id_partida, fecha, texto) VALUES ('".$_SESSION['id_usario']."', '".$mesa_actual."', now(), '".$_SESSION['nombre']." ha salido de la partida.')";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion);
			echo json_encode($response);
			exit();
		}
		
		/*	Obtiene los datos de los jugadores */
		$sql = "SELECT * FROM mon_partidas_jugadores WHERE id_partida='".$mesa_actual."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$error = mysqli_error($conexion);
			include "error.php";
			exit();
		}
		$jugadores = array();
		while($fila = mysqli_fetch_array($resul)){
			$jugadores[$fila['id_jugador']] = limpiar_array($fila);
		}
		
		/*	Obtiene los datos de los espectadores */
		$sql = "SELECT * FROM mon_espectadores WHERE id_mesa='".$mesa_actual."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$error = mysqli_error($conexion);
			include "error.php";
			exit();
		}
		$espectadores = array();
		while($fila = mysqli_fetch_array($resul)){
			$espectadores[$fila['id_usuario']] = limpiar_array($fila);
		}
		
		/*	Si soy el último en salir */
		if(empty($jugadores)){
		
			/* Eliminamos los datos de la partida */
			$sql = "DELETE FROM mon_mesas WHERE id_mesa='".$mesa_actual."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$error = mysqli_error($conexion);
				include "error.php";
				exit();
			}
		
			/* Eliminamos los jugadores referentes a esa partida */
			$sql = "DELETE FROM mon_partidas_jugadores WHERE id_partida='".$mesa_actual."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$error = mysqli_error($conexion);
				include "error.php";
				exit();
			}
		
			/* Eliminamos los espectadores referentes a esa partida */
			$sql = "DELETE FROM mon_espectadores WHERE id_mesa='".$mesa_actual."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$error = mysqli_error($conexion);
				include "error.php";
				exit();
			}
		
			/* Eliminamos las propiedades referentes a esa partida */
			$sql = "DELETE FROM mon_partidas_propiedades WHERE id_partida='".$mesa_actual."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$error = mysqli_error($conexion);
				include "error.php";
				exit();
			}
		
			/* Eliminamos las suertes referentes a esa partida */
			$sql = "DELETE FROM mon_partidas_suertes WHERE id_partida='".$mesa_actual."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$error = mysqli_error($conexion);
				include "error.php";
				exit();
			}
		
			/* Eliminamos las comunidades referentes a esa partida */
			$sql = "DELETE FROM mon_partidas_comunidades WHERE id_partida='".$mesa_actual."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$error = mysqli_error($conexion);
				include "error.php";
				exit();
			}
		
			/* Eliminamos las notificaciones referentes a esa partida */
			$sql = "DELETE FROM mon_notificaciones WHERE id_partida='".$mesa_actual."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$error = mysqli_error($conexion);
				include "error.php";
				exit();
			}
		
			/* Eliminamos las negociaciones referentes a esa partida */
			$sql = "DELETE FROM mon_negociaciones WHERE id_partida='".$mesa_actual."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$error = mysqli_error($conexion);
				include "error.php";
				exit();
			}
		
			/* Eliminamos los chats referentes a esa partida */
			$sql = "DELETE FROM mon_chat WHERE id_mesa='".$mesa_actual."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$error = mysqli_error($conexion);
				include "error.php";
				exit();
			}
		
		}
		
		/*	Me redirige a la página principal */
		header('Location: /ver_mesas');
		exit();
	}

	include "vistas/vista_partida.php";
	exit();
?>


