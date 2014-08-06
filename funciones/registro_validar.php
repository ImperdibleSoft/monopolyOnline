<?php

$errores = array();
if(!isset($regnombre) || strlen($regnombre)<=3 || preg_match('[0-9]', $regnombre)==1){ 
	$errores['nombre'] = $idioma['msg004'];
}
if(!isset($regemail) || comprobar_email($regemail)==1){
	$errores['email'] = $idioma['msg005'];
}
if(strlen($regpassword)<=5){
	$errores['password1'] = $idioma['msg006'];
}
if($regpassword!=$regpassword2){
	$errores['password2'] = $idioma['msg007'];
}
if(!isset($_POST['login-terminosdeuso'])){
	$errores['terminos'] = $idioma['msg008'].$idioma['glo_terminosdeuso'];
}
/* Hay errores de validación */
foreach($errores as $error){
	if($error!=null){
		$mensaje = $error;
		include "vistas/vista_registrar.php";
		exit();
	}
}

?>
