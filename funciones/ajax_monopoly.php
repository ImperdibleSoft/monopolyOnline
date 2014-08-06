<?php
include "../funciones/conexion.php";
include "../funciones/funciones.php";

	$response = array();
	
	/*	Obtiene la hora del sistema */
	$response['hora'] = date("H:i");
	
	/*	Obtiene la versión del sistema */
	$sql = "SELECT version FROM mon_changelog ORDER BY version DESC LIMIT 1";
	$resul = mysqli_query($conexion, $sql);
	if(!$resul){
		$error = mysqli_error($conexion);
		include "error.php";
		exit();
	}
	while($fila = mysqli_fetch_array($resul)){
		$response['version'] = $fila['version'];
	}
	
	if(isset($_GET['id_usuario'])){ $id_usuario = $_GET['id_usuario']; }
	
	/* -------------------------------------------------- */
	/* --- Tickets -------------------------------------- */
	/* -------------------------------------------------- */
	/*	Escribe un ticket */
	if(isset($_POST['ticket'])){
		
		/*	Busca un ticket abierto por el usuario */
		$sql = "SELECT * FROM mon_tickets WHERE id_usuario='".$_POST['id_usuario']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$ticket = array();
		while($fila = mysqli_fetch_array($resul)){
			$ticket = limpiar_array($fila);
		}
		
		if(!empty($ticket)){
		
			/*	Si ya tiene un ticket abierto */
			$sql = "UPDATE mon_tickets SET consulta='".$_POST['ticket']."' WHERE id_ticket='".$ticket['id_ticket']."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$response['error'] = mysqli_error($conexion)." - ".$sql;
				echo json_encode($response);
				exit();
			}
		}else{
		
			/*	Si no ha escrito ninguno */
			$sql = "INSERT INTO mon_tickets (id_usuario, consulta) VALUES ('".$_POST['id_usuario']."', '".$_POST['ticket']."')";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$response['error'] = mysqli_error($conexion)." - ".$sql;
				echo json_encode($response);
				exit();
			}
		}
	}
	
	/*	Borra un ticket */
	if(isset($_GET['borrar_ticket'])){
		$sql = "DELETE FROM mon_tickets WHERE id_usuario='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}
	
	/*	Borra un ticket */
	if(isset($_GET['leer_ticket'])){
		$sql = "UPDATE mon_tickets SET leido='1' WHERE id_usuario='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}
	
	
	/* -------------------------------------------------- */
	/* --- Expulsiones----------------------------------- */
	/* -------------------------------------------------- */
	/*	Expulsa a un jugador ausente */
	if(isset($_GET['expulsar_jugador'])){

		/*	Le entrega las propiedades al banco */
		$sql = "UPDATE mon_partidas_propiedades SET id_propietario = '0', casas = '0', hipotecada = '0' WHERE id_propietario = '".$_GET['denunciado']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		
		/*	Le entrega las tarjetas al banco */
		$sql = "UPDATE mon_partidas_comunidades SET propietario = '0' WHERE propietario = '".$_GET['denunciado']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		
		$sql = "UPDATE mon_partidas_suertes SET propietario = '0' WHERE propietario = '".$_GET['denunciado']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	
		/*	Borra al jugador de la partida */
		$sql = "DELETE FROM mon_partidas_jugadores WHERE id_jugador = '".$_GET['denunciado']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		
		$sql = "SELECT * FROM mon_mesas WHERE id_mesa='".$_GET['partida']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$mesa = array();
		while($fila = mysqli_fetch_array($resul)){
			$mesa = limpiar_array($fila);
		}
		foreach($mesa as $clave => $valor){
			if($valor == $_GET['denunciado'] && ($clave == "jugador1" || $clave == "jugador2" || $clave == "jugador3" || $clave == "jugador4")){
				$posicion = $clave;
			}
		}
		
		/*	Borra al jugador de la mesa */
		$sql = "UPDATE mon_mesas SET ".$posicion." = NULL, ".$posicion."ok = NULL, ".$posicion."avatar = '0' WHERE id_mesa = '".$_GET['partida']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	
		/*	Coloca una desconexión */
		$sql = "INSERT INTO mon_desconexiones (id_usuario, id_partida, fecha) VALUES ('".$_GET['denunciado']."', '".$_GET['partida']."', now())";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	
		/*	Me mantiene activo */
		$sql = "UPDATE usuarios SET online = 1, fecha_ultima_conexion = now() WHERE id_usuario='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}
	
	
	/* -------------------------------------------------- */
	/* --- Datos del usuario ---------------------------- */
	/* -------------------------------------------------- */
	if(isset($id_usuario)){
	
		/*	Mantenemos al usuario online */
		$sql = "UPDATE usuarios SET ausente='1', fecha_ultima_conexion=now() WHERE id_usuario='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		
		/*	Mantenemos activo al usuario actual */
		if(isset($_GET['online'])){
			$sql = "UPDATE usuarios SET
					online = 1,
					ip_ultima_conexion = '".$_SERVER['REMOTE_ADDR']."',
					fecha_ultima_conexion = now()
				WHERE id_usuario='".$id_usuario."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$response['error'] = mysqli_error($conexion)." - ".$sql;
				echo json_encode($response);
				exit();
			}
		}
		
		/*	Obtenemos los datos básicos y la mesa del usuario */
		$sql = "SELECT *, tipo_cuenta as mi_cuenta, (SELECT id_mesa FROM mon_mesas WHERE jugador1='".$id_usuario."' OR jugador2='".$id_usuario."' OR jugador3='".$id_usuario."' OR jugador4='".$id_usuario."') as mesa, (SELECT jugando FROM mon_mesas WHERE id_mesa=mesa) as estado_mesa, (SELECT nombre FROM tipos_cuenta WHERE id_tipos_cuenta=mi_cuenta) as nombre_cuenta FROM usuarios WHERE id_usuario='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$usuario = array();
		while($fila = mysqli_fetch_array($resul)){
			$usuario = limpiar_array($fila);
		}
		$response['yo'] = $usuario;
		
		/*	Obtenemos el idioma del usuario */
		$sql = "SELECT id_mensajes, ".$usuario['idioma']." FROM mon_mensajes";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$idiomas = array();
		while($fila = mysqli_fetch_array($resul)){
			$idiomas[$fila['id_mensajes']] = $fila[$usuario['idioma']];
		}
		$response['idiomas'] = $idiomas;
		
		/*	Obtiene los nuevos datos del ticket */
		$sql = "SELECT *, id_admin as admin, (SELECT nombre FROM usuarios WHERE id_usuario=admin) as nombre_admin, (SELECT administrador FROM usuarios WHERE id_usuario=admin) as administrador, (SELECT codigo FROM tipos_admin WHERE numero=administrador) as rango_admin FROM mon_tickets WHERE id_usuario='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$ticket = array();
		while($fila = mysqli_fetch_array($resul)){
			$ticket = limpiar_array($fila);
		}
		if(!empty($ticket)){
			$response['ticket'] = $ticket;
		}
		
		/*	Obtiene el id de la mesa que estamos mirando */
		$sql = "SELECT id_mesa, id_mesa as mesa, (SELECT jugando FROM mon_mesas WHERE id_mesa=mesa)as jugando FROM mon_espectadores WHERE id_usuario='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		while($fila = mysqli_fetch_array($resul)){
			$id_partida = $fila['id_mesa'];
			$jugando = $fila['jugando'];
			$response['yo']['mesa'] = $id_partida;
		}
		
		if(empty($id_partida)){
		
			/*	Obtiene el id de la mesa en donde estamos jugando */
			$sql = "SELECT id_mesa, jugando FROM mon_mesas WHERE jugador1='".$id_usuario."' OR jugador2='".$id_usuario."' OR jugador3='".$id_usuario."' OR jugador4='".$id_usuario."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$response['error'] = mysqli_error($conexion)." - ".$sql;
				echo json_encode($response);
				exit();
			}
			while($fila = mysqli_fetch_array($resul)){
				$id_partida = $fila['id_mesa'];
				$jugando = $fila['jugando'];
				$response['yo']['mesa'] = $id_partida;
			}
		}
		
		/*	Obtenemos los datos de la partida empezada */
		if(isset($id_partida)){
			
			/*	Obtenemos los datos de los jugadores */
			if($jugando == 1){
			
				/*	En caso de estar jugando la partida, obtiene los datos de los jugadores */
				$sql = "SELECT 
							id_jugador,
							(SELECT nombre FROM usuarios WHERE id_usuario=id_jugador) as nombre_jugador,
							(SELECT tipo_cuenta FROM usuarios WHERE id_usuario=id_jugador) as id_tipo_cuenta_jugador,
							(SELECT nombre FROM tipos_cuenta WHERE id_tipos_cuenta=id_tipo_cuenta_jugador) as nombre_tipo_cuenta_jugador,
							(SELECT online FROM usuarios WHERE id_usuario=id_jugador) as online,
							(SELECT ausente FROM usuarios WHERE id_usuario=id_jugador) as ausente,
							(SELECT administrador FROM usuarios WHERE id_usuario=id_jugador) as administrador,
							(SELECT codigo FROM tipos_admin WHERE id_tipos_admin=administrador) as rango,
							(SELECT color FROM tipos_admin WHERE id_tipos_admin=administrador) as color,
							id_avatar,
							(SELECT ruta FROM mon_avatares WHERE id_avatares=id_avatar) as avatar_jugador,
							casilla,
							dinero,
							carcel,
							jugando
						FROM mon_partidas_jugadores WHERE id_partida='".$id_partida."'";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
				$jugadores = array();
				while($fila = mysqli_fetch_array($resul)){
					if($fila['online']==1 && $fila['ausente']==1){ $fila['estado'] = "img/online.png"; }
					else if($fila['online']==0 && $fila['ausente']==1){ $fila['estado']  = "img/online-aus.png"; }
					else{ $fila['estado']  = "img/offline.png"; }
					
					$jugadores[] = limpiar_array($fila);
				}
				
				/*	Obtiene los datos de las propiedades para la partida actual */
				$sql = "SELECT *, madrid as nombre FROM mon_calles as calles JOIN mon_partidas_propiedades as propiedades WHERE calles.id_calles = propiedades.id_casilla AND propiedades.id_partida = '".$id_partida."' ORDER BY propiedades.id_casilla ASC";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
				$propiedades = array();
				while($fila = mysqli_fetch_array($resul)){
					$temp = array();
					foreach(limpiar_array($fila) as $clave => $valor){
						$temp[utf8_encode($clave)] = utf8_encode($valor);
					}
					$propiedades[utf8_encode($temp['id_casilla'])] = $temp;
				}
				$response['partida']['propiedades'] = $propiedades;
				
/*	Cambiar esES por el idioma del usuario */
				/*	Obtiene los datos de las suertes para la partida actual */
				$sql = "SELECT id_tarjeta, esES as mensaje, propietario, funcion FROM mon_partidas_suertes as suertes JOIN mon_tarjetas as tarjetas WHERE suertes.id_tarjeta=tarjetas.id_tarjetas AND suertes.id_partida='".$id_partida."' ORDER BY suertes.id_tarjeta ASC";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
				$suertes = array();
				while($fila = mysqli_fetch_array($resul)){
					$temp = array();
					foreach(limpiar_array($fila) as $clave => $valor){
						$temp[utf8_encode($clave)] = utf8_encode($valor);
					}
					$suertes[utf8_encode($temp['id_tarjeta'])] = $temp;
				}
				$response['partida']['suertes'] = $suertes;
				
/*	Cambiar esES por el idioma del usuario */
				/*	Obtiene los datos de las comunidades para la partida actual */
				$sql = "SELECT id_tarjeta, esES as mensaje, propietario, funcion FROM mon_partidas_comunidades as comunidades JOIN mon_tarjetas as tarjetas WHERE comunidades.id_tarjeta = tarjetas.id_tarjetas AND comunidades.id_partida='".$id_partida."' ORDER BY comunidades.id_tarjeta ASC";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
				$comunidades = array();
				while($fila = mysqli_fetch_array($resul)){
					$temp = array();
					foreach(limpiar_array($fila) as $clave => $valor){
						$temp[utf8_encode($clave)] = utf8_encode($valor);
					}
					$comunidades[utf8_encode($temp['id_tarjeta'])] = $temp;
				}
				$response['partida']['comunidades'] = $comunidades;
				
				/*	Obtiene la última notificación */
				$sql = "SELECT texto FROM mon_notificaciones WHERE id_partida='".$id_partida."' ORDER BY id_notificacion DESC LIMIT 1";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
				while($fila = mysqli_fetch_array($resul)){
					$notificacion = $fila['texto'];
				}
				if(isset($notificacion)){
					$response['partida']['notificacion'] = $notificacion;
				}
			
				/*	Obtiene las notificaciones */
				$sql = "SELECT texto FROM mon_notificaciones WHERE id_partida='".$id_partida."' ORDER BY id_notificacion ASC";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
				$notificaciones = array();
				while($fila = mysqli_fetch_array($resul)){
					$notificaciones[] = $fila['texto'];
				}
				$response['partida']['notificaciones'] = $notificaciones;
			
				/*	Obtiene las negociaciones recién hechas */
				$sql = "SELECT * FROM mon_negociaciones WHERE id_partida='".$id_partida."' AND destino='".$id_usuario."' AND estado = '0'";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
				$negociacion = array();
				while($fila = mysqli_fetch_array($resul)){
					$response['invitacion_negocio'] = limpiar_array($fila);
				}
			
				/*	Obtiene las negociaciones aceptadas */
				$sql = "SELECT * FROM mon_negociaciones WHERE id_partida='".$id_partida."' AND origen='".$id_usuario."' AND estado = '1'";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
				$negociacion = array();
				while($fila = mysqli_fetch_array($resul)){
					$response['negocio_aceptado'] = limpiar_array($fila);
				}
				
				/*	Obtiene las negociaciones rechazadas */
				$sql = "SELECT * FROM mon_negociaciones WHERE id_partida='".$id_partida."' AND origen='".$id_usuario."' AND estado = '2'";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
				$negociacion = array();
				while($fila = mysqli_fetch_array($resul)){
					$response['negocio_rechazado'] = limpiar_array($fila);
				}
			}
			
			else{
			
				/*	En caso de estar esperando en una mesa, obtiene los datos de los que esperan */
				$sql = "SELECT jugador1, jugador1ok, jugador2, jugador2ok, jugador3, jugador3ok, jugador4, jugador4ok FROM mon_mesas WHERE id_mesa='".$id_partida."'";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
				$temp_jugadores = array();
				while($fila = mysqli_fetch_array($resul)){
					$temp_jugadores = limpiar_array($fila);
				}
				
				$jugadores = array();
				foreach($temp_jugadores as $clave => $valor){
					if($clave == "jugador1" || $clave == "jugador2" || $clave == "jugador3" || $clave == "jugador4"){
						$sql = "SELECT
								nombre as nombre_jugador,
								(SELECT online FROM usuarios WHERE id_usuario='".$valor."') as online,
								(SELECT ausente FROM usuarios WHERE id_usuario='".$valor."') as ausente,
								tipo_cuenta as id_tipo_cuenta_jugador,
								(SELECT nombre FROM tipos_cuenta WHERE id_tipos_cuenta=id_tipo_cuenta_jugador) as nombre_tipo_cuenta_jugador,
								(SELECT administrador FROM usuarios WHERE id_usuario='".$valor."') as administrador,
								(SELECT codigo FROM tipos_admin WHERE id_tipos_admin=administrador) as rango,
								(SELECT color FROM tipos_admin WHERE id_tipos_admin=administrador) as color
								FROM usuarios WHERE id_usuario='".$valor."'";
						$resul = mysqli_query($conexion, $sql);
						if(!$resul){
							$response['error'] = mysqli_error($conexion)." - ".$sql;
							echo json_encode($response);
							exit();
						}
						while($fila = mysqli_fetch_array($resul)){
							if($fila['online']==1 && $fila['ausente']==1){ $fila['estado'] = "img/online.png"; }
							else if($fila['online']==0 && $fila['ausente']==1){ $fila['estado']  = "img/online-aus.png"; }
							else{ $fila['estado']  = "img/offline.png"; }
							
							$jugadores[] = limpiar_array($fila);
						}
					}
				}
			}
			$response['partida']['jugadores'] = $jugadores;
			
			/*	Obtenemos los datos de los espectadores */
			$sql = "SELECT 
						id_usuario as usuario,
						(SELECT nombre FROM usuarios WHERE id_usuario=usuario) as nombre_espectador,
						(SELECT tipo_cuenta FROM usuarios WHERE id_usuario=usuario) as id_tipo_cuenta_espectador,
						(SELECT nombre FROM tipos_cuenta WHERE id_tipos_cuenta=id_tipo_cuenta_espectador) as nombre_tipo_cuenta_espectador,
						(SELECT administrador FROM usuarios WHERE id_usuario=usuario) as administrador,
						(SELECT codigo FROM tipos_admin WHERE id_tipos_admin=administrador) as rango,
						(SELECT color FROM tipos_admin WHERE id_tipos_admin=administrador) as color
					FROM mon_espectadores WHERE id_mesa='".$id_partida."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$response['error'] = mysqli_error($conexion)." - ".$sql;
				echo json_encode($response);
				exit();
			}
			$espectadores = array();
			while($fila = mysqli_fetch_array($resul)){
				$espectadores[] = limpiar_array($fila);
			}
			$response['partida']['espectadores'] = $espectadores;
			
			/*	Obtenemos los datos de las denuncias */
			$sql = "SELECT * FROM mon_denuncias WHERE id_partida='".$id_partida."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$response['error'] = mysqli_error($conexion)." - ".$sql;
				echo json_encode($response);
				exit();
			}
			$denuncia = array();
			while($fila = mysqli_fetch_array($resul)){
				$denuncia = limpiar_array($fila);
			}
			if(!empty($denuncia)){
				$response['denuncia'] = $denuncia;
			}
			
			/*	Obtenemos los mensajes del chat */
			$sql = "SELECT *, id_usuario as 'usuario', (SELECT nombre FROM usuarios WHERE id_usuario=usuario) as origen, (SELECT administrador FROM usuarios WHERE id_usuario=usuario) as administrador, (SELECT codigo FROM tipos_admin WHERE numero=administrador) as rango, (SELECT color FROM tipos_admin WHERE numero=administrador) as color FROM mon_chat WHERE id_mesa='".$id_partida."' ORDER BY id_chat ASC";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$response['error'] = mysqli_error($conexion)." - ".$sql;
				echo json_encode($response);
				exit();
			}
			$temp = array();
			while($fila = mysqli_fetch_array($resul)){
				$fila['hora'] = formatear_hora($fila['hora']);
				$temp[] = limpiar_array($fila);
			}
			$response['chat'] = $temp;
		}
	}
	
	
	/* -------------------------------------------- */
	/* --- TOP15 ---------------------------------- */
	/* -------------------------------------------- */
	if(isset($_GET['top15'])){
	
		/* Obtengo los datos de los usuarios */
		$sql = "SELECT 
				id_usuario,
				id_usuario as usuario,
				nombre,
				tipo_cuenta,
				administrador,
				online,
				ausente,
				(SELECT count(*) FROM mon_victorias WHERE id_usuario=usuario) as victorias,
				(SELECT count(*) FROM mon_derrotas WHERE id_usuario=usuario) as derrotas,
				(SELECT count(*) FROM mon_desconexiones WHERE id_usuario=usuario) as desconexiones,
				((SELECT count(*) FROM mon_victorias WHERE id_usuario=usuario)-((SELECT count(*) FROM mon_derrotas WHERE id_usuario=usuario)*0.3)-((SELECT count(*) FROM mon_desconexiones WHERE id_usuario=usuario)*0.6)) as rate,
				(SELECT codigo FROM tipos_admin WHERE id_tipos_admin=administrador) as rango,
				(SELECT color FROM tipos_admin WHERE id_tipos_admin=administrador) as color,
				(SELECT nombre FROM tipos_cuenta WHERE id_tipos_cuenta='tipo_cuenta') as cuenta_nombre,
				(SELECT codigo FROM tipos_cuenta WHERE id_tipos_cuenta='tipo_cuenta') as cuenta_codigo
			FROM usuarios 
			WHERE nombre != 'usuario' AND administrador = '0'
			ORDER BY 
				rate DESC, 
				victorias DESC, 
				desconexiones ASC, 
				derrotas ASC,
				registrado ASC,
				id_usuario ASC,
				online DESC,
				ausente DESC";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$temp = array();
		$contador = 1;
		while($fila = mysqli_fetch_array($resul)){
			if($contador <= 10){
				$temp[] = limpiar_array($fila);
				$contador++;
			}
		}
		
		$contador = 0;
		foreach($temp as $x){
		
			/* Obtengo los nombres y codigos de los tipos de cuenta */
			$sql = "SELECT nombre, codigo FROM tipos_cuenta WHERE id_tipos_cuenta='".$x['tipo_cuenta']."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$response['error'] = mysqli_error($conexion)." - ".$sql;
				echo json_encode($response);
				exit();
			}
			while($fila = mysqli_fetch_array($resul)){
				$temp[$contador]['cuenta_nombre'] = $fila['nombre'];
				$temp[$contador]['cuenta_codigo'] = $fila['codigo'];
			}
			
			/* Personalizo los estados */
			if($x['online']==1 && $x['ausente']==1){ $estado = "img/online.png"; }
			else if($x['online']==0 && $x['ausente']==1){ $estado = "img/online-aus.png"; }
			else if($x['online']==1 && $x['ausente']==0){ $estado = "img/offline.png"; }
			else if($x['online']==0 && $x['ausente']==0){ $estado = "img/offline.png"; }
			$temp[$contador]['estado'] = $estado;
			
			/* Pasamos al siguiente usuario */
			$contador++;
		}
		$response['usuarios'] = $temp;
		
		$sql = "SELECT count(*) as usuarios_online FROM usuarios WHERE nombre != 'usuario' AND ausente=1 AND administrador = '0'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		while($fila = mysqli_fetch_array($resul)){
			$response['usuarios_online'] = $fila['usuarios_online'];
		}
		
		$sql = "SELECT count(*) as usuarios_registrados FROM usuarios WHERE administrador = '0'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		while($fila = mysqli_fetch_array($resul)){
			$response['usuarios_registrados'] = $fila['usuarios_registrados'];
		}
	}
	
	
	/* -------------------------------------------- */
	/* --- Mesas ---------------------------------- */
	/* -------------------------------------------- */
	if(isset($_GET['mesas'])){
		$sql = "SELECT * FROM mon_mesas ORDER BY jugando ASC, id_mesa ASC";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$tabla_mesas=array();
		while($fila = mysqli_fetch_array($resul)){
			$tabla_mesas[$fila['id_mesa']] = limpiar_array($fila);
		}
		
		$mimesa = 0;

		/* Comprueba en qué mesa está sentado el usuario */
		foreach($tabla_mesas as $mesa){
			if(
			$usuario['id_usuario'] == $mesa['jugador1'] || 
			$usuario['id_usuario'] == $mesa['jugador2'] || 
			$usuario['id_usuario'] == $mesa['jugador3'] || 
			$usuario['id_usuario'] == $mesa['jugador4']
			){
				$mimesa = $mesa['id_mesa'];
				$mimesaestado = $mesa['jugando'];
			}
		}
		foreach($tabla_mesas as $mesa){
			$jugadores = 0;
			$jugadoresok = 0;
			$miasiento = 0;
			
			foreach($mesa as $elemento => $valor){
		
				/* Cuenta el número de jugadores que hay en la mesa */
				if(
				$elemento=="jugador1" && $valor!=null || 
				$elemento=="jugador2" && $valor!=null || 
				$elemento=="jugador3" && $valor!=null || 
				$elemento=="jugador4" && $valor!=null
				){
					 $jugadores++;
				}
		
				/* Cuenta el número de jugadores listos que hay en la mesa */
				if(
				$elemento=="jugador1ok" && $valor!=0 || 
				$elemento=="jugador2ok" && $valor!=0 || 
				$elemento=="jugador3ok" && $valor!=0 || 
				$elemento=="jugador4ok" && $valor!=0
				){
					$jugadoresok++; 
				}
			}
			
			/* Comprueba si la partida ya se empezó */
			if($mesa['jugando']==0){ $estado = "img/online.png"; }
			else if($mesa['jugando']==1){ $estado = "img/nodisp.png"; }
		
			/* Genera el enlace de "Sentarse" o "Mirar"; */
			if((isset($mimesa) && $mimesa == $mesa['id_mesa']) || (isset($mimesa) && $mimesa == 0 && $mesa['jugando'] == 0 && $jugadores < 4)){
				$enlace = "mesas_sentarse";
			}else{
				$enlace = "mesas_mirar";
			}
			
			$mesa['jugadores'] = $jugadores;
			$mesa['jugadores_listos'] = $jugadoresok;
			$mesa['jugando'] = $estado;
			$mesa['enlace'] = $enlace;
			
			$response['mesas'][] = $mesa;
		}
	}

	
	/* ------------------------------------------------------ */
	/* --- Mesa detalle ------------------------------------- */
	/* ------------------------------------------------------ */
	/*	Obtenemos los datos de los jugadores */
	if(isset($_GET['jugadores'])){
		
		/* Obtenemos los datos de la mesa */
		$mesa = $_GET['mesa'];
		$sql = "SELECT * FROM mon_mesas WHERE id_mesa='".$mesa."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$temp = array();
		while($fila = mysqli_fetch_array($resul)){
			$temp = limpiar_array($fila);
		}
		$response['mesa'] = $temp;
		
		/* Obtenemos los datos de los avatares */
		$sql = "SELECT id_avatares, ruta, ".$usuario['idioma']." FROM mon_avatares ORDER BY ruta ASC";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$avatares = array();
		while($fila = mysqli_fetch_array($resul)){
			$avatares[$fila['id_avatares']] = limpiar_array($fila);
		}
		$response['avatares'] = $avatares;
		
		$avatar_usado = array();
		foreach ($response['mesa'] as $clave => $valor){
			if(($clave == "jugador1" && $valor != null) || ($clave == "jugador2" && $valor != null) || ($clave == "jugador3" && $valor != null) || ($clave == "jugador4" && $valor != null)){

				/* Comparamos si el avatar está ocupado o no. */
				foreach($avatares as $avatar){
					$usado = false;
					if($avatar['id_avatares'] == $response['mesa'][$clave.'avatar']){
						$response['avatares'][$avatar['id_avatares']]['usado'] = 1;
					}
				}
				
				/* Obtenemos los datos específicos de cada jugador (nombre y tipo de cuenta) */
				$sql = "SELECT id_usuario, email, nombre, online, ausente, tipo_cuenta, (SELECT codigo FROM tipos_cuenta WHERE id_tipos_cuenta='tipo_cuenta') as cuenta_codigo, administrador, (SELECT codigo FROM tipos_admin WHERE id_tipos_admin=administrador) as rango, (SELECT color FROM tipos_admin WHERE id_tipos_admin=administrador) as color FROM usuarios WHERE id_usuario='".$valor."'";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
				$jugador = array();
				while($fila = mysqli_fetch_array($resul)){
				
					/*	Obtenemos el avatar del jugador */
					$fila['avatar'] = $response['mesa'][$clave."avatar"];
					
					/* Obtenemos el nombre del tipo de cuenta */
					$sql = "SELECT nombre FROM tipos_cuenta WHERE id_tipos_cuenta='".$fila['tipo_cuenta']."'";
					$resul = mysqli_query($conexion, $sql);
					if(!$resul){
						$response['error'] = mysqli_error($conexion)." - ".$sql;
						echo json_encode($response);
						exit();
					}
					while($fila2 = mysqli_fetch_array($resul)){
						$fila['tipo_cuenta'] = $fila2['nombre'];
					}
				
					/* Obtenemos el listo */
					if($response['mesa'][$clave.'ok'] == 1){
						$fila['estado'] = "img/estado_listo.png";
					}else{
						$fila['estado'] = 0;
					}
					
					if($fila['online'] == '1' && $fila['ausente'] == '1') $fila['est_online'] = 'img/online.png';
					else if($fila['online'] == '0' && $fila['ausente'] == '1') $fila['est_online'] = 'img/online-aus.png';
					else $fila['est_online'] = 'img/offline.png';
					
					$jugador = limpiar_array($fila);
				}
				$response['jugadores'][] = $jugador;
			}
		}
	}
	
	/*	Obtenemos los datos de los espectadores */
	if(isset($_GET['espectadores'])){
		$mesa = $_GET['mesa'];
		$sql = "SELECT id_usuario FROM mon_espectadores WHERE id_mesa='".$mesa."' ORDER BY id_espectador ASC";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$temp = array();
		while($fila = mysqli_fetch_array($resul)){
			$temp[] = limpiar_array($fila);
		}
		
		if(!empty($temp)){
			foreach ($temp as $espectador){
			
				/* Obtenemos los datos específicos de cada espectador (nombre y tipo de cuenta) */
				$sql = "SELECT
						id_usuario,				
						email, 
						nombre, 
						tipo_cuenta,
						administrador,
						online,
						ausente,
						(SELECT codigo FROM tipos_cuenta WHERE id_tipos_cuenta='tipo_cuenta') as cuenta_codigo,
						(SELECT codigo FROM tipos_admin WHERE id_tipos_admin=administrador) as rango,
						(SELECT color FROM tipos_admin WHERE id_tipos_admin=administrador) as color
					FROM 
						usuarios 
					WHERE 
						id_usuario='".$espectador['id_usuario']."'";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
				$temp1 = array();
				while($fila = mysqli_fetch_array($resul)){
					
					if($fila['online'] == '1' && $fila['ausente'] == '1') $fila['est_online'] = 'img/online.png';
					else if($fila['online'] == '0' && $fila['ausente'] == '1') $fila['est_online'] = 'img/online-aus.png';
					else $fila['est_online'] = 'img/offline.png';
					
					$temp1 = limpiar_array($fila);
				}
				
				/* Obtenemos el nombre del tipo de cuenta */
				$sql = "SELECT nombre FROM tipos_cuenta WHERE id_tipos_cuenta='".$temp1['tipo_cuenta']."'";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
				while($fila = mysqli_fetch_array($resul)){
					$temp1['tipo_cuenta'] = $fila['nombre'];
				}
				
				$response['espectadores'][] = $temp1;
			}
		}else{
			$response['espectadores'] = false;
		}
		
	}

	/*	Actualiza el avatar del jugador */
	if(isset($_GET['avatar'])){
		$sql = "UPDATE mon_mesas SET ".$_GET['miAsiento']."avatar='".$_GET['avatar']."' WHERE id_mesa='".$_GET['mesa']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		exit();
	}

	/* Actualiza el estado del jugador */
	if(isset($_GET['estado'])){
	
		/* Busca la mesa donde se va a sentar el usuario el usuario */
		$sql = "SELECT * FROM mon_mesas WHERE id_mesa=".$_GET['mesa'];
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$datosmesa = array();
		while($fila = mysqli_fetch_array($resul)){
			$datosmesa = limpiar_array($fila);
		}
		
		/* Comprueba si se apretó el botón "Listo" y cambia su estado */
		foreach($datosmesa as $clave => $valor){
			if(($clave == "jugador1" || $clave == "jugador2" || $clave == "jugador3" || $clave == "jugador4") && $valor == $id_usuario){
				if($valor == $id_usuario && $datosmesa[$clave.'ok'] == '0'){
					$sql = "UPDATE mon_mesas SET ".$clave."ok='1' WHERE id_mesa='".$_GET['mesa']."'";
				}else{
					$sql = "UPDATE mon_mesas SET ".$clave."ok='0' WHERE id_mesa='".$_GET['mesa']."'";
				}
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
			}
		}
	}
	
	
	/* ------------------------------------------------------ */
	/* --- Acciones varias ---------------------------------- */
	/* ------------------------------------------------------ */
	
	/*	Envía un mensaje por chat*/
	if(isset($_GET['mensaje'])){
		$sql = "INSERT INTO mon_chat 
				(
					id_mesa,
					id_usuario,
					hora,
					mensaje
				) 
				VALUES 
				(
					'".$_GET['mesa']."',
					'".$id_usuario."',
					now(),
					'".$_GET['mensaje']."'
				)";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}

	/*	Empieza la partida */
	if(isset($_GET['empezar'])){

		/*	Marca la mesa como jugando */
		$sql = "UPDATE mon_mesas SET jugando='1' WHERE id_mesa='".$_GET['mesa']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$response['mensaje'][] = "Mesa actualizada";
		
		/*	Obtiene los datos de la mesa */
		$sql = "SELECT * FROM mon_mesas WHERE id_mesa='".$_GET['mesa']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$mesa = array();
		while($fila = mysqli_fetch_array($resul)){
			$mesa = limpiar_array($fila);
		}
		
		/*	Agrega la partida al registro */
		$sql = "SELECT * FROM mon_partidas_registros WHERE id_partida = '".$_GET['mesa']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$temp_part = array();
		while($fila = mysqli_fetch_array($resul)){
			$temp_part = limpiar_array($fila);
		}
		
		if(empty($temp_part)){
			/*	Agrega la partida al registro */
			$sql = "INSERT INTO mon_partidas_registros (id_partida, jugador1, jugador2, jugador3, jugador4, inicio) VALUES ('".$_GET['mesa']."', '".$mesa['jugador1']."', '".$mesa['jugador2']."', '".$mesa['jugador3']."', '".$mesa['jugador4']."', now())";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$response['error'] = mysqli_error($conexion)." - ".$sql;
				echo json_encode($response);
				exit();
			}
		}
		
		/*	Inscribe a los jugadores en la mesa */
		foreach($mesa as $clave=>$valor){
			if(($clave == "jugador1" || $clave == "jugador2" || $clave == "jugador3" || $clave == "jugador4") && $valor != 'null' && $valor != '0' && $valor != ""){
				$sql = "INSERT INTO mon_partidas_jugadores (id_jugador, id_partida, id_avatar) VALUES ('".$valor."', '".$_GET['mesa']."', '".$mesa[$clave."avatar"]."')";
				$resul = mysqli_query($conexion, $sql);
				if(!$resul){
					$response['error'] = mysqli_error($conexion)." - ".$sql;
					echo json_encode($response);
					exit();
				}
				$response['mensaje'][$clave] = $clave." añadido a la partida.";
			}
		}
		
		/*	Lee los datos de las calles */
		$sql = "SELECT id_calles FROM mon_calles ORDER BY id_calles ASC";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$calles = array();
		while($fila = mysqli_fetch_array($resul)){
			$calles[] = limpiar_array($fila);
		}
		
		/*	Anota las propiedades en la partida */
		foreach($calles as $calle){
			$sql = "INSERT INTO mon_partidas_propiedades (id_partida, id_casilla) VALUES ('".$_GET['mesa']."', '".$calle['id_calles']."')";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$response['error'] = mysqli_error($conexion)." - ".$sql;
				echo json_encode($response);
				exit();
			}
		}
		
		/*	Lee los datos de las tarjetas */
		$sql = "SELECT * FROM mon_tarjetas ORDER BY id_tarjetas ASC";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$tarjetas = array();
		while($fila = mysqli_fetch_array($resul)){
			$tarjetas[] = limpiar_array($fila);
		}
		
		/*	Anota las tarjetas en la partida */
		foreach($tarjetas as $tarjeta){
			$id = substr($tarjeta['id_tarjetas'], -2);
			
			/*	Anota comunidad */
			if($tarjeta['id_tarjetas'] >= 100 && $tarjeta['id_tarjetas'] < 200){
				$sql = "INSERT INTO mon_partidas_comunidades (id_partida, id_tarjeta, funcion) VALUES ('".$_GET['mesa']."', '".$tarjeta['id_tarjetas']."', 'comunidad".$id."()')";
			}
			
			/*	Anota suerte */
			else if($tarjeta['id_tarjetas'] >= 200 && $tarjeta['id_tarjetas'] < 300){
				$sql = "INSERT INTO mon_partidas_suertes (id_partida, id_tarjeta, funcion) VALUES ('".$_GET['mesa']."', '".$tarjeta['id_tarjetas']."', 'suerte".$id."()')";
			}
			
			$response['sql'][] = $sql;
			
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$response['error'] = mysqli_error($conexion)." - ".$sql;
				echo json_encode($response);
				exit();
			}
		}
	}

	/*	Tira los dados de un jugador */
	if(isset($_GET['dados'])){
		
		$response['dados']['dado1'] = rand(1, 6);
		$response['dados']['dado2'] = rand(1, 6);
	}
	
	/*	Actualiza el turno de un jugador */
	if(isset($_GET['turno'])){
		$sql = "UPDATE mon_partidas_jugadores SET jugando='".$_GET['turno']."' WHERE id_jugador='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}
	
	/*	Actualiza la casilla del jugador */
	if(isset($_GET['nueva_casilla'])){
		$sql = "SELECT casilla FROM mon_partidas_jugadores WHERE id_jugador='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		while($fila = mysqli_fetch_array($resul)){
			$casilla = $fila['casilla'];
		}
		
		$casilla = $casilla + $_GET['nueva_casilla'];
		if($casilla >= 40){
			$casilla = $casilla - 40;
		}
		
		$sql = "UPDATE mon_partidas_jugadores SET casilla='".$casilla."' WHERE id_jugador='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}
	
	/*	Anota un mensaje de aviso */
	if(isset($_GET['informar'])){
		
		$sql = "SELECT id_partida FROM mon_partidas_jugadores WHERE id_jugador='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		while($fila = mysqli_fetch_array($resul)){
			$id_partida = $fila['id_partida'];
		}
		
		$sql = "INSERT INTO mon_notificaciones (id_usuario, id_partida, fecha, texto) VALUES ('".$id_usuario."', '".$id_partida."', now(), '".$_GET['informar']."')";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}

	/*	Termina el turno de un jugador */
	if(isset($_GET['terminar_turno'])){
	
		/*	Busca mi usuario */
		$jugadores = $response['partida']['jugadores'];
		$yo = 1;
		$tamano = count($jugadores);
		for($x = 0; $x <= $tamano; $x++){
			if(isset($jugadores[$x]) && $jugadores[$x]['id_jugador'] == $id_usuario){
				$yo = $x;
			};
		}
		
		/*	Le pasa el turno al próximo usuario */
		if(isset($jugadores[($yo + 1)])){
			$sql = "UPDATE mon_partidas_jugadores SET jugando='1' WHERE id_jugador='".$jugadores[($yo + 1)]['id_jugador']."'";
		}else{
			$sql = "UPDATE mon_partidas_jugadores SET jugando='1' WHERE id_jugador='".$jugadores['0']['id_jugador']."'";
		}
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		
		/*	Me quita el turno a mí */
		$sql = "UPDATE mon_partidas_jugadores SET jugando='0' WHERE id_jugador='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		
		/*	Me mantiene activo */
		$sql = "UPDATE usuarios SET online = 1, fecha_ultima_conexion = now() WHERE id_usuario='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	
	}
	
	/*	Anota una victoria */
	if(isset($_GET['victoria'])){
		
		$sql = "SELECT * FROM mon_victorias WHERE id_usuario='".$id_usuario."' AND id_partida='".$id_partida."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
		$victoria_anotada = array();
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		while($fila = mysqli_fetch_array($resul)){
			$victoria_anotada = limpiar_array($fila);
		}
		
		if(empty($victoria_anotada)){
		
			/*	Anota la victoria */
			$sql = "INSERT INTO mon_victorias (id_usuario, id_partida, fecha) VALUES ('".$id_usuario."', '".$id_partida."', now())";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$response['error'] = mysqli_error($conexion)." - ".$sql;
				echo json_encode($response);
				exit();
			}
			$response['sql'][] = $sql;
			
			/*	Anota el fin de la partida y el motivo */
			$sql = "UPDATE mon_partidas_registros SET fin=now(), motivo='Partida ganada por ".$response['yo']['nombre']."' WHERE id_partida='".$id_partida."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$response['error'] = mysqli_error($conexion)." - ".$sql;
				echo json_encode($response);
				exit();
			}
			$response['sql'][] = $sql;
		}
	}

	/*	Anota una derrota */
	if(isset($_GET['derrota'])){
		
		/*	Anota la derrota */
		$sql = "INSERT INTO mon_derrotas (id_usuario, id_partida, fecha) VALUES ('".$id_usuario."', '".$id_partida."', now())";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	
		/*	Anota al jugador como espectador */
		$sql = "INSERT INTO mon_espectadores (id_usuario, id_mesa) VALUES ('".$id_usuario."', '".$id_partida."')";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		
		/*	Le entrega las propiedades al banco */
		$sql = "UPDATE mon_partidas_propiedades SET id_propietario = '0', casas = '0', hipotecada = '0' WHERE id_propietario = '".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		
		/*	Le entrega las tarjetas al banco */
		$sql = "UPDATE mon_partidas_comunidades SET propietario = '0' WHERE propietario = '".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		
		$sql = "UPDATE mon_partidas_suertes SET propietario = '0' WHERE propietario = '".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	
		/*	Borra al jugador de la partida */
		$sql = "DELETE FROM mon_partidas_jugadores WHERE id_jugador = '".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		
	}

	/*	Actualiza los datos de una casilla */
	if(isset($_GET['actualizar_datos'])){
		
		$sql = "UPDATE mon_partidas_propiedades SET ".$_GET['clave']."='".$_GET['valor']."' WHERE id_partida='".$id_partida."' AND id_casilla='".$_GET['id_casilla']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}
	
	/*	Actualiza el propietario de una tarjeta */
	if(isset($_GET['actualizar_tarjeta_propietario'])){
		
		$sql = "UPDATE mon_partidas_comunidades SET propietario='".$_GET['id_propietario']."' WHERE id_partida='".$id_partida."' AND id_tarjeta='".$_GET['id_tarjeta']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}
	
	/*	Actualiza el dinero del jugador */
	if(isset($_GET['actualizar_dinero'])){
	
		$sql = "SELECT dinero FROM mon_partidas_jugadores WHERE id_jugador='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		while($fila = mysqli_fetch_array($resul)){
			$dinero = $fila['dinero'];
		}
		
		$sql = "UPDATE mon_partidas_jugadores SET dinero=(".$dinero." ".$_GET['operacion']." ".$_GET['cantidad'].") WHERE id_partida='".$id_partida."' AND id_jugador='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}
	
	/*	Actualiza el dinero de otro jugador */
	if(isset($_GET['actualizar_dinero_jugador'])){
	
		$sql = "SELECT dinero FROM mon_partidas_jugadores WHERE id_jugador='".$_GET['jugador']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		while($fila = mysqli_fetch_array($resul)){
			$dinero = $fila['dinero'];
		}
		
		$sql = "UPDATE mon_partidas_jugadores SET dinero=(".$dinero." ".$_GET['operacion']." ".$_GET['cantidad'].") WHERE id_partida='".$id_partida."' AND id_jugador='".$_GET['jugador']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}
	
	/*	Actualiza algún dato del jugador */
	if(isset($_GET['actualizar_jugador'])){
			
		$sql = "UPDATE mon_partidas_jugadores SET ".$_GET['clave']."='".$_GET['valor']."' WHERE id_partida='".$id_partida."' AND id_jugador='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}
	
	/*	Envía una oferta de negociación */
	if(isset($_GET['elegido'])){
		foreach($_GET['ofertas'] as $clave=>$valor){
			if($clave == '0'){
				$ofertas = "d:".$valor;
			}else{
				$ofertas .= "-".$valor;
			}
		}
		foreach($_GET['reclamos'] as $clave=>$valor){
			if($clave == '0'){
				$reclamos = "d:".$valor;
			}else{
				$reclamos .= "-".$valor;
			}
		}
		
		$sql = "INSERT INTO mon_negociaciones (id_partida, origen, destino, oferta, reclamo) VALUES ('".$id_partida."', '".$id_usuario."', '".$_GET['elegido']."', '".$ofertas."', '".$reclamos."')";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	
		/*	Me mantiene activo */
		$sql = "UPDATE usuarios SET online = 1, fecha_ultima_conexion = now() WHERE id_usuario='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}
	
	/*	Rechaza una ofeta de negociación */
	if(isset($_GET['rechazar_negocio'])){
	
		/*	Obtiene las negociacion que me ofrezcan */
		$sql = "SELECT * FROM mon_negociaciones WHERE id_negociacion='".$_GET['rechazar_negocio']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$negociacion = array();
		while($fila = mysqli_fetch_array($resul)){
			$negociacion = limpiar_array($fila);
		}
		
		/*	Si sigue existiendo el negocio */
		if(!empty($negociacion)){
		
			$sql = "UPDATE mon_negociaciones SET estado='2' WHERE id_negociacion='".$_GET['rechazar_negocio']."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$response['error'] = mysqli_error($conexion)." - ".$sql;
				echo json_encode($response);
				exit();
			}
		
			$response['estado_neg'] = '1';
			
		}else{
			$response['estado_neg'] = '0';
		}
		
		/*	Me mantiene activo */
		$sql = "UPDATE usuarios SET online = 1, fecha_ultima_conexion = now() WHERE id_usuario='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}
	
	/*	Acepta una ofeta de negociación */
	if(isset($_GET['aceptar_negocio'])){
	
		/*	Obtiene las negociacion que me ofrezcan */
		$sql = "SELECT * FROM mon_negociaciones WHERE id_negociacion='".$_GET['aceptar_negocio']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$negociacion = array();
		while($fila = mysqli_fetch_array($resul)){
			$negociacion = limpiar_array($fila);
		}
		
		/*	Si sigue existiendo el negocio */
		if(!empty($negociacion)){
			
			/*	Decodifica los elementos que se ofrecen */
			$ofertas = explode("-", $negociacion['oferta']);
			$temp = explode(":", $ofertas['0']);
			$ofertas['0'] = $temp['1'];
			foreach($ofertas as $clave => $valor){
				
				/*	Si se refiere al dinero ofertado */
				if($clave == '0' && $valor > 0){
				
					/*	Añade el dinero ofertado al jugador destino */
					$sql = "UPDATE mon_partidas_jugadores SET dinero = (dinero + ".$valor.") WHERE id_jugador = '".$negociacion['destino']."'";
					$resul = mysqli_query($conexion, $sql);
					if(!$resul){
						$response['error'] = mysqli_error($conexion)." - ".$sql;
						echo json_encode($response);
						exit();
					}
					
					/*	Resta el dinero ofertado al jugador que hace la oferta */
					$sql = "UPDATE mon_partidas_jugadores SET dinero = (dinero - ".$valor.") WHERE id_jugador = '".$negociacion['origen']."'";
					$resul = mysqli_query($conexion, $sql);
					if(!$resul){
						$response['error'] = mysqli_error($conexion)." - ".$sql;
						echo json_encode($response);
						exit();
					}
				}
				
				/*	Si se refiere a una tarjeta de comunidad */
				else if($valor > 100){
					
					/*	Cambia el propietario de la tarjeta al destino de la oferta */
					$sql = "UPDATE mon_partidas_comunidades SET propietario = '".$negociacion['destino']."' WHERE id_tarjeta = '".$valor."' AND id_partida = '".$id_partida."'";
					$resul = mysqli_query($conexion, $sql);
					if(!$resul){
						$response['error'] = mysqli_error($conexion)." - ".$sql;
						echo json_encode($response);
						exit();
					}
				}
				
				/*	Si se trata de una casilla */
				else if($valor > '0' && $valor < 100){
					
					/*	Cambia el propietario de la casilla al destino de la oferta */
					$sql = "UPDATE mon_partidas_propiedades SET id_propietario = '".$negociacion['destino']."' WHERE id_casilla = '".$valor."' AND id_partida = '".$id_partida."'";
					$resul = mysqli_query($conexion, $sql);
					if(!$resul){
						$response['error'] = mysqli_error($conexion)." - ".$sql;
						echo json_encode($response);
						exit();
					}
				}
			}
			
			/*	Decodifica los elementos que se reclaman */
			$reclamos = explode("-", $negociacion['reclamo']);
			$temp = explode(":", $reclamos['0']);
			$reclamos['0'] = $temp['1'];
			foreach($reclamos as $clave => $valor){
				
				/*	Si se refiere al dinero reclamado */
				if($clave == '0' && $valor > 0){
				
					/*	Añade el dinero reclamado al jugador que hace la oferta */
					$sql = "UPDATE mon_partidas_jugadores SET dinero = (dinero + ".$valor.") WHERE id_jugador = '".$negociacion['origen']."'";
					$resul = mysqli_query($conexion, $sql);
					if(!$resul){
						$response['error'] = mysqli_error($conexion)." - ".$sql;
						echo json_encode($response);
						exit();
					}
					
					/*	Resta el dinero ofertado al jugador destino*/
					$sql = "UPDATE mon_partidas_jugadores SET dinero = (dinero - ".$valor.") WHERE id_jugador = '".$negociacion['destino']."'";
					$resul = mysqli_query($conexion, $sql);
					if(!$resul){
						$response['error'] = mysqli_error($conexion)." - ".$sql;
						echo json_encode($response);
						exit();
					}
				}
				
				/*	Si se refiere a una tarjeta de comunidad */
				else if($valor > 100){
					
					/*	Cambia el propietario de la tarjeta al jugador que hace la oferta */
					$sql = "UPDATE mon_partidas_comunidades SET propietario = '".$negociacion['origen']."' WHERE id_tarjeta = '".$valor."' AND id_partida = '".$id_partida."'";
					$resul = mysqli_query($conexion, $sql);
					if(!$resul){
						$response['error'] = mysqli_error($conexion)." - ".$sql;
						echo json_encode($response);
						exit();
					}
				}
				
				/*	Si se trata de una casilla */
				else if($valor > '0' && $valor < 100){
					
					/*	Cambia el propietario de la casilla al jugador que hace la oferta */
					$sql = "UPDATE mon_partidas_propiedades SET id_propietario = '".$negociacion['origen']."' WHERE id_casilla = '".$valor."' AND id_partida = '".$id_partida."'";
					$resul = mysqli_query($conexion, $sql);
					if(!$resul){
						$response['error'] = mysqli_error($conexion)." - ".$sql;
						echo json_encode($response);
						exit();
					}
				}
			}
			
			/*	Establece el negocio como terminado */
			$sql = "UPDATE mon_negociaciones SET estado='1' WHERE id_negociacion='".$_GET['aceptar_negocio']."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$response['error'] = mysqli_error($conexion)." - ".$sql;
				echo json_encode($response);
				exit();
			}
		
			$response['estado_neg'] = '1';
			
		}else{
			$response['estado_neg'] = '0';
		}
		
		/*	Me mantiene activo */
		$sql = "UPDATE usuarios SET online = 1, fecha_ultima_conexion = now() WHERE id_usuario='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		
		$response['negocio_aceptado'] = true;
	}
	
	/*	Elimina una ofeta de negociación */
	if(isset($_GET['eliminar_negocio'])){
		
		$sql = "DELETE FROM mon_negociaciones WHERE id_negociacion='".$_GET['eliminar_negocio']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	
		/*	Me mantiene activo */
		$sql = "UPDATE usuarios SET online = 1, fecha_ultima_conexion = now() WHERE id_usuario='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}
	
	/*	Retira una ofeta de negociación */
	if(isset($_GET['deshacer_negocio'])){
		
		$sql = "DELETE FROM mon_negociaciones WHERE origen='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	
		/*	Me mantiene activo */
		$sql = "UPDATE usuarios SET online = 1, fecha_ultima_conexion = now() WHERE id_usuario='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}
	
	/*	Envía una denuncia por ausencia */
	if(isset($_GET['denuncia'])){
		
		$sql = "INSERT INTO mon_denuncias (id_partida, denunciado, estado) VALUES ('".$id_partida."', '".$_GET['denunciado']."', '0')";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	
		/*	Me mantiene activo */
		$sql = "UPDATE usuarios SET online = 1, fecha_ultima_conexion = now() WHERE id_usuario='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}
	
	/*	Responde una denuncia por ausencia */
	if(isset($_GET['responder_denuncia'])){
		
		$sql = "UPDATE mon_denuncias SET estado='1' WHERE id_partida='".$_GET['partida']."' AND denunciado='".$_GET['denunciado']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	
		/*	Me mantiene activo */
		$sql = "UPDATE usuarios SET online = 1, fecha_ultima_conexion = now() WHERE id_usuario='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}
	
	/*	Elimina una denuncia por ausencia */
	if(isset($_GET['eliminar_denuncia'])){
		
		$sql = "DELETE FROM mon_denuncias WHERE id_partida='".$_GET['partida']."' AND denunciado='".$_GET['denunciado']."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	
		/*	Me mantiene activo */
		$sql = "UPDATE usuarios SET online = 1, fecha_ultima_conexion = now() WHERE id_usuario='".$id_usuario."'";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
	}
	
	
	/* ------------------------------------------------------ */
	/* -- Cierra las mesas vacías o con jugadores ausentes -- */
	/* ------------------------------------------------------ */
	/* 
	$sql = "SELECT id_mesa, jugador1, (SELECT ausente FROM usuarios WHERE id_usuario=jugador1) as player1aus, jugador2, (SELECT ausente FROM usuarios WHERE id_usuario=jugador2) as player2aus, jugador3, (SELECT ausente FROM usuarios WHERE id_usuario=jugador3) as player3aus, jugador4, (SELECT ausente FROM usuarios WHERE id_usuario=jugador4) as player4aus, jugando FROM mon_mesas";
	$resul = mysqli_query($conexion, $sql);
	if(!$resul){
		$error = mysqli_error($conexion);
		include "error.php";
		exit();
	}
	$temp = Array();
	$temp['mesas'] = Array();
	while($fila = mysqli_fetch_array($resul)){
		$temp['mesas'][] = limpiar_array($fila);
	}
	
	$response['borradasno'] = $temp['mesas'];
	$response['borradas'] = array();
	foreach($temp['mesas'] as $mesa){
		if((!isset($mesa['player1aus']) || $mesa['player1aus'] == '0') && (!isset($mesa['player2aus']) || $mesa['player2aus'] == '0') && (!isset($mesa['player3aus']) || $mesa['player3aus'] == '0') && (!isset($mesa['player4aus']) || $mesa['player4aus'] == '0')){
			$sql = "DELETE FROM mon_mesas WHERE id_mesa = '".$mesa['id_mesa']."'";
			$resul = mysqli_query($conexion, $sql);
			if(!$resul){
				$error = mysqli_error($conexion);
				include "error.php";
				exit();
			}
		}
	}
	 */
	
	echo json_encode($response);
	switch(json_last_error()){
        case JSON_ERROR_NONE:
			break;
        case JSON_ERROR_DEPTH:
            echo ' - Maximum stack depth exceeded';
			break;
        case JSON_ERROR_STATE_MISMATCH:
            echo ' - Underflow or the modes mismatch';
			break;
        case JSON_ERROR_CTRL_CHAR:
            echo ' - Unexpected control character found';
			break;
        case JSON_ERROR_SYNTAX:
            echo ' - Syntax error, malformed JSON';
			break;
        case JSON_ERROR_UTF8:
            echo ' - Malformed UTF-8 characters, possibly incorrectly encoded';
			break;
        default:
            echo ' - Unknown error';
			break;
    }
	exit();
?>
