<?php
	function ver_array($array){
		echo "<pre>";
		print_r($array);
		echo "</pre>";
	}

	/* Le da un formato de hora a un dato de tipo fecha. */
	function formatear_hora($parametro){

		/* Declaro variables personalizadas para que queden claros los datos */
		$hora = substr($parametro, 11, 2);
		$minuto = substr($parametro, 14, 2);
		$dia = substr($parametro, 8, 2);
		$mes = substr($parametro, 5, 2);
		
		/* Generamos el formato */
		$temp = $hora.":".$minuto;
		
		return $temp;
	}

	/* Le da un formato correcto a un dato de tipo fecha. */
	function formatear_fecha($parametro){

		/* Declaro variables personalizadas para que queden claros los datos */
		$hora = substr($parametro, 11, 2);
		$minuto = substr($parametro, 14, 2);
		$dia = substr($parametro, 8, 2);
		$mes = substr($parametro, 5, 2);
		$anno = substr($parametro, 0, 4);

		/* Generamos el formato */
		$temp = $dia."/".$mes."/".$anno." (".$hora.":".$minuto.")";
		
		return $temp;
	}

	/* Le da un formato correcto a un dato de tipo fecha. */
	function formatear_fecha_mes($parametro){

		/* Declaro variables personalizadas para que queden claros los datos */
		$mes = substr($parametro, 5, 2);
		$anno = substr($parametro, 0, 4);
		switch($mes){
			case 1: $mes = "Enero"; break;;
			case 2: $mes = "Febrero"; break;;
			case 3: $mes = "Marzo"; break;;
			case 4: $mes = "Abril"; break;;
			case 5: $mes = "Mayo"; break;;
			case 6: $mes = "Junio"; break;;
			case 7: $mes = "Julio"; break;;
			case 8: $mes = "Agosto"; break;;
			case 9: $mes = "Septiembre"; break;;
			case 10: $mes = "Octubre"; break;;
			case 11: $mes = "Noviembre"; break;;
			case 12: $mes = "Diciembre"; break;;
			case 13: $mes = "Enero"; $anno = $anno+1; break;;
			case 14: $mes = "Febrero"; $anno = $anno+1; break;;
			
		}
		
		/* Generamos el formato */
		$temp = $mes." de ".$anno;
		
		return $temp;
	}

	/* Le da un formato correcto a la lista de meses. */
	function formatear_mes($parametro){

		/* Declaro variables personalizadas para que queden claros los datos */
		$mes = substr($parametro, 5, 2);
		$anno = substr($parametro, 0, 4);
		
		/* Generamos el formato */
		$temp = $mes."/".$anno;
		
		return $temp;
	}

	/* Lee dos fechas y devuelve la diferencia de tiempo */
	function comparar_fechas($fecha_inicio, $fecha_fin){
		$inicio = array();
		$inicio['anno'] = substr($fecha_inicio, 0, 4);
		$inicio['mes'] = substr($fecha_inicio, 5, 2);
		$inicio['dia'] = substr($fecha_inicio, 8, 2);
		$inicio['hora'] = substr($fecha_inicio, 11, 2);
		$inicio['min'] = substr($fecha_inicio, 14, 2);
		$inicio['sec'] = substr($fecha_inicio, 17, 2);
		
		$fin = array();
		$fin['anno'] = substr($fecha_fin, 0, 4);
		$fin['mes'] = substr($fecha_fin, 5, 2);
		$fin['dia'] = substr($fecha_fin, 8, 2);
		$fin['hora'] = substr($fecha_fin, 11, 2);
		$fin['min'] = substr($fecha_fin, 14, 2);
		$fin['sec'] = substr($fecha_fin, 17, 2);
		
		$diferencia = array();
		$diferencia['anno'] = $fin['anno'] - $inicio['anno'];
		$diferencia['mes'] = $fin['mes'] - $inicio['mes'];
		$diferencia['dia'] = $fin['dia'] - $inicio['dia'];
		$diferencia['hora'] = $fin['hora'] - $inicio['hora'];
		$diferencia['min'] = $fin['min'] - $inicio['min'];
		$diferencia['sec'] = $fin['sec'] - $inicio['sec'];
		
		if($diferencia['mes'] < 0){
			$diferencia['mes'] = 12 + $diferencia['mes'];
			$diferencia['anno'] = $diferencia['anno'] - 1;
		}
		if($diferencia['dia'] < 0){
			$diferencia['dia'] = 30 + $diferencia['dia'];
			$diferencia['mes'] = $diferencia['mes'] - 1;
		}
		if($diferencia['hora'] < 0){
			$diferencia['hora'] = 24 + $diferencia['hora'];
			$diferencia['dia'] = $diferencia['dia'] - 1;
		}
		if($diferencia['min'] < 0){
			$diferencia['min'] = 60 + $diferencia['min'];
			$diferencia['hora'] = $diferencia['hora'] - 1;
		}
		if($diferencia['sec'] < 0){
			$diferencia['sec'] = 60 + $diferencia['sec'];
			$diferencia['min'] = $diferencia['min'] - 1;
		}
		
		if($diferencia['anno'] > 0){
			if($diferencia['anno'] > 1){
				$resultado = $diferencia['anno']." años";
			}else{
				$resultado = $diferencia['anno']." año";
			}
		}
		else if($diferencia['mes'] > 0){
			if($diferencia['mes'] > 1){
				$resultado = $diferencia['mes']." meses";
			}else{
				$resultado = $diferencia['mes']." mes";
			}
		}
		else if($diferencia['dia'] > 0){
			if($diferencia['dia'] > 1){
				$resultado = $diferencia['dia']." dias";
			}else{
				$resultado = $diferencia['dia']." dia";
			}
		}
		else if($diferencia['hora'] > 0){
			if($diferencia['hora'] > 1){
				$resultado = $diferencia['hora']." horas";
			}else{
				$resultado = $diferencia['hora']." hora";
			}
		}
		else if($diferencia['min'] > 0){
			if($diferencia['min'] > 1){
				$resultado = $diferencia['min']." mins";
			}else{
				$resultado = $diferencia['min']." min";
			}
		}
		else if($diferencia['sec'] > 0){
			if($diferencia['sec'] > 1){
				$resultado = $diferencia['sec']." secs";
			}else{
				$resultado = $diferencia['sec']." sec";
			}
		}
		else{
			$resultado = "Justo ahora";
		}
		
		return $resultado;
	}
	
	/* Lee dos fechas y devuelve la diferencia de tiempo */
	function comparar_fechas_num($fecha_inicio, $fecha_fin){
		$inicio = array();
		$inicio['anno'] = substr($fecha_inicio, 0, 4);
		$inicio['mes'] = substr($fecha_inicio, 5, 2);
		$inicio['dia'] = substr($fecha_inicio, 8, 2);
		$inicio['hora'] = substr($fecha_inicio, 11, 2);
		$inicio['min'] = substr($fecha_inicio, 14, 2);
		$inicio['sec'] = substr($fecha_inicio, 17, 2);
		
		$fin = array();
		$fin['anno'] = substr($fecha_fin, 0, 4);
		$fin['mes'] = substr($fecha_fin, 5, 2);
		$fin['dia'] = substr($fecha_fin, 8, 2);
		$fin['hora'] = substr($fecha_fin, 11, 2);
		$fin['min'] = substr($fecha_fin, 14, 2);
		$fin['sec'] = substr($fecha_fin, 17, 2);
		
		$diferencia = array();
		$diferencia['anno'] = $fin['anno'] - $inicio['anno'];
		$diferencia['mes'] = $fin['mes'] - $inicio['mes'];
		$diferencia['dia'] = $fin['dia'] - $inicio['dia'];
		$diferencia['hora'] = $fin['hora'] - $inicio['hora'];
		$diferencia['min'] = $fin['min'] - $inicio['min'];
		$diferencia['sec'] = $fin['sec'] - $inicio['sec'];
		
		if($diferencia['mes'] < 0){
			$diferencia['mes'] = 12 + $diferencia['mes'];
			$diferencia['anno'] = $diferencia['anno'] - 1;
		}
		if($diferencia['dia'] < 0){
			$diferencia['dia'] = 30 + $diferencia['dia'];
			$diferencia['mes'] = $diferencia['mes'] - 1;
		}
		if($diferencia['hora'] < 0){
			$diferencia['hora'] = 24 + $diferencia['hora'];
			$diferencia['dia'] = $diferencia['dia'] - 1;
		}
		if($diferencia['min'] < 0){
			$diferencia['min'] = 60 + $diferencia['min'];
			$diferencia['hora'] = $diferencia['hora'] - 1;
		}
		if($diferencia['sec'] < 0){
			$diferencia['sec'] = 60 + $diferencia['sec'];
			$diferencia['min'] = $diferencia['min'] - 1;
		}
		
		$resultado = sprintf("%02d", $diferencia['anno']).sprintf("%02d", $diferencia['mes']).sprintf("%02d", $diferencia['dia']).sprintf("%02d", $diferencia['hora']).sprintf("%02d", $diferencia['min']);
		
		return $resultado;
	}
	
	/* Comprueba que el email tiene un formato correcto, return 0 = email falso. */
	function comprobar_email($email){
		if(preg_match('/^[A-Za-z0-9-_.+%]+@[A-Za-z0-9-.]+\.[A-Za-z]{2,4}$/', $email)){ 
			return 0; 
		}else
			return 1;
	}

	/* Comprueba que el email tiene un formato correcto, return 0 = email falso. */
	function comprobar_web($web){
		if(preg_match('/^http\:\/\/www\.[A-Za-z0-9-.]+\.[A-Za-z]{2,4}$/', $web)){ 
			return 0; 
		}else
			return 1;
	}

	/* Busca enlaces e hipervínculos y los transforma en enlaces */
	function formatear_enlaces($parametro, $modo){
		$publicacion_formateada = $parametro;
		
		if(preg_match("/http:\/\/www./", $parametro)){
			$empieza_el_enlace = strripos($parametro, "http://www.");		
			$primer_espacio = stripos($parametro, " ", $empieza_el_enlace);
			
			if($primer_espacio == false){
				$longitud_del_enlace = strlen($parametro);
			}else{
				$longitud_del_enlace = ($primer_espacio - $empieza_el_enlace);
			}
			$enlace = substr($parametro, $empieza_el_enlace, $longitud_del_enlace);
			
			$enlace_corto = substr($enlace, 7, 22);
			if($primer_espacio != false || $modo == "largo"){ $enlace_corto .= "..."; }
			$enlace_largo = "<a href='".$enlace."' target='_blank'>".$enlace."</a>";
			
			if($modo == "largo"){
				$publicacion_formateada = str_replace($enlace, $enlace_largo, $parametro);
			}else{
				$publicacion_formateada = str_replace($enlace, $enlace_corto, $parametro);
			}
		}
		
		return $publicacion_formateada;
	}
	
	function limpiar_array($array){
		$temp = array();
		foreach ($array as $nombre=>$dato){
			if(!is_numeric($nombre)){
				$temp[$nombre] = $dato;
			}
		}
		return $temp;
	}
	
	function enviar_email($direccion_from, $direccion_to, $asunto, $mensaje){
        require_once 'PHPMailer/class.phpmailer.php';
        $mail = new PHPMailer();
		
	/* Autentificación */
        $mail->IsSendmail();
        $mail->SMTPAuth			= false;
        $mail->SMTPDebug		= 2;
        $mail->Username			= strtolower($direccion_to);
        $mail->Password			= "Maite2012%ide";
		
	/* Mensaje */
        $mail->From				= $direccion_from;
        $mail->FromName			= $direccion_from;
        $mail->AddAddress(strtolower($direccion_to));
        $mail->IsHTML(true);
        $mail->Subject = utf8_decode($asunto);
        $mail->Body = utf8_decode($mensaje);
		
        if(!$mail->Send()){
			$estado['tipo'] = 0;
            $estado['mensaje'] = "Hubo un error al enviar el correo: ".$mail->ErrorInfo.".";
        }else{
			$estado['tipo'] = 1;
            $estado['mensaje'] = "El correo se envió correctamente.";
            $estado['direcciones'] = $direccion_to;
        }
		return $estado;
	}
	
	function iploc($ip){
		/* $html = file_get_contents("http://ipinfodb.com/ip_locator.php?ip=".$ip); */
		/* preg_match("/<li>Country : (.*?) <img/",$html,$data); */
		$d['pais'] = "nada";
		/* preg_match("/<li>State\/Province : (.*?)<\/li>/",$html,$data); */
		$d['estado'] = "nada";
		/* preg_match("/<li>City : (.*?)<\/li>/",$html,$data); */
		$d['ciudad'] = "nada";
		return ($d);
	}

	function validar($array){
		$temp = array();
		
		foreach($array as $clave => $valor){
			if($clave == "nombre"){
				if(empty($valor)){
					$temp['nombre'] = "Por favor, escriba su nombre.";
				}
			}
			if($clave == "email"){
				if(comprobar_email($valor) == 1){
					$temp['email'] = "Por favor, introduce un email válido.";
				}
			}
			if($clave == "consulta"){
				if(empty($valor)){
					$temp['consulta'] = "Por favor, escriba su consulta.";
				}
			}
			if($clave == "titulo"){
				if(empty($valor)){
					$temp['titulo'] = "Por favor, escriba un titulo.";
				}
			}
			if($clave == "imagen"){
				if(empty($valor)){
					$temp['imagen'] = "Por favor, escriba una imagen.";
				}
			}
			if($clave == "descripcion"){
				if(empty($valor)){
					$temp['descripcion'] = "Por favor, escriba una descripcion.";
				}
			}
			if($clave == "codigo"){
				if(empty($valor)){
					$temp['codigo'] = "Por favor, escriba un codigo.";
				}
			}
			if($clave == "categoria"){
				if(empty($valor)){
					$temp['categoria'] = "Por favor, escriba una categoria.";
				}
			}
		}
	
		return $temp;
	}

	function formatear_video($enlace){
		$substr1 = substr($enlace, 0, strpos($enlace, "a")-1);
		$substr2 = substr($enlace, strpos($enlace, "v=")+2, strlen($enlace));
		return $substr1."embed/".$substr2;
	}

	function cookie($nombre){
		$cookie['nombre'] = base64_encode($nombre);
		$cookie['nombre'] = str_replace("=", "_", $cookie['nombre']);
		if(isset($_COOKIE[$cookie['nombre']])){
			return 1;
		}else{
			return 0;
		}
	}
	
	function dejar_cookie($nombre, $valor){
		$cookie['nombre'] = base64_encode($nombre);
		$cookie['nombre'] = str_replace("=", "_", $cookie['nombre']);
		$cookie['valor'] = base64_encode($valor);
		$cookie['duracion'] = (time() + (60 * 60 * 24 * 30));
		
		setcookie($cookie['nombre'], $cookie['valor'], $cookie['duracion'], '/', 'imperdiblesoft.com');
	}
	
	function leer_cookie($nombre){
		$cookie['nombre'] = base64_encode($nombre);
		$cookie['nombre'] = str_replace("=", "_", $cookie['nombre']);
		if(isset($_COOKIE[$cookie['nombre']])){
			return base64_decode($_COOKIE[$cookie['nombre']]);
		}
	}

	function borrar_cookie($nombre){
		$cookie['nombre'] = base64_encode($nombre);
		$cookie['nombre'] = str_replace("=", "_", $cookie['nombre']);
		$cookie['valor'] = "";
		$cookie['duracion'] = (time() + (1));
		
		setcookie($cookie['nombre'], $cookie['valor'], $cookie['duracion'], '/', 'imperdiblesoft.com');
	}

	function registrar_login($texto, $ruta){
		$nombre_archivo = 'logs/login.txt';
		if(isset($ruta)) $nombre_archivo = $ruta;
		$contenido = $texto."\n";

		if(is_writable($nombre_archivo)){

			if(!$gestor = fopen($nombre_archivo, 'a')){
				return 0;
				exit();
			}

			if(fwrite($gestor, $contenido) === FALSE){
				return 1;
				exit();
			}

			return true;
			fclose($gestor);
			exit();

		}else{
			return 2;
		}
	}

?>