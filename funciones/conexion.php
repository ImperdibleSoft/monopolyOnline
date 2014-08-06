<?php
	$local['servidor'] = "localhost";
	$local['usuario'] = "root";
	$local['password'] = "";
	$local['bbdd'] = "imperdiblesoft";
	
	$internet['servidor'] = "localhost";
	$internet['usuario'] = "s1360242_user";
	$internet['password'] = "secret29+";
	$internet['bbdd'] = "s1360242_imperdiblesoft";
	
	
	$conexion = mysqli_connect($internet['servidor'], $internet['usuario'], $internet['password']);
	if(!$conexion){
		$error = "Imposible establecer conexi¨®n con el servidor de BD";
		include "error.php";
		exit();
	}
	
	$resul = mysqli_select_db($conexion, $internet['bbdd']);
	if (!$resul){
		$error = "Imposible localizar la base de datos ".$internet['bbdd'];
		include "error.php";
		exit();
	}
?>