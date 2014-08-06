<?php
include "../../funciones/conexion.php";
include "../../funciones/funciones.php";

	$response = array();
	
	if(isset($_GET['array']) && $_GET['array'] == "usuarios"){
	
		/*	Obtenemos los datos básicos de los usuarios */
		$sql = "SELECT id_usuario, nombre, ip_ultima_conexion FROM usuarios ORDER BY nombre ASC";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$usuarios = array();
		while($fila = mysqli_fetch_array($resul)){
			$temp = array();
			foreach($fila as $clave=>$valor){
				$temp[utf8_encode($clave)] = utf8_encode($valor);
			}
			$usuarios[] = limpiar_array($temp);
		}
		$response['usuarios'] = $usuarios;
	}
	
	if(isset($_POST['accion']) && $_POST['accion'] == "banear"){
		$tipo = $_POST['tipo'];
		$fin = $_POST['fin']." ".date("H:i:s");
		$motivo = $_POST['motivo'];
	
		/*	Obtenemos los datos básicos de los usuarios */
		$sql = "INSERT INTO mon_baneados (id_usuario, inicio, fin, motivo) VALUES ((SELECT ".$tipo." FROM usuarios WHERE id_usuario='".$_POST['id_usuario']."'), now(), '".$fin."', '".$motivo."')";
		$resul = mysqli_query($conexion, $sql);
		if(!$resul){
			$response['error'] = mysqli_error($conexion)." - ".$sql;
			echo json_encode($response);
			exit();
		}
		$response['sql'] = $sql;
	}
	
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
