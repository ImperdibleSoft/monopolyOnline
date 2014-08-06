var sys_hora = "";
var sys_version = "";
var menu_abierto = false;
var cobrar = 200;
var mi_nombre_cuenta = "";
var actualizar_datos_usuario = true;
var temp_ultimo_mensaje = false;
var victoria_anotada = false;
var rendicion_anotada = false;
var contador = 0;
var dobles_seguidos = 0;
var tirada1 = 0;
var tirada2 = 0;
var grupocasillas_maximo = 0;
var grupocasillas_jugador = 0;
var grupocasillas_propietario = 0;
var contador_casas = 0;
var contador_hoteles = 0;
var contador_hipotecas = 0;
var partida_empezada = false;
var id_partida = 0;
var alerta_usada = false;
var elegido = false;
var ticket = false;
var ticket_alertando = false;
var ticket_color = 0;
var denuncia_contador = 46;
var denuncia_activada = false;
var notificaciones = false;
var mostrar_botones = true;

/*	Objetos */
var jugadores = false;
var yo = false;
var yo2 = false;
var casillas = false;
var suertes = false;
var comunidades = false;
var turno = false;

/*	Funciones genéricas */
function sizeof(objeto){
	var contador = 0;
	for(i in objeto) {
		contador++;
	}
	return contador;
}
function utf8_decode(str_data){

	var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0, c4 = 0;
	str_data += '';

	while (i < str_data.length) {
		c1 = str_data.charCodeAt(i);
		if (c1 <= 191) {
			tmp_arr[ac++] = String.fromCharCode(c1);
			i++;
		} else if (c1 <= 223) {
			c2 = str_data.charCodeAt(i + 1);
			tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
			i += 2;
		} else if (c1 <= 239) {
			c2 = str_data.charCodeAt(i + 1);
			c3 = str_data.charCodeAt(i + 2);
			tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		} else {
			c2 = str_data.charCodeAt(i + 1);
			c3 = str_data.charCodeAt(i + 2);
			c4 = str_data.charCodeAt(i + 3);
			c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
			c1 -= 0x10000;
			tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1>>10) & 0x3FF));
			tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
			i += 4;
		}
	}

	return tmp_arr.join('');
}
function emoticons(texto){
	var retorno = texto;
	
	var emoticonos = new Array();
	var contador = 0;
	emoticonos[contador]	= [":asco:", "¬¬", "-.-", "-_-"]; contador++;
	emoticonos[contador] 	= [":beso:", ":*", "-3-", "(k)", "(K)"]; contador++;
	emoticonos[contador]	= [":calabaza:"]; contador++;
	emoticonos[contador]	= [":casita:"]; contador++;
	emoticonos[contador]	= [":corazon:", "<3", "<B", "<b", "(l)", "(L)"]; contador++;
	emoticonos[contador]	= [":dinero:", "$"]; contador++;
	emoticonos[contador]	= [":drama:", "o.o", "O.O", "o-o", "O-O", "o_o", "O_O", ":O", "=o", "=O"]; contador++;
	emoticonos[contador]	= [":enfado:", ":@"]; contador++;
	emoticonos[contador] 	= [":feliz:", ":)", "=)", ":D", "=D", ":-)", "=-)", ":-D", "=-D"]; contador++;
	emoticonos[contador]	= [":gota:", ":S", "=s", "=S", ":-s", ":-S", "=-s", "=-S"]; contador++;
	emoticonos[contador]	= [":hotel:"]; contador++;
	emoticonos[contador]	= [":imperdible:", ":imperdiblesoft:"]; contador++;
	emoticonos[contador]	= [":lengua:", ":P", "=p", "=P"]; contador++;
	emoticonos[contador]	= [":lenguatic:", ";p", ";P"]; contador++;
	emoticonos[contador]	= [":lindo:", "^^", "^.^", "^-^", "^_^"]; contador++;
	emoticonos[contador]	= [":llanto:", " tt ", " TT ", "t.t", "T.T", "t-t", "T-T", "t_t", "T_T"]; contador++;
	emoticonos[contador]	= [":miedo:", ">.<", ">-<", ">_<"]; contador++;
	emoticonos[contador]	= [":mierda:", ":plop:"]; contador++;
	emoticonos[contador]	= [":mono:"]; contador++;
	emoticonos[contador]	= [":noel:"]; contador++;
	emoticonos[contador]	= [":ok:", "ok", "Ok"]; contador++;
	emoticonos[contador]	= [":regalo:"]; contador++;
	emoticonos[contador]	= [":risa:", "xd", "xD", "XD"]; contador++;
	emoticonos[contador]	= [":santo:", "0)", "0-)"]; contador++;
	emoticonos[contador]	= [":snowman:"]; contador++;
	emoticonos[contador]	= [":tic:", ";)"]; contador++;
	emoticonos[contador]	= [":triste:", ":(", "=("]; contador++;
	emoticonos[contador]	= [":vaquita:", ":vaca:", ":vauqui:", ":muu:"]; contador++;
	emoticonos[contador]	= [":verguenza:", ":$"]; contador++;
	
	for(var x in emoticonos){
		switch(x){
			case '0': 
				var codigo = "asco"; break;
			case '1': 
				var codigo = "beso"; break;
			case '2': 
				var codigo = "calabaza"; break;
			case '3': 
				var codigo = "casita"; break;
			case '4': 
				var codigo = "corazon"; break;
			case '5': 
				var codigo = "dinero"; break;
			case '6': 
				var codigo = "drama"; break;
			case '7': 
				var codigo = "enfado"; break;
			case '8': 
				var codigo = "feliz"; break;
			case '9': 
				var codigo = "gota"; break;
			case '10': 
				var codigo = "hotel"; break;
			case '11': 
				var codigo = "imperdible"; break;
			case '12': 
				var codigo = "lengua"; break;
			case '13': 
				var codigo = "lenguatic"; break;
			case '14': 
				var codigo = "lindo"; break;
			case '15': 
				var codigo = "llanto"; break;
			case '16': 
				var codigo = "miedo"; break;
			case '17': 
				var codigo = "mierda"; break;
			case '18': 
				var codigo = "mono"; break;
			case '19': 
				var codigo = "noel"; break;
			case '20': 
				var codigo = "ok"; break;
			case '21': 
				var codigo = "regalo"; break;
			case '22': 
				var codigo = "risa"; break;
			case '23': 
				var codigo = "santo"; break;
			case '24': 
				var codigo = "snowman"; break;
			case '25': 
				var codigo = "tic"; break;
			case '26': 
				var codigo = "triste"; break;
			case '27': 
				var codigo = "vaquita"; break;
			case '28': 
				var codigo = "verguenza"; break;
		}
		
		for(var y in emoticonos[x]){
			retorno = retorno.replace(emoticonos[x][y], "<img class='emoticono explicacion' alt=':"+codigo+":' src='img/emoticonos/"+codigo+".png' />");
		}
	}
	
	return retorno;		
}

/*	Invitar a un amigo */
function invitar_amigo(parametro){
	$("body").append("<div id='mensajes'></div>");
	$("#mensajes").append("<div id='tarjeta4'></div>");
	$("#tarjeta4").append("<h1>Invitar a un amigo</h1>");
	$("#tarjeta4").append("<p>Si quieres invitar a un amigo, simplemente pásale el link que te facilitamos a continuación.</p><br />");
	$("#tarjeta4").append("<p>Cuando se registre correctamente, se te asignarán 10 puntos por usuario registrado con tu invitación.</p><br />");
	$("#tarjeta4").append("<center><p style='font-weight: normal!important; color: #2b8d17;'>http://monopoly2.imperdiblesoft.com/invitacion-"+parametro+"</p></center>");
	$("#tarjeta4").append("<div id='botonera'></div>");
	$("#botonera").append("<a id='cancelar' class='boton' href='javascript:void(0)'>Cerrar</a>");
	$("#mensajes").fadeIn("fast");
	
	$("#cancelar").click(function(){
		cerrar_alerta();
	});
}

function depurar(parametro){
	$("#consultarecibida").html(JSON.stringify(parametro));
	
	$("#consultarecibida").show();
}
function precargar_ui(){
	var i;	
	var imagenes = new Array(
		'img/aceptar-normal.png', 'img/aceptar-hover.png', 'img/aceptar-clicked.png',
		'img/cancelar-normal.png', 'img/cancelar-hover.png', 'img/cancelar-clicked.png',
		'img/eliminar.png', 'img/guardar.png', 'img/restaurar.png', 'img/estado_listo.png',
		'avatares/administrador.png', 'avatares/bolsa.png', 'avatares/bota.png', 'avatares/caballo.png', 'avatares/carreta.png', 'avatares/coche.png', 'avatares/dedal.png', 'avatares/dragon.png', 'avatares/imperdible.png', 'avatares/perro.png', 'avatares/plancha.png', 'avatares/saltamontes.png', 'avatares/sombrero.png', 'avatares/telar.png',
		'img/emoticonos/asco.png', 'img/emoticonos/beso.png', 'img/emoticonos/calabaza.png', 'img/emoticonos/casita.png', 'img/emoticonos/corazon.png', 'img/emoticonos/dinero.png', 'img/emoticonos/drama.png', 'img/emoticonos/enfado.png', 'img/emoticonos/feliz.png', 'img/emoticonos/gota.png', 'img/emoticonos/hotel.png', 'img/emoticonos/imperdible.png', 'img/emoticonos/lengua.png', 'img/emoticonos/lenguatic.png', 'img/emoticonos/lindo.png', 'img/emoticonos/llanto.png', 'img/emoticonos/miedo.png', 'img/emoticonos/mierda.png', 'img/emoticonos/mono.png', 'img/emoticonos/noel.png', 'img/emoticonos/ok.png', 'img/emoticonos/regalo.png',  'img/emoticonos/risa.png',  'img/emoticonos/santo.png', 'img/emoticonos/snowman.png', 'img/emoticonos/tic.png', 'img/emoticonos/triste.png', 'img/emoticonos/vaquita.png',  'img/emoticonos/verguenza.png',
		'img/logotipo.png', 'img/Facebook.png', 'img/Twitter.png', 'img/facebooklogo.png', 'img/twitterlogo.png', 'img/logo-app.png', 'img/cerrar-widget.png'
	);
	
	var lista_imagenes = new Array();
	for(i in imagenes){
		lista_imagenes[i]=new Image();
		lista_imagenes[i].src=imagenes[i];
	}
}
function precargar_juego(){
	var i;	
	var imagenes = new Array(
		'img/loading.gif',
		'img/logo-cajacomunidad.png', 'img/logo-suerte.png',
		'img/parkinggratuito.png', 'img/policia.png',
		'img/comunidad.jpg', 'img/comunidad2.jpg', 'img/suerte.jpg', 'img/suerte2.jpg',
		'img/casita.png', 'img/hotel.png', 'img/transparente.png',
		'img/dado1.png','img/dado2.png','img/dado3.png','img/dado4.png','img/dado5.png','img/dado6.png'
	);
	
	var lista_imagenes = new Array();
	for(i in imagenes){
		lista_imagenes[i]=new Image();
		lista_imagenes[i].src=imagenes[i];
	}
}

function menu_espectador(){
	$("#menu_cabecera").html('');
	$("#menu_cabecera").append('<li><a href="/dejar_partida">Salir</a></li>');
	$("#menu_cabecera").append('<li id="nombre_usuario"><img height="18px" style="vertical-align: middle;" src="http://www.imperdiblesoft.com/img/tipos_cuenta/'+mi_nombre_cuenta+'.png" /> '+yo.nombre+'</li>');
	if(yo.tipo_cuenta == '0'){
		$("#menu_cabecera").append('<li><a href="/admin">Admin</a></li>');
	}
	$("#menu_cabecera").append('<li id="reloj_server">'+sys_hora+'</li>');
	$("#menu_cabecera").append('<li>v'+sys_version+'</li>');
}

function entradasocial(){
	$("#fondo-widget").fadeIn("fast");
	$("#componentesocial").animate(
		{"marginLeft" : "-30px"},
		"fast",
		function(){
			$("#cerrar-widget").css("opacity", "100");
		}
	);
}
function salidasocial(){
	$("#componentesocial").animate(
		{"marginLeft" : "-330px"},
		"fast",
		function(){
			$("#cerrar-widget").css("opacity", "0");
			$("#fondo-widget").fadeOut("fast");
		}
	);
}

function enviar_chat_enter(tecla, usuario, mesa){	
	if(tecla.keyCode == 13 && $("#chat_escribir").val() != ""){
		var temp = $("#chat_escribir").val();
		$("#chat_escribir").val("");
		$.ajax({
			type : 'get',
			url : 'funciones/ajax_monopoly.php',
			dataType : 'json', 
			data : {
				'id_usuario' : usuario,
				'online': true,
				'mesa' : mesa,
				'mensaje': temp
			},
			complete : function(response){
			},
			success : function(response){
			}
		});
	}
}

function sonar(parametro){
	var sonido = document.getElementById(parametro);
	if(sonido.Play){
		sonido.Play();
	}else{
		sonido.play();
	}
}

function alertar(imagen, titulo, mensaje){
	$("#mensajes").html("<div id='tarjeta'></div>");
	if(imagen != ""){
		$("#tarjeta").append("<img src='img/"+imagen+"'>");
	}
	if(titulo != ""){
		$("#tarjeta").append("<h1>"+titulo+"</h1>");
	}
	$("#tarjeta").append("<p>"+mensaje+"</p>");
	$("#tarjeta").append("<div id='botonera'><a id='aceptar_mensaje' class='boton' href='javascript:cerrar_alerta()'>Aceptar</a></div></div>");
	
	$("#mensajes").fadeIn("fast");
}
function alertar_2(imagen, titulo, mensaje){
	$("#mensajes").html("<div id='tarjeta'></div>");
	if(imagen != ""){
		$("#tarjeta").append("<img src='img/"+imagen+"'>");
	}
	if(titulo != ""){
		$("#tarjeta").append("<h1>"+titulo+"</h1>");
	}
	$("#tarjeta").append("<p>"+mensaje+"</p>");
	$("#tarjeta").append("<div id='botonera'><a id='pagar_mensaje' class='boton' href='javascript:cerrar_alerta()'>Pagar</a><a id='suerte_mensaje' class='boton' href='javascript:cerrar_alerta()'>Suerte</a></div></div>");
	
	$("#mensajes").fadeIn("fast");
}
function cerrar_alerta(){
	$('#mensajes').fadeOut(
		"fast",
		function(){
			$('#mensajes').html('');
			if(yo.posicion){
				actualizarinformacion(yo.posicion);
			}
		}
	);
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : yo.id,
			'online': true
		},
		complete : function(response){
		},
		success : function(response){
		}
	});
}
function cerrar_alerta2(){
	$('#mensajes2').fadeOut(
		"fast",
		function(){
			$('#mensajes2').html('');
			if(yo.posicion){
				actualizarinformacion(yo.posicion);
			}
		}
	);
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : yo.id,
			'online': true
		},
		complete : function(response){
		},
		success : function(response){
		}
	});
}

function expulsar(){
	alertar("eliminar.png", "", "Tu mesa ha sido borrada, o has sido expulsado de ella. A continuación serás redirigido a la pantalla principal");
	$("#aceptar_mensaje").click(function(){
		location.href = "/ver_mesas";
	});
}

function abrir_ticket(){
	$("#mensajes").html("<div id='tarjeta5'><div id='botonera'></div></div>");
	
	/*	Si no hay ningún ticket */
	if(ticket == false || ticket['consulta'] == "" && ticket['consulta'] == ""){
		$("#tarjeta5").append("<img src='img/logo-suerte.png'><h1>Hablar con un GM</h1><p id='texto_intro_ticket'></p><br />");
		$("#tarjeta5").append("<textarea id='consulta' class='texto_ticket' maxlength='4500'></textarea>");
		$("#botonera").append("<a id='aceptar_mensaje' class='boton' href='javascript:cerrar_alerta()'>Aceptar</a>");
		$("#botonera").append("<a id='cancelar_mensaje' class='boton cancelar' href='javascript:cerrar_alerta()'>Cancelar</a>");
		
		$("#texto_intro_ticket").html("Bienvenido al sistema de tickets de Monopoly Online. Por favor, dinos cuál es tu consulta.");
	}
	
	/*	Si hay un ticket abierto */
	else if(ticket['consulta'] != false && ticket['respuesta'] == ""){
		$("#tarjeta5").append("<img src='img/logo-suerte.png'><h1>Hablar con un GM</h1><p id='texto_intro_ticket'></p><br />");
		$("#tarjeta5").append("<textarea id='consulta' class='texto_ticket' maxlength='4500'>"+ticket['consulta']+"</textarea>");
		$("#botonera").append("<a id='aceptar_mensaje' class='boton' href='javascript:cerrar_alerta()'>Actualizar</a>");
		$("#botonera").append("<a id='cancelar_mensaje' class='boton cancelar' href='javascript:cerrar_alerta()'>Cerrar</a>");
		
		$("#texto_intro_ticket").html("Actualmente tienes una consulta abierta, espera a que sea atendida o modifícala.");
	}
	
	/*	Si hay un ticket respondido */
	else{
		$("#tarjeta5").append("<img src='img/logo-suerte.png'><h1>Hablar con un GM</h1><p id='texto_intro_ticket'></p><br />");
		$("#tarjeta5").append("<h2>Consulta:</h2><p id='consulta' class='ticket_consulta'>"+ticket['consulta']+"</p><br />");
		$("#tarjeta5").append("<h2>Respuesta de "+ticket['rango_admin']+" "+ticket['nombre_admin']+":</h2><p id='respuesta' class='ticket_respuesta'>"+ticket['respuesta']+"</p>");
		$("#botonera").append("<a class='boton' href='javascript:cerrar_alerta()'>Aceptar</a>");
		$("#botonera").append("<a id='borrar_mensaje' class='boton cancelar' href='javascript:cerrar_alerta()'>Borrar</a>");
		
		$("#texto_intro_ticket").html("Un GM ha respondido a tu consulta.");
		ticket_leer();
	}
	$("#mensajes").fadeIn("fast");
	
	$("#aceptar_mensaje").click(function(){
		if(ticket == false){
			ticket = new Array();
		}
		ticket['consulta'] = $('#consulta').val();
		$.ajax({
			type : 'post',
			url : 'funciones/ajax_monopoly.php',
			dataType : 'json', 
			data : {
				'id_usuario' : yo2['id_usuario'],
				'ticket' : ticket['consulta']
			},
			complete : function(response){
			},
			success : function(response){
			}
		});
	});
	$("#borrar_mensaje").click(function(){
		$.ajax({
			type : 'get',
			url : 'funciones/ajax_monopoly.php',
			dataType : 'json', 
			data : {
				'id_usuario' : yo2['id_usuario'],
				'borrar_ticket' : true
			},
			complete : function(response){
			},
			success : function(response){
				ticket = false;
			}
		});
	});
}
function ticket_alertar(){
	if(ticket['leido'] == '0'){
		if(ticket_color == 0){
			ticket_color = 1;
			$("#boton_ticket").css("color", "#333333");
			
		}else if(ticket_color == 1){
			ticket_color = 0;
			$("#boton_ticket").css("color", "#ffffff");
		}
		
		$("#boton_ticket").parent("li").attr("alt", "Tu consulta ha sido atendida.");
		setTimeout(function(){ticket_alertar()}, 500);
	}else{
		ticket_restaurar();
	}
}
function ticket_restaurar(){
	ticket_color = 0;
	$("#boton_ticket").css("color", "white");
	$("#boton_ticket").parent("li").attr("alt", "Abre una consulta para que sea respondida por un GM.");
}
function ticket_leer(){
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : yo2['id_usuario'],
			'leer_ticket' : true
		},
		complete : function(response){
		},
		success : function(response){
		}
	});
}

/*	Funciones de interaccion con los jugadores */
function denuncia_crear(jugador){
	$("#mensajes2").fadeIn("fast");
	
	if(isNaN(jugador)){
		for(var x in jugadores){
			if(jugadores[x].nombre == jugador){
				var denunciado = jugadores[x].id;
			}
		}
	}else{
		var denunciado = jugadores[jugador].id;
	}
	
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : yo.id,
			'denuncia' : true,
			'denunciado' : denunciado
		},
		complete : function(response){
		},
		success : function(response){
			$("#mensajes2").fadeOut("fast");
		}
	});
}
function menu_jugador(jugador){	

	menu_abierto = false;
	var ratonX = 0;
	var ratonYventana = 0;
	var ratonYdocumento = 0;

	if(jugadores != false && jugador <= 3 && jugadores[jugador].nombre == "usuario"){
		var enlace = jugadores[jugador].id;
	}else if(jugadores != false && jugador <= 3){
		var enlace = jugadores[jugador].nombre;
	}else{
		var enlace = jugador;
	}
	
	$("#menu_raton").remove();
	$('body').prepend('<div id="menu_raton" class="menu_raton"></div>');
	$("#menu_raton").append('<a href="http://www.imperdiblesoft.com/'+enlace+'" target="popup" onClick="window.open(this.href, this.target, \'width=1125, height=600\'); return false;">Ver perfil de '+enlace+'</a><br />');
	if($.isNumeric(jugador)){
		$("#menu_raton").append('<hr />');
		$("#menu_raton").append('<a href="javascript:ver_propiedades('+jugador+')" target="_blank">Ver propiedades</a><br />');
	}
	if(jugador != yo.posicion && yo != false && jugador != yo.nombre){
		$("#menu_raton").append('<hr />');
		$("#menu_raton").append('<a href="javascript:denuncia_crear(\''+jugador+'\')">Denunciar jugador ausente</a><br />');
	}
	
	if(event.clientX != null && event.clientX != "null" && event.clientX != undefined && event.clientX != "undefined" && event.clientX != ""){
		ratonX = event.clientX;
	}
	if(event.clientY != null && event.clientY != "null" && event.clientY != undefined && event.clientY != "undefined" && event.clientY != ""){
		ratonYventana = event.clientY;
	}
	if(event.pageY != null && event.pageY != "null" && event.pageY != undefined && event.pageY != "undefined" && event.pageY != ""){
		ratonYdocumento = event.pageY;
	}
	
	var ventanaX = window.innerWidth;
	var ventanaY = window.innerHeight;

	if(ratonX >= (ventanaX - ($('#menu_raton').width() + 10))){
		var tooltipX = ratonX - $('#menu_raton').width();
	}else{
		var tooltipX = ratonX;
	}

	if(ratonYventana >= (ventanaY - ($('#menu_raton').height() + 30))){
		var tooltipY = ratonYventana - $('#menu_raton').height() - 20;
	}else{
		var tooltipY = ratonYventana;
	}

	$('#menu_raton').css({left: tooltipX});
	$('#menu_raton').css({top: tooltipY});
	$('#menu_raton').fadeIn(
		"fast", 
		function(){
			menu_abierto = true;
		}
	);
}
function denuncia_expulsar(id_usuario){
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : yo.id,
			'expulsar_jugador' : true,
			'partida' : id_partida,
			'denunciado' : id_usuario
		},
		complete : function(response){
		},
		success : function(response){
		}
	});
}
function denuncia_eliminar(id_partida, id_usuario){
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : yo.id,
			'eliminar_denuncia' : true,
			'partida' : id_partida,
			'denunciado' : id_usuario
		},
		complete : function(response){
		},
		success : function(response){
		}
	});
}

/*	Funciones relacionadas con dados y turnos */
function partida_informar(texto, usuario){
	if(!usuario){
		var usuario = yo.id;
	}
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : usuario,
			'informar': texto
		},
		complete : function(response){
		},
		success : function(response){
		}
	});
}
function mostrar_informacion(texto){
	$("#mensaje_estado").html("<p>"+texto+"</p>");
}
function partida_turno(){
	$("#mensaje_estado").html("");
	if(mostrar_botones == true){
		
		/*	"Tirar dados": 		Si tengo dinero y puedo jugar */
		if(jugadores[yo.posicion].dinero >= 0 && jugadores[yo.posicion].jugando == 1 && jugadores[yo.posicion].jugando < 4){
			$("#mensaje_estado").append('<a class="boton" href="javascript:tirar_dados()">Tirar dados</a>');
		}
		
		/*	"Terminar turno":	Si tengo dinero y ya tiré dados */
		if((jugadores[yo.posicion].dinero >= 0 && jugadores[yo.posicion].jugando == 2) || jugadores[yo.posicion].jugando == 4){
			$("#mensaje_estado").append('<a class="boton" href="javascript:terminar_turno()">Terminar turno</a>');
		}
		
		/*	"Usar tarjeta":		Si tengo la tarjeta y estoy en la cárcel */
		if(comunidades['113'].propietario == yo.id && jugadores[yo.posicion].jugando == 1 && jugadores[yo.posicion].carcel > 0 && jugadores[yo.posicion].carcel < 4){
			$("#mensaje_estado").append('<a id="usar_tarjeta" class="boton" href="javascript:usar_tarjeta()">Usar Tarjeta</a>');
		}
		
		/*	"Pagar fianza":		Si tengo dinero y estoy en la cárcel */
		if(jugadores[yo.posicion].dinero >= 0 && jugadores[yo.posicion].jugando == 1 && jugadores[yo.posicion].carcel > 0 && jugadores[yo.posicion].carcel < 4){
			$("#mensaje_estado").append('<a id="pagar_fianza" class="boton" href="javascript:pagar_fianza()">Pagar Fianza</a>');
		}
		
		/*	"Negociar":			Si tengo dinero, no he tirado y estoy libre, o si no tengo dinero */
		if((jugadores[yo.posicion].dinero >= 0 && jugadores[yo.posicion].jugando == 1 && jugadores[yo.posicion].carcel == 0) || jugadores[yo.posicion].dinero < 0){
			$("#mensaje_estado").append('<a class="boton" href="javascript:negociar()">Negociar</a>');
		}
		
		/*	"Rendirse":			Si no tengo dinero */
		if(jugadores[yo.posicion].dinero < 0){
			$("#mensaje_estado").append('<a class="boton" href="javascript:rendirse()">Rendirse</a>');
		}
		
	}else{
		
		/*	Muestra la última notificación */
		mostrar_informacion(notificaciones[(sizeof(notificaciones) - 1)]);
	}
}
function tirar_dados(){
	mostrar_botones = false;
	partida_turno();
	
	/*	Si el usuario todavía no tiró */
	if(yo.jugando == "1"){
		
		$("#mensajes").fadeIn("fast", function(){
			var seguir_tirando = true;
			function renovar_dados(){
				if(seguir_tirando == true){
					$("#mensajes").html("");
					$("#mensajes").append("<img id='dado1' />");
					$("#mensajes").append("<img id='dado2' />");
					tirada1 = Math.round(Math.random()*5+1);
					tirada2 = Math.round(Math.random()*5+1);
					$("#dado1").attr("src", "img/dado"+tirada1+".png");
					$("#dado2").attr("src", "img/dado"+tirada2+".png");
					setTimeout(function(){
						renovar_dados();
					}, 250);
				}
			}
			renovar_dados();
			
			$.ajax({
				type : 'get',
				url : 'funciones/ajax_monopoly.php',
				dataType : 'json', 
				data : {
					'id_usuario' : yo.id,
					'dados': true
				},
				complete : function(response){
				},
				success : function(response){
					
					/*	Para la renovación de dados */
					seguir_tirando = false;
					tirada1 = response['dados']['dado1'];
					tirada2 = response['dados']['dado2'];
				
					/*	Dibuja los dados recibidos */
					$("#mensajes").html("");
					$("#mensajes").append("<img id='dado1' />");
					$("#mensajes").append("<img id='dado2' />");
					$("#dado1").attr("src", "img/dado"+tirada1+".png");
					$("#dado2").attr("src", "img/dado"+tirada2+".png");
					
					setTimeout(function(){
						
						/*	Establece la nueva casilla */
						var nueva_casilla = parseInt(yo.casilla) + parseInt(tirada1) + parseInt(tirada2);
						if(nueva_casilla >= 40){
							nueva_casilla = parseInt(nueva_casilla) - 40;
							actualizar_dinero("+", cobrar);
						}
						
						/*	Si son dobles */
						if(tirada1 == tirada2){
						
							/*	Cuenta las veces que ha tirado */
							dobles_seguidos++;
							
							/*	Si estaba en la carcel, lo saca */
							if(yo.carcel > 0){
								actualizar_datos_jugador('carcel', '0');
								yo.carcel = 0;
								dobles_seguidos = 1;
								setTimeout(function(){
									partida_informar(yo.nombre+" sacó "+tirada1+" y "+tirada2+" y calló en "+casillas[nueva_casilla].nombre+". Esperando que tire de nuevo.");
									actualizar_turno(yo.id, '1');
								}, 500);
							}
							
							/*	Si tiró 3 dobles seguidos, a la cárcel */
							else if(dobles_seguidos >= 3){
								partida_informar(yo.nombre+" sacó 3 dobles y va a la "+casillas['10'].nombre+".");
								alertar("policia.png", "A la cárcel", "Has sacado 3 dobles seguidos. Vete a la "+casillas['10'].nombre+", sin pasar por la casilla de salida ni cobrar "+cobrar+"€.");
								
								$("#aceptar_mensaje").click(function(){
									alacarcel();
								});
							}
							
							/*	Si tiró menos de 3 dobles seguidos, tira */
							else{
								partida_informar(yo.nombre+" sacó "+tirada1+" y "+tirada2+" y calló en "+casillas[nueva_casilla].nombre+". Esperando que tire de nuevo.");
								actualizar_turno(yo.id, '1');
							}
						}
						
						/*	Si no son dobles */
						else{
							dobles_seguidos = 0;
							actualizar_turno(yo.id, '2');
							
							/*	Si estoy en la cárcel */
							if(yo.carcel > 0){
								actualizar_datos_jugador('carcel', (yo.carcel - 1));
								yo.carcel--;
								
								if(yo.carcel == 0){
									partida_informar(yo.nombre+" no sacó dobles, pero ya cumplió su condena y es libre.");
								}
								
								else{
									partida_informar(yo.nombre+" no sacó dobles, le quedan "+yo.carcel+" turnos encerrado en la "+casillas['10'].nombre+".");
								}
							}
							
							/*	Si no estoy en la cárcel */
							else{
								partida_informar(yo.nombre+" sacó "+tirada1+" y "+tirada2+" y calló en "+casillas[nueva_casilla].nombre+". Esperando que termine el turno.");
								if(nueva_casilla < jugadores[yo.posicion].casilla){
									actualizar_dinero("+", cobrar);
								}
							}
						}
					}, 250);
				}
			});
		});
	}
	
	/*	Si el usuario ya tiró */
	else{
		$("#mensajes").html("<div id='tarjeta'></div>");
		$("#tarjeta").append("<p>Ya tiraste tus dados.</p>");
		$("#tarjeta").append("<p>Realiza las operaciones que quieras con tus calles o termina el turno.</p>");
		$("#tarjeta").append("<div id='botonera'></div>");
		$("#botonera").append('<a class="boton" href="javascript:cerrar_alerta()">Aceptar</a>');
		$("#mensajes").fadeIn("fast");
	}
}
function actualizar_turno(jugador, turno, anterior_carcel){
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : jugador,
			'turno': turno
		},
		complete : function(response){
		},
		success : function(response){
			$("#mensajes").fadeOut("fast", function(){
				$("#mensajes").html("");
				
				/*	Mueve la ficha */
				if(yo.carcel <= '0' && (!anterior_carcel || anterior_carcel == false)){
					actualizar_casilla((tirada1 + tirada2));
					
				}else{
					mostrar_botones = true;
				}
			});
		}
	});
}
function actualizar_casilla(dados){
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : yo.id,
			'nueva_casilla': dados
		},
		complete : function(response){
		},
		success : function(response){
			mostrar_botones = true;
		}
	});
}
function terminar_turno(){
	mostrar_botones = false;
	partida_turno();
	
	/*	Si ya había tirado */
	if(yo.jugando == '2'){
		$("#mensajes").fadeIn("fast", function(){
			$("#mensajes").html("");
		});
		
		$.ajax({
			type : 'get',
			url : 'funciones/ajax_monopoly.php',
			dataType : 'json', 
			data : {
				'id_usuario' : yo.id,
				'terminar_turno': true
			},
			complete : function(response){
			},
			success : function(response){
				function check(){
					if(turno.id == yo.id){
						setTimeout(function(){ check(); }, 250);
					}else{
						$("#mensajes").fadeOut("fast", function(){
							mostrar_botones = true;
							partida_informar("Esperando a que "+turno.nombre+" tire los dados.");
							actualizarinformacion(yo.posicion);
						});
					}
				}
				check();
			}
		});
	
	/*	Si todavía no he tirado */
	}else{
		$("#mensajes").html("<div id='tarjeta'></div>");
		$("#tarjeta").append("<p>Todavía no puedes terminar el turno.</p>");
		$("#tarjeta").append("<p>Revisa por si no tiraste dados, o si sacaste dobles.</p>");
		$("#tarjeta").append("<div id='botonera'></div>");
		$("#botonera").append('<a class="boton" href="javascript:cerrar_alerta()">Aceptar</a>');
		$("#mensajes").fadeIn("fast");
	}
}

/*	Funciones de interaccion con las fichas */
function colocar_fichas(response){
	var temp = response['partida']['jugadores'];
	for(var x in temp){
		var top = $("#casilla"+temp[x]['casilla'])['0'].offsetTop;
		var left = $("#casilla"+temp[x]['casilla'])['0'].offsetLeft;
		
		jugadores[x].avatar = new Ficha(temp[x]['id_avatar'], temp[x]['avatar_jugador']);
		$("#tablero").append("<img id='ficha"+jugadores[x].id+"' class='ficha' src='avatares/"+jugadores[x].avatar.ruta+".png' />");
		$("#ficha"+jugadores[x].id).css("top", top);
		$("#ficha"+jugadores[x].id).css("left", left);
		$("#ficha"+jugadores[x].id).show();
	}
}
function borrar_fichas(jugadores){
	for(var x in jugadores){
		$("#ficha"+jugadores[x].id).remove();
	}
}
function mover_ficha(nuevo_jugador){
	function ejecutar(jugador, casilla){
		actualizarinformacion(yo.posicion);
		if(jugador == yo.id){
			caer(casilla);
		}
	}

	var temp = nuevo_jugador;
	
	var vieja = jugadores[temp['posicion']].casilla;
	var nueva = nuevo_jugador['casilla'];
	
	var top = $("#casilla"+temp['casilla'])['0'].offsetTop;
	var left = $("#casilla"+temp['casilla'])['0'].offsetLeft;
	
	jugadores[temp['posicion']].casilla = nueva;
	
	if((vieja >= 0 && vieja <= 10) && (nueva  >= 11 && nueva <= 20)){
		$("#ficha"+jugadores[temp['posicion']].id).animate({"left": $("#casilla10").position().left}, "medium", "linear", function(){
			$("#ficha"+jugadores[temp['posicion']].id).animate({"top": top}, "medium", "linear", function(){
				ejecutar(temp['id_jugador'], nueva);
			});
		});
	
	}else if((vieja >= 11 && vieja <= 20) && (nueva  >= 21 && nueva <= 30)){
		$("#ficha"+jugadores[temp['posicion']].id).animate({"top": $("#casilla20").position().top}, "medium", "linear", function(){
			$("#ficha"+jugadores[temp['posicion']].id).animate({"left": left}, "medium", "linear", function(){
				ejecutar(temp['id_jugador'], nueva);
			});
		});
	
	}else if((vieja >= 21 && vieja <= 30) && (nueva  >= 31 && (nueva <= 39 || nueva == 0))){
		$("#ficha"+jugadores[temp['posicion']].id).animate({"left": $("#casilla30").position().left}, "medium", "linear", function(){
			$("#ficha"+jugadores[temp['posicion']].id).animate({"top": top}, "medium", "linear", function(){
				ejecutar(temp['id_jugador'], nueva);
			});
		});
	
	}else if((vieja  >= 31 && (vieja <= 39 || vieja == 0)) && (nueva >= 1 && nueva <= 10)){
		$("#ficha"+jugadores[temp['posicion']].id).animate({"top": $("#casilla0").position().top}, "medium", "linear", function(){
			$("#ficha"+jugadores[temp['posicion']].id).animate({"left": left}, "medium", "linear", function(){
				ejecutar(temp['id_jugador'], nueva);
			});
		});
	
	}else{
		$("#ficha"+jugadores[temp['posicion']].id).animate({"top": top, "left": left}, "medium", "linear", function(){
			ejecutar(temp['id_jugador'], nueva);
		});
	}
}

/*	Funciones de interacción en la cárcel */
function alacarcel(){
	actualizar_datos_jugador('jugando', 2);
	actualizar_datos_jugador('carcel', 3);
	actualizar_datos_jugador('casilla', 10);
	
	tirada1 = 0;
	tirada2 = 0;
	dobles = 0;
	dobles_seguidos = 0;
	intento = true;
	mostrar_botones = true;
}
function pagar_fianza(){
	$("#mensajes").fadeIn("fast");
	mostrar_botones = false;
	partida_turno();
	
	actualizar_dinero('-', 50);
	actualizar_casilla_datos(20, 'casas', (parseInt(casillas[20].casas) + 50));
	partida_informar(yo.nombre+" pagó 50€ de fianza y saldrá de la cárcel al próximo turno.", yo.id);
	actualizar_datos_jugador('carcel', '0');
	actualizar_turno(yo.id, '0', true);
	actualizarinformacion(yo.posicion);
}
function usar_tarjeta(){
	$("#mensajes").fadeIn("fast");
	mostrar_botones = false;
	partida_turno();
	
	actualizar_tarjeta_propietario('0', '113');
	partida_informar(yo.nombre+" usó la tarjeta y saldrá de la cárcel al próximo turno.", yo.id);
	actualizar_datos_jugador('carcel', '0');
	actualizar_turno(yo.id, '0', true);
	actualizarinformacion(yo.posicion);
}

/*	Funciones de interacción con casillas */
function contarcalles(id){
	grupocasillas_maximo = 0;
	grupocasillas_jugador = 0;
	grupocasillas_propietario = 0;
	contador_casas = 0;
	contador_hipotecas = 0;
	
	for(i=0; i<=39; i++){
	
		/*	Cuenta las casillas que tiene ese grupo */
		if(casillas[id].color == casillas[i].color)
			grupocasillas_maximo++;
			
		/*	Cuenta las casillas que tememos de ese grupo */
		if(casillas[i].propietario == yo.nombre && casillas[id].color == casillas[i].color)
			grupocasillas_jugador++;
			
		/*	Cuenta las casillas que tiene el propietario de ese grupo */
		if(casillas[id].propietario == casillas[i].propietario && casillas[id].color == casillas[i].color)
			grupocasillas_propietario++;
		
		/*	Cuenta el numero de casas que hay en ese grupo */
		if(casillas[i].color == casillas[id].color && casillas[i].casas != 0)
			contador_casas++;
		
		/*	Cuenta las hipotecas que tenemos en ese grupo */
		if(casillas[i].propietario == casillas[id].propietario && casillas[i].color == casillas[id].color && casillas[i].hipotecada == 1)
			contador_hipotecas++;
	}
}
function infocasilla(id){
	
	if(id != 113){
		contarcalles(id);
	}
	$("#mensajes").html("");
	$("#mensajes").append("<div id='tarjeta5'></div");
	$("#tarjeta5").append("<h1>Información</h1>");
	
	
	if(id != 113){
		var casilla = casillas[id];
		if(casilla.propietario == 0){
			var temp_propietario = "Nadie";
		}else{
			for(x in jugadores){
				if(jugadores[x].id == casilla.propietario)
					var temp_propietario = jugadores[x].nombre;
			}
		}
		if(casilla.hipotecada == 0){
			var temp_hipoteca = "No";
		}else{
			var temp_hipoteca = "Si";
		}
	}
	
	/* Salida */
	if(id == 0){
		
		$("#tarjeta5").append("<div id='fichacasilla'><table><tr><td class='titulo'><center>"+casillas[id].nombre+"</center></td></tr><tr><td><br /></td></tr><tr><td class='centro'>Cuando un jugador pasa por esta casilla cobrará 200€. Si un jugador cae en la casilla, cobrará 200€ extra.</td></tr><tr><td><br /></td></tr><tr><td><br /></td></tr><td><br /></td></tr><tr><td><br /></td></tr></table></div>");
		$("#tarjeta5").append("<div id='botonera'></div>");
	}
	
	/* Impuesto del patrimonio */
	else if(id == 4){
		
		$("#tarjeta5").append("<div id='fichacasilla'><table><tr><td class='titulo'><center>"+casillas[id].nombre+"</center></td></tr><tr><td><br /></td></tr><tr><td class='centro'>Si un jugador cae en esta casilla, tendrá que pagar el 10% del dinero que tenga en efectivo en ese momento.</td></tr><tr><td><br /></td></tr><tr><td><br /></td></tr><td><br /></td></tr><tr><td><br /></td></tr></table></div>");
		$("#tarjeta5").append("<div id='botonera'></div>");
	}
	
	/* Cárcel */
	else if(id == 10){
		
		$("#tarjeta5").append("<div id='fichacasilla'><table><tr><td class='titulo'><center>"+casillas[id].nombre+"</center></td></tr><tr><td><br /></td></tr><tr><td class='centro'>Cuando un jugador pasa o cae en esta casilla no pasará nada.</td></tr><tr><td class='centro'>Sólo entrarán en la cárcel cuando lo diga una tarjeta, saquen dobles 3 veces seguidas o caigan en la casilla 'A la cárcel'.</td></tr><tr><td><br /></td></tr></table></div>");
		$("#tarjeta5").append("<div id='botonera'></div>");
	}
	
	/* Parking Gratuito */
	else if(id == 20){
		
		$("#tarjeta5").append("<div id='fichacasilla'><table><tr><td class='titulo'><center>"+casillas[id].nombre+"</center></td></tr><tr><td><br /></td></tr><tr><td class='centro'>Cuando un jugador cae en esta casilla se llevará el dinero que los demás jugadores han pagado a causa de las Suertes, Cajas de Comunidad e Impuestos.</td></tr><tr><td><br /></td></tr><tr><td><br /></td></tr></table></div>");
		
		$("#tarjeta5").append("<div id='infocasilla'><p>Dinero acumulado: "+casillas[id].casas+"€</p></div>");
		$("#tarjeta5").append("<div id='botonera'></div>");
	}
	
	/* Policía */
	else if(id == 30){
		
		$("#tarjeta5").append("<div id='fichacasilla'><table><tr><td class='titulo'><center>"+casillas[id].nombre+"</center></td></tr><tr><td><br /></td></tr><tr><td class='centro'>Si un jugador cae en esta casilla, irá a la cárcel directamente, sin pasar por la casilla de SALIDA y sin cobrar 200€.</td></tr><tr><td><br /></td></tr><td><br /></td></tr><tr><td><br /></td></tr></table></div>");
		$("#tarjeta5").append("<div id='botonera'></div>");
	}
	
	/* Impuesto de lujo */
	else if(id == 38){
		
		$("#tarjeta5").append("<div id='fichacasilla'><table><tr><td class='titulo'><center>"+casillas[id].nombre+"</center></td></tr><tr><td><br /></td></tr><tr><td class='centro'>Si un jugador cae en esta casilla, tendrá que pagar 100€ al instante.</td></tr><tr><td><br /></td></tr><tr><td><br /></td></tr><td><br /></td></tr><tr><td><br /></td></tr></table></div>");
		$("#tarjeta5").append("<div id='botonera'></div>");
	}
	
	/*	Suertes y cajas de comunidad */
	else if(id == 2 || id == 7 || id == 17 || id == 22 || id == 33 || id == 36){
		
		$("#tarjeta5").append("<div id='fichacasilla'><table><tr><td class='titulo'><center>"+casillas[id].nombre+"</center></td></tr><tr><td><br /></td></tr><tr><td class='centro'>Si caes en esta casilla podrás tomar una carta y ver qué te toca hacer.</td></tr><tr><td><br /></td></tr><td><br /></td></tr><tr><td><br /></td></tr></table></div>");
		$("#tarjeta5").append("<div id='botonera'></div>");
	}
	
	/*	Suertes y cajas de comunidad */
	else if(id == 113){
		
		$("#tarjeta5").append("<div id='fichacasilla'><table><tr><td class='titulo'><center>Tarjeta libre de cárcel</center></td></tr><tr><td><br /></td></tr><tr><td class='centro'>"+comunidades['113'].mensaje+"</td></tr><tr><td><br /></td></tr><td><br /></td></tr><tr><td><br /></td></tr></table></div>");
		$("#tarjeta5").append("<div id='botonera'></div>");
	}
	
	/* Compañía eléctrica y agua */
	else if(id == 12 || id == 28){
		
		/*	Texto básico */
		$("#tarjeta5").append("<div id='fichacasilla'><table><tr><td class='titulo'><center>"+casillas[id].nombre+"</center></td></tr><tr><td class='centro'>Si se posee UNA Compañía, el Alquiler es 4 veces el número salido en los dados.</td></tr><td><br /></td></tr><tr><td class='centro'>Si se poseen DOS Compañías, el Alquiler es 10 veces el número salido en los dados.</td></tr><tr><td><br /></td></tr><tr><td class='centro'>Hipoteca: "+casillas[id].precio/2+"€</td></tr></table></div>");
		
		$("#tarjeta5").append("<div id='infocasilla'><p>Propietario: "+temp_propietario+"</p><p>Precio de compra: "+casillas[id].precio+"€</p><p>Hipotecada: "+temp_hipoteca+"</p><br /><br /></div>");
			
		if(casillas[id].propietario != 0){
			$("#infocasilla").append("<p>Compañías en propiedad: "+grupocasillas_propietario+"</p></div>");
		}
		
		$("#tarjeta5").append("<div id='botonera'></div>");
		
		/*	Si es propiedad del jugador */
		if(casillas[id].propietario == yo.id && (jugadores[yo.posicion].jugando == 1 || jugadores[yo.posicion].dinero < 0)){
		
			/*	Si está hipotecada o no */
			if(temp_hipoteca == "No"){
				$("#botonera").append("<a class='boton' href='javascript:hipotecar("+id+")'>Hipotecar</a>");
			}else{
				$("#botonera").append("<a class='boton' href='javascript:deshipotecar("+id+")'>Deshipotecar</a>");
			}
		}
	}
	
	/* Estaciones */
	else if(id == 5 || id == 15 || id == 25 || id == 35){ 
		
		/*	Texto básico */
		$("#tarjeta5").append("<div id='fichacasilla'><table class='titulo'><tr><td><center>"+casillas[id].nombre+"</center></td></tr></table><table><tr><td>1 Estación:</td><td class='derecha'>"+casillas[id].casas0+"€</td></tr><tr><td>2 Estaciones:</td><td class='derecha'>"+casillas[id].casas1+"€</td></tr><tr><td>3 Estaciones:</td><td class='derecha'>"+casillas[id].casas2+"€</td></tr><tr><td>4 Estaciones:</td><td class='derecha'>"+casillas[id].casas3+"€</td></tr><tr><td><br /></td><td class='derecha'><br /></td></tr><tr><td><br /></td><td class='derecha'><br /></td></tr><tr><td><br /></td><td><br /></td></tr><tr><td>Hipoteca:</td><td class='derecha'>"+casillas[id].precio/2+"€</td></tr></table></div>");
		
		$("#tarjeta5").append("<div id='infocasilla'><p>Propietario: "+temp_propietario+"</p><p>Precio de compra: "+casillas[id].precio+"€</p><p>Hipotecada: "+temp_hipoteca+"</p><br /><br />");
			
		if(casillas[id].propietario != 0){
			$("#infocasilla").append("<p>Estaciones en propiedad: "+grupocasillas_propietario+"</p><p>Renta actual: "+eval('casillas[id].casas'+(grupocasillas_propietario-1))+"€</p></div>");
		}
			
		$("#tarjeta5").append("<div id='botonera'></div>");
		
		/*	Si es propiedad del jugador */
		if(casillas[id].propietario == yo.id && (jugadores[yo.posicion].jugando == 1 || jugadores[yo.posicion].dinero < 0)){
		
			/*	Si está hipotecada o no */
			if(temp_hipoteca == "No"){
				$("#botonera").append("<a class='boton' href='javascript:hipotecar("+id+")'>Hipotecar</a>");
			}else{
				$("#botonera").append("<a class='boton' href='javascript:deshipotecar("+id+")'>Deshipotecar</a>");
			}
		}
	}
	
	/* Calles normales */
	else{ 
	
		/*	Texto básico */
		$("#tarjeta5").append("<div id='fichacasilla'><table bgcolor='"+casillas[id].color+"' class='titulo'><tr><td><center>"+casillas[id].nombre+"</center></td></tr></table><table><tr><td>Sin casas:</td><td class='derecha'>"+casillas[id].casas0+"€</td></tr><tr><td>1 casa:</td><td class='derecha'>"+casillas[id].casas1+"€</td></tr><tr><td>2 casas:</td><td class='derecha'>"+casillas[id].casas2+"€</td></tr><tr><td>3 casas:</td><td class='derecha'>"+casillas[id].casas3+"€</td></tr><tr><td>4 casas:</td><td class='derecha'>"+casillas[id].casas4+"€</td></tr><tr><td>Hotel:</td><td class='derecha'>"+casillas[id].casas5+"€</td></tr><tr><td><br /></td><td><br /></td></tr><tr><td>Hipoteca:</td><td class='derecha'>"+casillas[id].precio/2+"€</td></tr></table></div>");
		
		/*	Si tiene hotel o casas, o todas las casillas */
		if(casillas[id].casas == 5){
			$("#tarjeta5").append("<div id='infocasilla'><p>Propietario: "+temp_propietario+"</p><p>Precio de compra: "+casillas[id].precio+"€</p><p>Coste de construcción: "+casillas[id].construccion+"€</p><p>Hipotecada: "+temp_hipoteca+"</p><br /><br /><p>Casas construidas: Hotel</p><p>Renta actual: "+casillas[id].casas5+"€</p></div>");
			
		}else if(grupocasillas_propietario == grupocasillas_maximo && contador_hipotecas == 0 && contador_casas == 0){
			$("#tarjeta5").append("<div id='infocasilla'><p>Propietario: "+temp_propietario+"</p><p>Precio de compra: "+casillas[id].precio+"€</p><p>Coste de construcción: "+casillas[id].construccion+"€</p><p>Hipotecada: "+temp_hipoteca+"</p><br /><br />");
			
			if(casillas[id].propietario != 0){
				$("#infocasilla").append("<p>Casas construidas: "+casillas[id].casas+"</p><p>Renta actual: "+casillas[id].casas0*2+"€</p></div>");
			}
			
		}else{
			$("#tarjeta5").append("<div id='infocasilla'><p>Propietario: "+temp_propietario+"</p><p>Precio de compra: "+casillas[id].precio+"€</p><p>Coste de construcción: "+casillas[id].construccion+"€</p><p>Hipotecada: "+temp_hipoteca+"</p><br /><br /><p>Casas construidas: "+casillas[id].casas+"</p><p>Renta actual: "+eval("(casillas[id].casas"+casillas[id].casas+")")+"€</p></div>");
		}
		
		$("#tarjeta5").append("<div id='botonera'></div>");
		
		/*	Si es propiedad del jugador */
		if(casillas[id].propietario == yo.id && (jugadores[yo.posicion].jugando == 1 || jugadores[yo.posicion].dinero < 0)){
			
			/*	Si está hipotecada o no */
			if(temp_hipoteca == "No"){
				if(casillas[id].casas == 0 && contador_casas == 0){
					$("#botonera").append("<a class='boton' href='javascript:hipotecar("+id+")'>Hipotecar</a>");
				}
				
				if(contador_hipotecas == 0 && grupocasillas_propietario == grupocasillas_maximo && (jugadores[yo.posicion].dinero > 0 || (jugadores[yo.posicion].dinero < 0 && casillas[id].casas > 0))){
					$("#botonera").append("<a class='boton' href='javascript:construir("+id+")'>Casas</a>");
				}
			
			}else if(jugadores[yo.posicion].dinero > 0){
				$("#botonera").append("<a class='boton' href='javascript:deshipotecar("+id+")'>Deshipotecar</a>");
			}
		}
	}
	
	$("#botonera").append("<a class='boton' href='javascript:cerrar_alerta()'>Cerrar</a>");
	$("#mensajes").fadeIn("fast");
}
function casilla_normal(casilla){
	if(casillas[casilla].propietario == "0"){
		comprarcalle(casilla, casillas[casilla].color);
	}else{
		checkcarcel(casilla);
	}
}
function caer_suerte(){
	var rand_suerte = Math.round(Math.random()*14+1);
	if(rand_suerte < 10){
		rand_suerte = "0"+rand_suerte;
	}
	if(suertes["2"+rand_suerte].propietario == 0){
		eval(suertes["2"+rand_suerte].funcion);
	}else{
		caer_suerte();
	}
}
function caer_comunidad(){
	var rand_comunidad = Math.round(Math.random()*14+1);
	if(rand_comunidad < 10){
		rand_comunidad = "0"+rand_comunidad;
	}
	if(comunidades["1"+rand_comunidad].propietario == 0){		
		eval(comunidades["1"+rand_comunidad].funcion);
	}else{
		caer_comunidad();
	}
}
function caer(casilla){
	switch(casilla){
		case '0':
			actualizar_dinero("+", cobrar);
			break;
		case '1':
			casilla_normal(casilla);
			break;
		case '2':
			caer_comunidad();
			break;
		case '3':
			casilla_normal(casilla);
			break;
		case '4':
			var pago = Math.round(yo.dinero / 10);
			partida_informar(yo.nombre+" cayó en "+casillas[casilla].nombre+" y pagó "+pago+"€ al bote central", yo.id);
			actualizar_casilla_datos('20', 'casas', (parseInt(casillas['20'].casas) + parseInt(pago)));
			actualizar_dinero("-", pago);
			alertar("homescreen.png", "Oh vaya!", "Has caído en "+casillas[casilla].nombre+" y has pagado "+pago+"€.");
			break;
		case '5':
			casilla_normal(casilla);
			break;
		case '6':
			casilla_normal(casilla);
			break;
		case '7':
			caer_suerte();
			break;
		case '8':
			casilla_normal(casilla);
			break;
		case '9':
			casilla_normal(casilla);
			break;
		case '10':
			break;
		case '11':
			casilla_normal(casilla);
			break;
		case '12':
			casilla_normal(casilla);
			break;
		case '13':
			casilla_normal(casilla);
			break;
		case '14':
			casilla_normal(casilla);
			break;
		case '15':
			casilla_normal(casilla);
			break;
		case '16':
			casilla_normal(casilla);
			break;
		case '17':
			caer_comunidad();
			break;
		case '18':
			casilla_normal(casilla);
			break;
		case '19':
			casilla_normal(casilla);
			break;
		case '20':
			partida_informar(yo.nombre+" ha caído en "+casillas[casilla].nombre+" y se ha encontrado "+casillas[casilla].casas+"€", yo.id);
			actualizar_casilla_datos(casilla, 'casas', '0');
			actualizar_dinero("+", casillas[casilla].casas);
			alertar("parkinggratuito.png", "Enhorabuena", "Has caído en "+casillas[casilla].nombre+" y te has encontrado "+casillas[casilla].casas+"€.");
			break;
		case '21':
			casilla_normal(casilla);
			break;
		case '22':
			caer_suerte();
			break;
		case '23':
			casilla_normal(casilla);
			break;
		case '24':
			casilla_normal(casilla);
			break;
		case '25':
			casilla_normal(casilla);
			break;
		case '26':
			casilla_normal(casilla);
			break;
		case '27':
			casilla_normal(casilla);
			break;
		case '28':
			casilla_normal(casilla);
			break;
		case '29':
			casilla_normal(casilla);
			break;
		case '30':
			alacarcel();
			alertar("policia.png", "Detenido", "A la cárcel, sin pasar por la casilla de salida y sin cobrar 200€.");
			break;
		case '31':
			casilla_normal(casilla);
			break;
		case '32':
			casilla_normal(casilla);
			break;
		case '33':
			caer_comunidad();
			break;
		case '34':
			casilla_normal(casilla);
			break;
		case '35':
			casilla_normal(casilla);
			break;
		case '36':
			caer_suerte();
			break;
		case '37':
			casilla_normal(casilla);
			break;
		case '38':
			var pago = 100;
			partida_informar(yo.nombre+" cayó en "+casillas[casilla].nombre+" y pagó "+pago+"€ al bote central", yo.id);
			actualizar_casilla_datos('20', 'casas', (parseInt(casillas['20'].casas) + pago));
			actualizar_dinero("-", pago);
			alertar("homescreen.png", "Oh vaya!", "Has caído en "+casillas[casilla].nombre+" y has pagado "+pago+"€.");
			break;
		case '39':
			casilla_normal(casilla);
			break;
	}
}
function comprarcalle(id){
	$("#mensajes").html("<div id='tarjeta2'><h1>Opción de Compra</h1><p>Tienes "+jugadores[yo.posicion].dinero+"€ y la oportunidad de comprar "+casillas[id].nombre+" por "+casillas[id].precio+"€. ¿Desea comprarla?</p><br /></div>");
	
	/* Compañía eléctrica y agua */
	if(id == 12 || id == 28){ 
		$("#tarjeta2").append("<table><tr><td class='titulo'><center>"+casillas[id].nombre+"</center></td></tr><tr><td class='centro'>Si se posee UNA Compañía, el Alquiler es 4 veces el número salido en los dados.</td></tr><tr><br /></tr><tr><td class='centro'>Si se poseen DOS Compañías, el Alquiler es 10 veces el número salido en los dados.</td></tr><tr><td><br /></td></tr><tr><td class='centro'>Hipoteca: "+(casillas[id].precio)/2+"€</td></tr></table>");
	}
	
	/* Estaciones */
	else if(id == 5 || id == 15 || id == 25 || id == 35){ 
		$("#tarjeta2").append("<table class='titulo'><tr><td><center>"+casillas[id].nombre+"</center></td></tr></table><table><tr><td>1 Estación:</td><td class='derecha'>"+casillas[id].casas0+"€</td></tr><tr><td>2 Estaciones:</td><td class='derecha'>"+casillas[id].casas1+"€</td></tr><tr><td>3 Estaciones:</td><td class='derecha'>"+casillas[id].casas2+"€</td></tr><tr><td>4 Estaciones:</td><td class='derecha'>"+casillas[id].casas3+"€</td></tr><tr><td><br /></td><td class='derecha'><br /></td></tr><tr><td><br /></td><td class='derecha'><br /></td></tr><tr><td><br /></td><td><br /></td></tr><tr><td>Hipoteca:</td><td class='derecha'>"+(casillas[id].precio)/2+"€</td></tr></table>");
	}
	
	/* Calles normales */
	else{
		$("#tarjeta2").append("<table bgcolor='"+casillas[id].color+"' class='titulo'><tr><td><center>"+casillas[id].nombre+"</center></td></tr></table><table><tr><td>Sin casas:</td><td class='derecha'>"+casillas[id].casas0+"€</td></tr><tr><td>1 casa:</td><td class='derecha'>"+casillas[id].casas1+"€</td></tr><tr><td>2 casas:</td><td class='derecha'>"+casillas[id].casas2+"€</td></tr><tr><td>3 casas:</td><td class='derecha'>"+casillas[id].casas3+"€</td></tr><tr><td>4 casas:</td><td class='derecha'>"+casillas[id].casas4+"€</td></tr><tr><td>Hotel:</td><td class='derecha'>"+casillas[id].casas5+"€</td></tr><tr><td><br /></td><td><br /></td></tr><tr><td>Hipoteca:</td><td class='derecha'>"+(casillas[id].precio)/2+"€</td></tr></table>");
	}
	
	$("#tarjeta2").append("<br style='clear:both;'/><br style='clear:both;'/><div id='botonera'></div>");
	$("#botonera").append("<a class='boton' href='javascript:comprar("+id+")'>Comprar</a>");
	$("#botonera").append("<a class='boton cancelar' href='javascript:cerrar_alerta()'>Rechazar</a>");
	$("#mensajes").fadeIn("fast");
	
}
function comprar(id){
	actualizar_casilla_datos(id, 'id_propietario', yo.id);
	actualizar_dinero('-', casillas[id].precio);
	partida_informar(yo.nombre+" acaba de comprar "+casillas[id].nombre+" por "+casillas[id].precio+"€", yo.id);
	actualizarinformacion(yo.posicion);
	cerrar_alerta();
}
function checkcarcel(id){
	var propietarioid = 0;
	for(var x in jugadores){
		if(casillas[id].propietario == jugadores[x].id){
			if(jugadores[propietarioid].carcel > 0){
				mensajecarcel(id, jugadores[propietarioid]);
			}else{
				pagar(id, jugadores[propietarioid]);
			}
		}
		propietarioid++;
	}
}
function mensajecarcel(id, propietario){
	partida_informar(yo.nombre+" cayó en "+casillas[id].nombre+", pero no tiene que pagar porque su propietario está en la cárcel.", yo.id);
	$('#mensajes').html("<div id='tarjeta3'><h1>Qué Suerte!</h1><p>Has caído en "+casillas[id].nombre+", que pertenece a "+propietario.nombre+".</p><br /><p>Por suerte "+propietario.nombre+" está en la cárcel, así que no tienes que pagarle nada.</p>");
	$('#tarjeta3').append("<div id='botonera'></div>");
	$('#botonera').append("<a class='boton' href='javascript:cerrar_alerta()'>Aceptar</a>");
	$("#mensajes").fadeIn("fast");
	actualizarinformacion(yo.posicion);
}
function pagar(id, propietario){
	contarcalles(id);
	if(casillas[id].propietario != yo.id){
		
		/*	Si la casilla está hipotecada */
		if(casillas[id].hipotecada == 1){
			partida_informar(yo.nombre+" cayó en "+casillas[id].nombre+", pero no tiene que pagar porque está hipotecada.", yo.id);
			$('#mensajes').html("<div id='tarjeta3'><h1>Qué Suerte!</h1><p>Has caído en "+casillas[id].nombre+", que pertenece a "+propietario.nombre+".</p><br /><p>Por suerte esta casilla está hipotecada, así que no tienes que pagarle nada.</p>");
			$('#tarjeta3').append("<div id='botonera'></div>");
			$('#botonera').append("<a class='boton' href='javascript:cerrar_alerta()'>Aceptar</a>");
			$("#mensajes").fadeIn("fast");
		}
		
		else{
			if(id == 12 || id == 28){
				if(grupocasillas_propietario == 2 && contador_hipotecas == 0){
					var a_pagar = (tirada1 + tirada2) * 10;
				}else{
					var a_pagar = (tirada1 + tirada2) * 4;
				}
				partida_informar(yo.nombre+" cayó en "+casillas[id].nombre+" y pagó "+a_pagar+"€", yo.id);
				actualizar_dinero("-", a_pagar);
				actualizar_dinero_jugador(casillas[id].propietario, "+", a_pagar);
				
				$('#mensajes').html("<div id='tarjeta3'><h1>A Pagar!</h1><p>Has caído en "+casillas[id].nombre+", que pertenece a "+propietario.nombre+".</p><br /><p>Has tenido que pagarle "+a_pagar+"€ por permanecer en dicha propiedad.</p><div id='botonera'><a class='boton' href='javascript:cerrar_alerta()'>Aceptar</a></div></div>'");
				$("#mensajes").fadeIn("fast");
				actualizarinformacion(yo.posicion);
			}
			
			else if(id == 5 || id == 15 || id == 25 || id == 35){
				var a_pagar = grupocasillas_propietario - contador_hipotecas - 1;
				var pago = eval("casillas[id].casas"+a_pagar);
				
				partida_informar(yo.nombre+" cayó en "+casillas[id].nombre+" y pagó "+pago+"€", yo.id);
				actualizar_dinero("-", pago);
				actualizar_dinero_jugador(casillas[id].propietario, "+", pago);
				
				$('#mensajes').html("<div id='tarjeta3'><h1>A Pagar!</h1><p>Has caído en "+casillas[id].nombre+", que pertenece a "+propietario.nombre+".</p><br /><p>Has tenido que pagarle "+pago+"€ por permanecer en dicha propiedad.</p><div id='botonera'><a class='boton' href='javascript:cerrar_alerta()'>Aceptar</a></div></div>'");
				$("#mensajes").fadeIn("fast");
				actualizarinformacion(yo.posicion);
			}
			
			else if(grupocasillas_propietario == grupocasillas_maximo && contador_casas == 0 && contador_hipotecas == 0){
				var a_pagar = casillas[id].casas0 * 2;
				
				partida_informar(yo.nombre+" cayó en "+casillas[id].nombre+" y pagó "+a_pagar+"€", yo.id);
				actualizar_dinero("-", a_pagar);
				actualizar_dinero_jugador(casillas[id].propietario, "+", a_pagar);
				
				$('#mensajes').html("<div id='tarjeta3'><h1>A Pagar!</h1><p>Has caído en "+casillas[id].nombre+", que pertenece a "+propietario.nombre+".</p><br /><p>Has tenido que pagarle "+a_pagar+"€ por permanecer en dicha propiedad.</p><div id='botonera'><a class='boton' href='javascript:cerrar_alerta()'>Aceptar</a></div></div>'");
				$("#mensajes").fadeIn("fast");
				actualizarinformacion(yo.posicion);
			}
			
			else{
				var a_pagar = casillas[id].casas;
				var pago = eval("casillas[id].casas"+a_pagar);
				
				partida_informar(yo.nombre+" cayó en "+casillas[id].nombre+" y pagó "+pago+"€", yo.id);
				actualizar_dinero("-", pago);
				actualizar_dinero_jugador(casillas[id].propietario, "+", pago);
				
				$('#mensajes').html("<div id='tarjeta3'><h1>A Pagar!</h1><p>Has caído en "+casillas[id].nombre+", que pertenece a "+propietario.nombre+".</p><br /><p>Has tenido que pagarle "+pago+"€ por permanecer en dicha propiedad.</p><div id='botonera'><a class='boton' href='javascript:cerrar_alerta()'>Aceptar</a></div></div>'");
				$("#mensajes").fadeIn("fast");
				actualizarinformacion(yo.posicion);
			}
		}
	}
}

/*	Funciones de interacción con las casas */
function construir(id){
	cerrar_alerta();
	setTimeout(function(){
		if(casillas[id].casas == 0){
			$("#mensajes").html("<div id='tarjetacasas'><h1>Construir en "+casillas[id].nombre+"</h1><div id='dibujos'><img id='casa1' src='img/transparente.png'><img id='casa2' src='img/transparente.png'><img id='casa3' src='img/transparente.png'><img id='casa4' src='img/transparente.png'></div><br /><div id='botones'></div><div id='botonera'><a class='boton' href='javascript:cerrar_alerta()'>Cerrar</a></div></div>");
		}
		
		else if(casillas[id].casas == 1){
			$("#mensajes").html("<div id='tarjetacasas'><h1>Construir en "+casillas[id].nombre+"</h1><div id='dibujos'><img id='casa1' src='img/casita.png'><img id='casa2' src='img/transparente.png'><img id='casa3' src='img/transparente.png'><img id='casa4' src='img/transparente.png'></div><br /><div id='botones'></div><div id='botonera'><a class='boton' href='javascript:cerrar_alerta()'>Cerrar</a></div></div>");
		}
		
		else if(casillas[id].casas == 2){
			$("#mensajes").html("<div id='tarjetacasas'><h1>Construir en "+casillas[id].nombre+"</h1><div id='dibujos'><img id='casa1' src='img/casita.png'><img id='casa2' src='img/casita.png'><img id='casa3' src='img/transparente.png'><img id='casa4' src='img/transparente.png'></div><br /><div id='botones'></div><div id='botonera'><a class='boton' href='javascript:cerrar_alerta()'>Cerrar</a></div></div>");
		}
		
		else if(casillas[id].casas == 3){
			$("#mensajes").html("<div id='tarjetacasas'><h1>Construir en "+casillas[id].nombre+"</h1><div id='dibujos'><img id='casa1' src='img/casita.png'><img id='casa2' src='img/casita.png'><img id='casa3' src='img/casita.png'><img id='casa4' src='img/transparente.png'></div><br /><div id='botones'></div><div id='botonera'><a class='boton' href='javascript:cerrar_alerta()'>Cerrar</a></div></div>");
		}
		
		else if(casillas[id].casas == 4){
			$("#mensajes").html("<div id='tarjetacasas'><h1>Construir en "+casillas[id].nombre+"</h1><div id='dibujos'><img id='casa1' src='img/casita.png'><img id='casa2' src='img/casita.png'><img id='casa3' src='img/casita.png'><img id='casa4' src='img/casita.png'></div><br /><div id='botones'></div><div id='botonera'><a class='boton' href='javascript:cerrar_alerta()'>Cerrar</a></div></div>");
		}
		
		else if(casillas[id].casas == 5){
			$("#mensajes").html("<div id='tarjetacasas'><h1>Construir en "+casillas[id].nombre+"</h1><div id='dibujos'><img id='hotel' src='img/hotel.png'></div><br /><div id='botones'></div><div id='botonera'><a class='boton' href='javascript:cerrar_alerta()'>Cerrar</a></div></div>");
		}
		
		$("#mensajes").fadeIn("fast");
		dibujarbotones(id);
	}, 1000);
}
function dibujarbotones(id){
	var contador_propiedades = 0;
	var contador_casas = 0;
	for(var x in casillas){
		if(casillas[x].color == casillas[id].color){
			contador_propiedades++;
		}
		if(casillas[x].casas <= 5 && casillas[x].propietario == yo.id && casillas[x].color == casillas[id].color){
			contador_casas = parseInt(contador_casas) + parseInt(casillas[x].casas);
		}
	}
	
	/*	Comprar y vender */
	if(casillas[id].casas > 0 && casillas[id].casas < 5 && jugadores[yo.posicion].dinero > 0 && casillas[id].casas == (contador_casas / contador_propiedades)){
		$("#botones").html("<a class='boton comprar' href='javascript:ponercasa("+id+")'>Comprar (-"+casillas[id].construccion+"€)</a><a class='boton vender cancelar' href='javascript:quitarcasa("+id+")'>Vender (+"+(casillas[id].construccion/2)+"€)</a>");
	}
	
	/*	Comprar */
	else if(casillas[id].casas < 5 && jugadores[yo.posicion].dinero > 0 && casillas[id].casas <= (contador_casas / contador_propiedades)){ 
		$("#botones").html("<a class='boton comprar' href='javascript:ponercasa("+id+")'>Comprar (-"+casillas[id].construccion+"€)</a>");
	}
	
	/*	Vender */
	else if(casillas[id].casas >= 5 || (casillas[id].casas > 0  && (casillas[id].casas >= (contador_casas / contador_propiedades)))){ 
		$("#botones").html("<a class='boton vender cancelar' href='javascript:quitarcasa("+id+")'>Vender (+"+(casillas[id].construccion/2)+"€)</a>");
	}
	
}
function ponercasa(id){
	actualizar_dinero("-", casillas[id].construccion);
	actualizar_casilla_datos(id, 'casas', (parseInt(casillas[id].casas) + 1));
	$(".boton.comprar").each(function(){
		$(this).remove();
	});
	$(".boton.vender").each(function(){
		$(this).remove();
	});
	
	casillas[id].casas++;	
	if(casillas[id].casas <= 4){
		$("#casa"+casillas[id].casas).attr("src", "img/casita.png");
	}else{
		$("#dibujos").html("<img id='hotel' src='img/hotel.png'>");
	}
	
	actualizarinformacion(yo.posicion);
	dibujarbotones(id);
}
function quitarcasa(id){
	actualizar_dinero("+", Math.round(casillas[id].construccion / 2));
	actualizar_casilla_datos(id, 'casas', (parseInt(casillas[id].casas) - 1));
	$(".boton.comprar").each(function(){
		$(this).remove();
	});
	$(".boton.vender").each(function(){
		$(this).remove();
	});
	
	if(casillas[id].casas < 5){
		$("#casa"+casillas[id].casas).attr("src", "img/transparente.png");
	}else{
		$("#dibujos").html("<img id='casa1' src='img/casita.png'><img id='casa2' src='img/casita.png'><img id='casa3' src='img/casita.png'><img id='casa4' src='img/casita.png'>");
	}
	casillas[id].casas--;
	
	actualizarinformacion(yo.posicion);
	dibujarbotones(id);
}

/*	Funciones de interacción con las propiedades */
function hipotecar(id){
	cerrar_alerta();
	setTimeout(function(){
		if(contador_casas != 0){
			alertar("eliminar.png", "¡No puedes!", "Tienes casas en alguna casilla de este grupo. Debes quitarlas todas antes de hipotecar "+casillas[id].nombre+".");
		
		}else{
			actualizar_casilla_datos(id, 'hipotecada', 1);
			actualizar_dinero('+', Math.round(casillas[id].precio / 2));
			$('#mensajes').html("<div id='tarjeta3'><h1>Hipotecado</h1><p>Has hipoteacado "+casillas[id].nombre+".</p><br /><p>A cambio has recibido "+(casillas[id].precio / 2)+"€, pero si alguien cae aquí no tendrá que pagarte nada.</p><div id='botonera'><a class='boton' href='javascript:cerrar_alerta()'>Aceptar</a></div></div>'");
			$('#mensajes').fadeIn("fast");
		}
		actualizarinformacion(yo.posicion);
	}, 1000);
}
function deshipotecar(id){
	cerrar_alerta();
	setTimeout(function(){
		actualizar_casilla_datos(id, 'hipotecada', 0);
		actualizar_dinero('-', Math.round(casillas[id].precio / 2));
		$('#mensajes').html("<div id='tarjeta3'><h1>Deshipotecado</h1><p>Has pagado tu hipoteca por "+casillas[id].nombre+".</p><br /><p>A cambio los jugadores que caigan aquí volverán a pagarte la cantidad correspondiente.</p><div id='botonera'><a class='boton' href='javascript:cerrar_alerta()'>Aceptar</a></div></div>'");
		$('#mensajes').fadeIn("fast");
		actualizarinformacion(yo.posicion);
	}, 1000);
}

/*	Funciones de interacción con los negocios */
function estado_cargando(){
	var temp = $("#mensajes").children();
	temp.fadeOut("fast", function(){
		temp.animate({
			"width": "40px",
			"height": "40px", 
			"margin-left": "-20px",
			"margin-top": "-20px"
		}, function(){
			temp.html('<img src="img/loading.gif" />');
			temp.fadeIn("fast");
		});
	});
}
function estado_esperando(jugador){
	var temp = $("#mensajes").children();
	temp.fadeOut("fast", function(){
		temp.css("top", "50%");
		temp.css("left", "50%");
		temp.animate({
			"width": "250px",
			"height": "80px", 
			"margin-left": "-125px",
			"margin-top": "-40px"
		}, function(){
			temp.html('<p>Esperando respuesta...</p>');
			temp.append('<div id="botonera"><a id="cancelar_mensaje" class="boton cancelar" href="javascript:cerrar_alerta()">Cancelar</a></div>');
			temp.fadeIn("fast");
			
			$("#cancelar_mensaje").click(function(){
				partida_informar(jugadores[jugador].nombre+" ha retirado su oferta."),
				$.ajax({
					type : 'get',
					url : 'funciones/ajax_monopoly.php',
					dataType : 'json', 
					data : {
						'id_usuario' : yo.id,
						'deshacer_negocio': true,
					},
					complete : function(response){
					},
					success : function(response){
						setTimeout(function(){
							actualizarinformacion(yo.posicion);
						}, 1000);
						actualizar_datos_usuario = true;
						estado_partida(yo.id);
					}
				});
			});
			
		});
	});
}

function agregar_calle_propia(id_calle){	
	$("#fila"+id_calle).hide();
	if(id_calle < 113){
		if(casillas[id_calle].color != "#ffffff" && casillas[id_calle].color != "#000000" && casillas[id_calle].color != "transpa"){
			if(casillas[id_calle].hipotecada == 0){
				$("#propuesta_propia").append("<tr id='fila"+id_calle+"_2'><td class='flecha'><a id='"+id_calle+"' class='boton' href='javascript:quitar_calle_propia("+id_calle+")'> < </a></td><td class='nombre' style='background: "+casillas[id_calle].color+"'>"+casillas[id_calle].nombre+"</td></tr>");
			}else{
				$("#propuesta_propia").append("<tr id='fila"+id_calle+"_2'><td class='flecha'><a id='"+id_calle+"' class='boton' href='javascript:quitar_calle_propia("+id_calle+")'> < </a></td><td class='nombre' style='background: "+casillas[id_calle].color+"; text-decoration:line-through;'>"+casillas[id_calle].nombre+"</td></tr>");
			}
			
		}else{
			if(casillas[id_calle].hipotecada == 0){
				$("#propuesta_propia").append("<tr id='fila"+id_calle+"_2'><td class='flecha'><a id='"+id_calle+"' class='boton' href='javascript:quitar_calle_propia("+id_calle+")'> < </a></td><td class='nombre'>"+casillas[id_calle].nombre+"</td></tr>");
			}else{
				$("#propuesta_propia").append("<tr id='fila"+id_calle+"_2'><td class='flecha'><a id='"+id_calle+"' class='boton' href='javascript:quitar_calle_propia("+id_calle+")'> < </a></td><td class='nombre' style='text-decoration:line-through;'>"+casillas[id_calle].nombre+"</td></tr>");
			}
		}
	}else{
		$("#propuesta_propia").append("<tr id='fila"+id_calle+"_2'><td class='flecha'><a id='"+id_calle+"' class='boton' href='javascript:quitar_calle_propia("+id_calle+")'> < </a></td><td class='nombre'>Tarjeta libre de cárcel</td></tr>");
	}
	$("#form_oferta").append('<input type="hidden" id="ofertas_calle'+id_calle+'" name="ofertas_calle[]" value="'+id_calle+'" />');
}
function quitar_calle_propia(id_calle){
	$("#fila"+id_calle).show();
	$("#fila"+id_calle+"_2").remove();
	$("#ofertas_calle"+id_calle).remove();
}
function agregar_calle_elegido(id_calle){
	$("#fila"+id_calle).hide();
	if(id_calle < 113){
		if(casillas[id_calle].color != "#ffffff" && casillas[id_calle].color != "#000000" && casillas[id_calle].color != "transpa"){
			if(casillas[id_calle].hipotecada == 0){
				$("#propuesta_elegido").append("<tr id='fila"+id_calle+"_2'><td class='nombre' style='background: "+casillas[id_calle].color+"'>"+casillas[id_calle].nombre+"</td><td class='flecha'><a id='"+id_calle+"' class='boton' href='javascript:quitar_calle_elegido("+id_calle+")'> > </a></td></tr>");
			}else{
				$("#propuesta_elegido").append("<tr id='fila"+id_calle+"_2'><td class='nombre' style='background: "+casillas[id_calle].color+"; text-decoration:line-through;'>"+casillas[id_calle].nombre+"</td><td class='flecha'><a id='"+id_calle+"' class='boton' href='javascript:quitar_calle_elegido("+id_calle+")'> > </a></td></tr>");
			}
		}else{
			if(casillas[id_calle].hipotecada == 0){
				$("#propuesta_elegido").append("<tr id='fila"+id_calle+"_2'><td class='nombre'>"+casillas[id_calle].nombre+"</td><td class='flecha'><a id='"+id_calle+"' class='boton' href='javascript:quitar_calle_elegido("+id_calle+")'> > </a></td></tr>");
			}else{
				$("#propuesta_elegido").append("<tr id='fila"+id_calle+"_2'><td class='nombre' style='text-decoration:line-through;'>"+casillas[id_calle].nombre+"</td><td class='flecha'><a id='"+id_calle+"' class='boton' href='javascript:quitar_calle_elegido("+id_calle+")'> > </a></td></tr>");
			}
		}
	}else{
		$("#propuesta_elegido").append("<tr id='fila"+id_calle+"_2'><td class='nombre'>Tarjeta libre de cárcel</td><td class='flecha'><a id='"+id_calle+"' class='boton' href='javascript:quitar_calle_elegido("+id_calle+")'> > </a></td></tr>");
	}
	
	$("#form_oferta").append('<input type="hidden" id="reclamos_calle'+id_calle+'" name="reclamos_calle[]" value="'+id_calle+'" />');
	
}
function quitar_calle_elegido(id_calle){
	$("#fila"+id_calle).show();
	$("#fila"+id_calle+"_2").remove();
	$("#reclamos_calle"+id_calle).remove();
}
function negociar_dinero(jugador){

	/*	Detecta el jugador con quien queremos negociar */
	for(var x in jugadores){
		if(jugadores[x].id == jugador){
			jugador = x;
		}
	}

	/*	Dineros iniciales */
	var dinero_inicial = new Array();
	dinero_inicial['yo'] = parseInt(jugadores[yo.posicion].dinero);
	dinero_inicial['elegido'] = parseInt(jugadores[jugador].dinero);
	
	/*	Dineros tramitados */
	var dinero_a_quitar = new Array();
	if($("#ofertas_dinero_propio").val() != ""){
		dinero_a_quitar['yo'] = parseInt($("#ofertas_dinero_propio").val());
	}else{
		dinero_a_quitar['yo'] = 0;
	}
	if($("#reclamos_dinero_elegido").val() != ""){
		dinero_a_quitar['elegido'] = parseInt($("#reclamos_dinero_elegido").val());
	}else{
		dinero_a_quitar['elegido'] = 0;
	}
	
	/*	Dinero final */
	var dinero_total = new Array();
	dinero_total['yo'] = dinero_inicial['yo'] + dinero_a_quitar['elegido'] - dinero_a_quitar['yo'];
	dinero_total['elegido'] = dinero_inicial['elegido'] + dinero_a_quitar['yo'] - dinero_a_quitar['elegido'];
	
	/*	Escribe los valores */
	$("#dinero_actual_propio").html(dinero_total['yo']);
	$("#dinero_actual_elegido").html(dinero_total['elegido']);
}

function aceptar_cambio(jugador){
	estado_esperando(jugador);

	for(var x in jugadores){
		if(jugadores[x].id == jugador){
			var temp_origen = x;
		}
	}

	partida_informar(yo.nombre+" acaba de hacerle una oferta a "+jugadores[temp_origen].nombre+". Esperando a que terminen.", yo.id);
	var temp_ofertas = new Array();
	var x = 1;
	var temp_reclamos = new Array();
	var y = 1;
	if($("#ofertas_dinero_propio").val() != ""){
		temp_ofertas[0] = parseInt($("#ofertas_dinero_propio").val());
	}else{
		temp_ofertas[0] = 0;
	}
	if($("#reclamos_dinero_elegido").val() != ""){
		temp_reclamos[0] = parseInt($("#reclamos_dinero_elegido").val());
	}else{
		temp_reclamos[0] = 0;
	}
	
	$("#form_oferta").children("input").each(function(){
		if($(this).attr("type") == "hidden" && $(this).attr("name") == "ofertas_calle[]"){
			temp_ofertas[x] = $(this).attr("id").replace("ofertas_calle", "");
			x++;
		}
		if($(this).attr("type") == "hidden" && $(this).attr("name") == "reclamos_calle[]"){
			temp_reclamos[y] = $(this).attr("id").replace("reclamos_calle", "");
			y++;
		}
	});
	
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : yo.id,
			'elegido': jugador,
			'ofertas': temp_ofertas,
			'reclamos': temp_reclamos
		},
		complete : function(response){
		},
		success : function(response){
		}
	});
}

function negociar(){
	var temp_botones = ""
	for(var x in jugadores){
		if(jugadores[x].id != yo.id && jugadores[x].carcel < 1){
			temp_botones += '<input type="button" class="boton elegir" id="'+jugadores[x].id+'" value="'+jugadores[x].nombre+'" />';
		}
	}
	
	if(temp_botones != ""){
	
		$("#mensajes").html("<div id='negociador'><div id='neg_contenido'><h1>Negociar</h1><p>¿Con quién quiere negociar?</p><br /><center id='botones'></center></div></div>");
		$("#botones").append(temp_botones);
		$("#botones").append('<a id="cancelar_mensaje" class="boton cancelar" href="javascript:cerrar_alerta()">Cancelar</a>');
		
		$(".elegir").each(function(){
			$(this).click(function(){
			
				var elegido = $(this).attr("id");
				
				for(var x in jugadores){
					if(jugadores[x].id == elegido){
						var elegido_pos = x;
					}
				}
				
				$("#neg_contenido").fadeOut("fast", function(){
					$("#neg_contenido").html("");
					$("#negociador").animate({
						"width": "40px",
						"margin-left": "-20px",
						"height": "40px",
						"margin-top": "-20px"
					}, "fast", function(){
					
						$("#neg_contenido").html("<img src='img/loading.gif' />");
						$("#neg_contenido").fadeIn("fast");
						
						var temp_propio = "";
						var temp_elegido = "";
						for(var y in casillas){
							contarcalles(casillas[y].id);
							
							/*	Si soy el propietario de la calle */
							if(casillas[y].propietario == yo.id){
								if(casillas[y].color != "#000000" && casillas[y].color != "#ffffff" && casillas[y].color != "transpa" && (contador_casas <= 0 && contador_hoteles <= 0)){
									if(casillas[y].hipotecada == 0){
										temp_propio += "<tr id='fila"+casillas[y].id+"'><td class='nombre' style='background: "+casillas[y].color+"'>"+casillas[y].nombre+"</td><td class='flecha'><a class='boton' id='"+casillas[y].id+"' href='javascript:agregar_calle_propia("+casillas[y].id+")'> > </a></td></tr>";
									}else{
										temp_propio += "<tr id='fila"+casillas[y].id+"'><td class='nombre' style='background: "+casillas[y].color+"; text-decoration:line-through;'>"+casillas[y].nombre+"</td><td class='flecha'><a class='boton' id='"+casillas[y].id+"' href='javascript:agregar_calle_propia("+casillas[y].id+")'> > </a></td></tr>";
									}
								}else if(contador_casas <= 0 && contador_hoteles <= 0){
									if(casillas[y].hipotecada == 0){
										temp_propio += "<tr id='fila"+casillas[y].id+"'><td class='nombre'>"+casillas[y].nombre+"</td><td class='flecha'><a class='boton' id='"+casillas[y].id+"' href='javascript:agregar_calle_propia("+casillas[y].id+")'> > </a></td></tr>";
									}else{
										temp_propio += "<tr id='fila"+casillas[y].id+"'><td class='nombre' style='text-decoration:line-through;'>"+casillas[y].nombre+"</td><td class='flecha'><a class='boton' id='"+casillas[y].id+"' href='javascript:agregar_calle_propia("+casillas[y].id+")'> > </a></td></tr>";
									}
								}
							}
							
							/*	Si la calle es del otro negociante */
							else if(casillas[y].propietario == elegido){
								if(casillas[y].color != "#000000" && casillas[y].color != "#ffffff" && casillas[y].color != "transpa" && (contador_casas <= 0 && contador_hoteles <= 0)){
									if(casillas[y].hipotecada == 0){
										temp_elegido += "<tr id='fila"+casillas[y].id+"'><td class='flecha'><a class='boton' id='"+casillas[y].id+"' href='javascript:agregar_calle_elegido("+casillas[y].id+")'> < </a></td><td class='nombre' style='background: "+casillas[y].color+"'>"+casillas[y].nombre+"</td></tr>";
									}else{
										temp_elegido += "<tr id='fila"+casillas[y].id+"'><td class='flecha'><a class='boton' id='"+casillas[y].id+"' href='javascript:agregar_calle_elegido("+casillas[y].id+")'> < </a></td><td class='nombre' style='background: "+casillas[y].color+"; text-decoration:line-through;'>"+casillas[y].nombre+"</td></tr>";
									}
								}else if(contador_casas <= 0 && contador_hoteles <= 0){
									if(casillas[y].hipotecada == 0){
										temp_elegido += "<tr id='fila"+casillas[y].id+"'><td class='flecha'><a class='boton' id='"+casillas[y].id+"' href='javascript:agregar_calle_elegido("+casillas[y].id+")'> < </a></td><td class='nombre'>"+casillas[y].nombre+"</td></tr>";
									}else{
										temp_elegido += "<tr id='fila"+casillas[y].id+"'><td class='flecha'><a class='boton' id='"+casillas[y].id+"' href='javascript:agregar_calle_elegido("+casillas[y].id+")'> < </a></td><td class='nombre' style='text-decoration:line-through;'>"+casillas[y].nombre+"</td></tr>";
									}
								}
							}
						}
						
						/*	Si soy el propietario de la tarjeta */
						if(comunidades["113"].propietario == yo.id){
							temp_propio += "<tr id='fila"+comunidades['113'].id+"'><td class='nombre'>Tarjeta libre de cárcel</td><td class='flecha'><a class='boton' id='"+comunidades['113'].id+"' href='javascript:agregar_calle_propia("+comunidades['113'].id+")'> > </a></td></tr>";
						}
						
						/*	Si la tarjeta es del otro negociante */
						else if(comunidades["113"].propietario == elegido){
							temp_elegido += "<tr id='fila"+comunidades['113'].id+"'><td class='flecha'><a class='boton' id='"+comunidades['113'].id+"' href='javascript:agregar_calle_elegido("+comunidades['113'].id+")'> < </a></td><td class='nombre'>Tarjeta libre de cárcel</td></tr>";
						}
						
						if(temp_propio == ""){
							temp_propio = "<tr><td colspan='2'>No hay calles</td></tr>";
						}
						if(temp_elegido == ""){
							temp_elegido = "<tr><td colspan='2'>No hay calles</td></tr>";
						}
						
						temp_propio = '<tr><td colspan="2" class="dinero">Dinero: <span id="dinero_actual_propio">'+yo.dinero+'</span> €</td></tr>' + temp_propio;
						temp_elegido = '<tr><td colspan="2" class="dinero">Dinero: <span id="dinero_actual_elegido">'+jugadores[elegido_pos].dinero+'</span> €</td></tr>' + temp_elegido;
						
						$("#neg_contenido").fadeOut("fast", function(){
							var ancho = (window.innerWidth * 0.9) - 50;
							var alto = (window.innerHeight * 0.9) - 50;
							$("#neg_contenido").html("");
							
							$("#neg_contenido").append('<table id="calles_propias" class="izquierda"></table>');
							$("#calles_propias").append('<tr><th colspan="2">'+yo.nombre+'</th></tr>');
							$("#neg_contenido").append('<table id="propuesta_propia" class="izquierda"></table>');
							$("#propuesta_propia").append('<tr><th colspan="2">Ofreces</th></tr>');
							
							$("#neg_contenido").append('<table id="calles_elegido" class="derecha"></table>');
							$("#calles_elegido").append('<tr><th colspan="2">'+jugadores[elegido_pos].nombre+'</th></tr>');
							$("#neg_contenido").append('<table id="propuesta_elegido" class="derecha"></table>');
							$("#propuesta_elegido").append('<tr><th colspan="2">Reclamas</th></tr>');
							
							$("#calles_propias").append(temp_propio);
							$("#calles_elegido").append(temp_elegido);
							
							$("#propuesta_propia").append('<tr><td colspan="2"><span class="negociador">Dinero: </span><input type="text" class="negociador" id="ofertas_dinero_propio" name="ofertas_dinero_propio" value="" onkeyup="javascript:negociar_dinero('+elegido+')" /><span class="negociador">€</span></td></tr>');
							$("#propuesta_elegido").append('<tr><td colspan="2"><span class="negociador">Dinero: </span><input type="text" class="negociador" id="reclamos_dinero_elegido" name="reclamos_dinero_elegido" value="" onkeyup="javascript:negociar_dinero('+elegido+')" /><span class="negociador">€</span></td></tr>');
							
							$("#negociador").append('<div id="botonera"><a id="aceptar_mensaje" class="boton" href="javascript:aceptar_cambio('+elegido+')">Aceptar</a><a id="cancelar_mensaje" class="boton cancelar" href="javascript:cerrar_alerta()">Cancelar</a></div>');
							
							/*	Formulario donde se recogerán los datos */
							$("#neg_contenido").append('<form id="form_oferta" action="" method="POST"></form>');
							
							$("#negociador").animate({
								"left": "0px",
								"width": ancho,
								"margin-left": "5%",
								"top": "0px",
								"height": alto,
								"margin-top": "2.5%"
							}, "fast", function(){
								$("#neg_contenido").fadeIn("fast");
							});
						});
					});
				});
			})
		});
		
		$("#negociador").css({"width": "auto", "height": "auto"});
		var ancho = $("#negociador").css("width");
		var alto = $("#negociador").css("height");
		$("#negociador").css("margin-top", (alto / 2 * (-1)));
		$("#negociador").css("margin-left", (ancho / 2 * (-1)));
		
		$("#mensajes").fadeIn("fast");
		
	}else{
		alertar("eliminar.png", "", "Ahora mismo no puedes negociar con nadie.");
	}
}

function aceptar_negocio(id_negocio){
	estado_cargando();
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : yo.id,
			'aceptar_negocio': id_negocio
		},
		complete : function(response){
		},
		success : function(response){
			cerrar_alerta();
			if(response['estado_neg'] == '1'){
				partida_informar(yo.nombre+" ha aceptado la oferta.", yo.id);
			}
			actualizar_datos_usuario = true;
			estado_partida(yo.id);
			setTimeout(function(){
				actualizarinformacion(yo.posicion);
			}, 1000);
		}
	});
}
function cancelar_negocio(id_negocio){
	estado_cargando();
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : yo.id,
			'rechazar_negocio': id_negocio
		},
		complete : function(response){
		},
		success : function(response){
			cerrar_alerta();
			if(response['estado_neg'] == '1'){
				partida_informar(yo.nombre+" ha rechazado la oferta.", yo.id);
			}
			actualizar_datos_usuario = true;
			estado_partida(yo.id);
		}
	});
}
function eliminar_negocio(id_negocio){
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : yo.id,
			'eliminar_negocio': id_negocio
		},
		complete : function(response){
		},
		success : function(response){
			setTimeout(function(){
				actualizarinformacion(yo.posicion);
			}, 1000);
			actualizar_datos_usuario = true;
			estado_partida(yo.id);
		}
	});
}
function alertar_negocio(negocio){
	for(var x in jugadores){
		if(jugadores[x].id == negocio['origen']){
			var temp_origen = x;
		}
	}
	
	var oferta = negocio['oferta'].split("-");
	var temp = oferta['0'].split(":");
	oferta['0'] = temp['1']+"€";
	
	var reclamo = negocio['reclamo'].split("-");
	var temp = reclamo['0'].split(":");
	reclamo['0'] = temp['1']+"€";
	
	$("#mensajes").html("<div id='tarjeta_negocio'><h1>Oferta de compra/venta</h1><p>"+jugadores[temp_origen].nombre+" te ha hecho la siguiente oferta de compra/venta.</p><div id='oferta'></div><div id='botonera'><a class='boton' href='javascript:aceptar_negocio("+negocio['id_negociacion']+")'>Aceptar</a><a class='boton cancelar' href='javascript:cancelar_negocio("+negocio['id_negociacion']+")'>Rechazar</a></div></div>");
	
	$("#oferta").append('<table id="oferta_negocio" class="negocio izquierda"><tr><th>Ofrece</th></tr></table>');
	$("#oferta").append('<table id="reclamo_negocio" class="negocio derecha"><tr><th>Solicita</th></tr></table>');
	
	for(var x in oferta){
		if(x == '0'){
			$("#oferta_negocio").append('<tr><td>'+oferta[x]+'</td></tr>');
			
		}else if(oferta[x] > 100){
			$("#oferta_negocio").append('<tr><td>Tarjeta libre de cárcel</td></tr>');
		
		}else if(x != '0' && oferta[x] < 100 && casillas[oferta[x]].color != "#000000"){
			if(casillas[oferta[x]].hipotecada == 0){
				$("#oferta_negocio").append('<tr><td style="background: '+casillas[oferta[x]].color+';">'+casillas[oferta[x]].nombre+'</td></tr>');
			}else{
				$("#oferta_negocio").append('<tr><td style="background: '+casillas[oferta[x]].color+'; text-decoration: line-through;">'+casillas[oferta[x]].nombre+'</td></tr>');
			}
			
		}else{
			if(casillas[oferta[x]].hipotecada == 0){
				$("#oferta_negocio").append('<tr><td>'+casillas[oferta[x]].nombre+'</td></tr>');
			}else{
				$("#oferta_negocio").append('<tr><td style="text-decoration: line-through;">'+casillas[oferta[x]].nombre+'</td></tr>');
			}
		}
	}
	for(var x in reclamo){
		if(x == '0'){
			$("#reclamo_negocio").append('<tr><td>'+reclamo[x]+'</td></tr>');
			
		}else if(reclamo[x] > 100){
			$("#reclamo_negocio").append('<tr><td>Tarjeta libre de cárcel</td></tr>');
		
		}else if(x != '0' && reclamo[x] < 100 && casillas[reclamo[x]].color != "#000000"){
			if(casillas[reclamo[x]].hipotecada == 0){
				$("#reclamo_negocio").append('<tr><td style="background: '+casillas[reclamo[x]].color+';">'+casillas[reclamo[x]].nombre+'</td></tr>');
			}else{
				$("#reclamo_negocio").append('<tr><td style="background: '+casillas[reclamo[x]].color+'; text-decoration: line-through;">'+casillas[reclamo[x]].nombre+'</td></tr>');
			}
			
		}else{
			if(casillas[reclamo[x]].hipotecada == 0){
				$("#reclamo_negocio").append('<tr><td>'+casillas[reclamo[x]].nombre+'</td></tr>');
			}else{
				$("#reclamo_negocio").append('<tr><td style="text-decoration: line-through;">'+casillas[reclamo[x]].nombre+'</td></tr>');
			}
		}
	}
	
	sonar("turno");
	$("#mensajes").fadeIn("fast", function(){
		var ancho = $("#tarjeta_negocio").width();
		var alto = $("#tarjeta_negocio").height();
	
		var left = (parseInt(ancho) / 2 * (-1));
		var top = (parseInt(alto) / 2 * (-1));
		
		$("#tarjeta_negocio").animate({
			"margin-top": top,
			"margin-left": left
		}, "fast");
	});
}

/*	Funciones de victorias y derrotas */
function rendirse(){
	rendicion_anotada = true;
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : yo.id,
			'derrota' : true
		},
		complete : function(response){
		},
		success : function(response){
			sonar("derrota");
			document.title = "Perdiste! - Monopoly Online 2.0";
			partida_informar(yo.nombre+" cayó en bancarrota y se ha rendido.");
			menu_espectador();
		}
	});
}
function partida_anotar_victoria(){
	actualizar_datos_usuario = false;
	victoria_anotada = true;
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : yo.id,
			'victoria' : true
		},
		complete : function(response){
		},
		success : function(response){
			alertar("homescreen.png", "Enhorabuena", "Te has hecho con el monopolio del tablero y has ganado la partida.");
			sonar("victoria");
			document.title = "Ganaste! - Monopoly Online 2.0";
			partida_informar(yo.nombre+" ha ganado la partida ¡Felicidades!");
			mostrar_informacion(yo.nombre+" ha ganado la partida ¡Felicidades!");
			menu_espectador();
		}
	});
}

/*	Funciones de actualización de estado */
function estado_partida(id_usuario){
	if(actualizar_datos_usuario == true){
		$.ajax({
			type : 'get',
			url : 'funciones/ajax_monopoly.php',
			dataType : 'json', 
			data : {
				'id_usuario' : id_usuario,
				'chat': true
			},
			complete : function(response){
				setTimeout(function(){ estado_partida(id_usuario); }, 500);
			},
			success : function(response){
				sys_hora = response['hora'];
				sys_version = response['version'];
				
				$("#reloj_server").html(sys_hora);
				
				if(response['yo']){
					mi_nombre_cuenta = response['yo']['nombre_cuenta'];
					yo2 = response['yo'];
				}
				
				if(response['ticket']){
					ticket = response['ticket'];
					if(ticket['respuesta'] != '' && ticket['leido'] == '0' && ticket_alertando == false){
						ticket_alertando = true;
						sonar("chat");
						ticket_alertar();
						
					}else if(ticket['leido'] != '0'){
						ticket_alertando = false;
						ticket_restaurar();
					}
				}
				
				if(response['yo']['estado_mesa'] == 1 && /partida/.test(document.location.href) == false){
					actualizar_datos_usuario = false;
					$('#mensajes').append('<div id="tarjeta2"></div>');
					$('#tarjeta2').append('<h1>Allá vamos</h1>');
					$('#tarjeta2').append('<p>La partida va a empezar. Suerte!</p>');
					$('#tarjeta2').append('<iframe style="position: relative; display: block; float: left; width: 100%; height: 300px; overflow: hidden; border: 0px solid #ffffff;" src="js/adsense_bloque.html"></iframe>');
					$('#mensajes').fadeIn("fast");
					sonar("empezar");
					document.title = "Empezando - Monopoly Online 2.0";
					setTimeout(function(){
						document.location = "/partida";
					}, 5000);
				}
				
				else if(response['yo']['mesa'] != 'null' && /partida/.test(document.location.href) == false && $("#partida_chat").size() >= 1){
					partida_actualizar_chat(response);
				}
				
				else if((response['yo']['mesa'] == 'null' || !response['yo']['mesa']) && (/partida/.test(document.location.href) || /entrar_mesa/.test(document.location.href))){
					actualizar_datos_usuario = false;
					expulsar();
				}
				
				else if(/partida/.test(document.location.href)){
					id_partida = response['yo']['mesa'];
					notificaciones = response['partida']['notificaciones'];
					
					/*	Si hay una denuncia por ausencia */
					if(response['denuncia'] && yo != false){
						var denuncia = response['denuncia'];
						for(var x in jugadores){
							if(jugadores[x].id == denuncia['denunciado']){
								var pos_denunciado = x;
							}
						}
						
						/*	Si soy yo el denunciado */
						if(denuncia['denunciado'] == yo.id && denuncia['estado'] == '0' && denuncia_activada == false){
							denuncia_activada = true;
							
							sonar("empezar");
							
							$("#mensajes2").html("<div id='tarjeta'><img src='img/homescreen.png'><h1>Atención</h1><p>Algún jugador sospecha que estás ausente, por favor, confirma que estás activo.</p><div id='botonera'><a id='aceptar_mensaje' class='boton' href='javascript:cerrar_alerta2()'>Aceptar</a></div></div>");
							$("#mensajes2").fadeIn("fast");
							
							$("#aceptar_mensaje").click(function(){
								$.ajax({
									type : 'get',
									url : 'funciones/ajax_monopoly.php',
									dataType : 'json', 
									data : {
										'id_usuario' : yo.id,
										'responder_denuncia' : true,
										'partida' : id_partida,
										'denunciado' : id_usuario
									},
									complete : function(response){
									},
									success : function(response){
										denuncia_contador = 46;
									}
								});
							});
						}
						
						/*	Si no soy yo el denunciado y la denuncia no ha sido respondida */
						else if(denuncia['denunciado'] != yo.id && denuncia['estado'] == '0' && denuncia_activada == false){
							denuncia_activada = true;
							
							$("#mensajes2").html("<div id='tarjeta'><h1>Ausentes</h1><p>Esperando a que "+jugadores[x].nombre+" responda a la denuncia por ausencia.</p><br /><p id='contador'>"+denuncia_contador+" segundos</p></div>");
							$("#mensajes2").fadeIn("fast");
							
							/*	Funcion que cuenta el tiempo de espera para la ausencia */
							function contar_tiempo(){
								denuncia_contador--;
								
								if(denuncia_contador >= 0){
									$("#contador").html(denuncia_contador+" segundos");
									
									if(denuncia_contador > 0 && denuncia_activada == true){
										setTimeout(function(){
											contar_tiempo();
										}, 1000);
									}
									
									/*	Si el contador llega a cero */
									else if(denuncia_contador == 0){
									
										actualizar_datos_usuario = false;
										denuncia_expulsar(denuncia['denunciado']);
										denuncia_eliminar(denuncia['id_partida'], denuncia['denunciado']);
										denuncia_contador = 46;
										$("#mensajes2").fadeOut("fast", function(){
											$("#mensajes2").html("<div id='tarjeta'><h1>Ausentes</h1><p>"+jugadores[pos_denunciado].nombre+" fue declarado ausente y se ha eliminado de la partida.</p><div id='botonera'><a id='aceptar_mensaje' class='boton' href='javascript:cerrar_alerta2()'>Aceptar</a></div></div>");
											$("#mensajes2").fadeIn("fast");
										
											$("#aceptar_mensaje").click(function(){
												
												denuncia_activada = false;
												actualizar_datos_usuario = true;
												estado_partida(yo.id);
											});
										});
									}
								
								}
							}
							contar_tiempo();
						}
						
						/*	Si la denuncia fue respondida */
						else if(denuncia['estado'] != '0'){
						
							/*	Si no soy yo el denunciado */
							if(denuncia['denunciado'] != yo.id){
								actualizar_datos_usuario = false;
								$("#mensajes2").fadeOut("fast", function(){
									$("#mensajes2").html("<div id='tarjeta'><h1>Ausentes</h1><p>"+jugadores[pos_denunciado].nombre+" ha respondido la denuncia, por lo que no se encuentra ausente.</p><div id='botonera'><a id='aceptar_mensaje' class='boton' href='javascript:cerrar_alerta2()'>Aceptar</a></div></div>");
									$("#mensajes2").fadeIn("fast");
								
									$("#aceptar_mensaje").click(function(){
										
										denuncia_eliminar(denuncia['id_partida'], denuncia['denunciado']);
										actualizar_datos_usuario = true;
										estado_partida(yo.id);
									});
								});
							
							}
							denuncia_activada = false;
							denuncia_contador = 46;
						}
					}
					
					/*	Si hay una invitación para negociar */
					if(response['invitacion_negocio'] && !response['negocio_aceptado']){
						actualizar_datos_usuario = false;
						alertar_negocio(response['invitacion_negocio']);
					}
					
					/*	Si hay una notificación de negocio exitoso */
					else if(response['negocio_aceptado']){
						actualizar_datos_usuario = false;
						cerrar_alerta();
						setTimeout(function(){
							alertar("homescreen.png", "Aceptado", "El usuario aceptó tu trato.");
							$("#aceptar_mensaje").click(function(){
								console.log("clic");
								eliminar_negocio(response['negocio_aceptado']['id_negociacion']);
							});
						}, 500);
					}
					
					/*	Si hay una notificación de negocio fallido */
					else if(response['negocio_rechazado']){
						actualizar_datos_usuario = false;
						cerrar_alerta();
						setTimeout(function(){
							alertar("eliminar.png", "Rechazado", "El usuario rechazó tu trato.");
							$("#aceptar_mensaje").click(function(){
								console.log("clic");
								eliminar_negocio(response['negocio_rechazado']['id_negociacion']);
							});
						}, 500);
					}
					
					/*	Si no hay ninguna invitación */
					else{
					
						/*	Definien los objetos de jugadores */
						var temp = response['partida']['jugadores'];
						if(jugadores == false || sizeof(jugadores) != sizeof(temp)){
							if(jugadores != false){
								for(var x in jugadores){
									borrar_fichas(jugadores);
								}
							}
						
							jugadores = new Array();
							for(var x in temp){
								var temp_avatar = new Ficha(temp[x]['id_avatar'], temp[x]['avatar_jugador'])
								jugadores[x] = new Jugador(temp[x]['id_jugador'], temp[x]['nombre_jugador'], temp_avatar, temp[x]['casilla'], temp[x]['dinero'], temp[x]['carcel'], temp[x]['jugando'], x, temp[x]['administrador'], temp[x]['rango'], temp[x]['color']);
							}
						}
						
						/*	Actualiza los objetos de los jugadores */
						else{						
							for(var x in jugadores){
								if(jugadores[x].casilla != temp[x]['casilla']){
									temp[x]['posicion'] = jugadores[x].posicion;
									mover_ficha(temp[x]);
								}
								jugadores[x].dinero = temp[x]['dinero'];
								jugadores[x].carcel = temp[x]['carcel'];
								jugadores[x].jugando = temp[x]['jugando'];
								
								if(jugadores[x].id == yo.id){
									yo.posicion = x;
								}
							}
						}

						/*	Si no se definieron los objetos de las casillas, los crea */
						if(casillas == false){
							var temp = response['partida']['propiedades'];
							casillas = new Array(40);
							for(var x in temp){
								casillas[x] = new Casilla(temp[x]['id_casilla'], temp[x]['nombre'], temp[x]['id_propietario'], temp[x]['precio'], temp[x]['precio_construccion'], temp[x]['casas'], temp[x]['0casas'], temp[x]['1casas'], temp[x]['2casas'], temp[x]['3casas'], temp[x]['4casas'], temp[x]['5casas'], temp[x]['color'], temp[x]['hipotecada']);
							}
						}
						
						/*	Si ya estan definidas, actualiza los objetos de las casillas */
						else{
							var temp = response['partida']['propiedades'];
							for(var x in temp){
								if(casillas[x].propietario != temp[x]['id_propietario'])
									casillas[x].propietario = temp[x]['id_propietario'];
									
								if(casillas[x].casas != temp[x]['casas'])
									casillas[x].casas = temp[x]['casas'];
									redibujartablero();
									
								if(casillas[x].hipotecada != temp[x]['hipotecada'])
									casillas[x].hipotecada = temp[x]['hipotecada'];
							}
						}
						
						/*	Si no se definieron los objetos de las suertes, los crea */
						if(suertes == false){
							var temp = response['partida']['suertes'];
							suertes = new Array(15);
							for(var x in temp){
								suertes[x] = new Suerte(temp[x]['id_tarjeta'], temp[x]['mensaje'], x, temp[x]['propietario'], temp[x]['funcion']);
							}
						}
						
						/*	Si ya estan definidas, actualiza los objetos de las suertes */
						else{
							var temp = response['partida']['suertes'];
							for(var x in temp){
								if(suertes[x].propietario != temp[x]['propietario'])
									suertes[x].propietario = temp[x]['propietario'];
							}
						}
						
						/*	Si no se definieron los objetos de las comunidades, los crea */
						if(comunidades == false){
							var temp = response['partida']['comunidades'];
							comunidades = new Array(15);
							for(var x in temp){
								comunidades[x] = new Comunidad(temp[x]['id_tarjeta'], temp[x]['mensaje'], x, temp[x]['propietario'], temp[x]['funcion']);
							}
						}
						
						/*	Si ya estan definidas, actualiza los objetos de las comunidades */
						else{
							var temp = response['partida']['comunidades'];
							for(var x in temp){
								if(comunidades[x].propietario != temp[x]['propietario'])
									comunidades[x].propietario = temp[x]['propietario'];
							}
						}
						
						/*	Comprueba si alguien está jugando */
						for(var x in jugadores){
							if(jugadores[x].jugando != '0'){
								turno = jugadores[x].id_jugador;
							}
							
							if(jugadores[x].id == response['yo']['id_usuario']){
								yo = jugadores[x];
							}
						}
						
						/*	Si nadie está jugando, inicia la partida */
						if(turno == false){
							if(partida_empezada == false){
								partida_informar("Bienvenidos a una partida de Monopoly. Empieza a jugar "+jugadores['0'].nombre, jugadores['0'].id+".");
							}
							actualizar_turno(jugadores['0'].id, "1", true);
						}
						
						/*	Si alguien está jugando */
						else{
							
							/*	Coloca las fichas por primera vez */
							if(partida_empezada == false){
								actualizarinformacion(yo.posicion);
								colocar_fichas(response);
							}
							
							/*	Marca como empezada la partida */
							partida_empezada = true;
						
							/*	Obtiene los datos del jugador al que le toca jugar */
							turno = new Array();
							for(var x in jugadores){
								if(jugadores[x].jugando != "0"){
									turno = jugadores[x];
								}
							}
							
							/*	Si es mi turno */
							if(sizeof(jugadores) > 1 && yo.id == turno.id && turno.jugando != '0' && victoria_anotada == false){
								if(!alerta_usada){
									sonar("turno");
									alerta_usada = true;
									document.title = "Tu turno - Monopoly Online 2.0";
								}
								partida_turno(yo.id);
							}
							
							/*	Si está jugando otro jugador */
							else{
								alerta_usada = false;
								document.title = "Juega "+turno.nombre+" - Monopoly Online 2.0";
								if($("#mensaje_estado").height() < 100){
									mostrar_informacion(response['partida']['notificacion']);
								}
							}
						}
						
						/*	Si solo queda un jugador, y soy yo, gano la partida */
						if(sizeof(jugadores) == 1 && jugadores['0'].id == yo.id && victoria_anotada == false){
							partida_anotar_victoria();
						}
						
						partida_actualizar_nombres();
						partida_actualizar_chat(response);
					}
				}
			}
		});
	}
}
function partida_actualizar_nombres(){
	for(var x = 0; x <= 3; x++){
		$('#partida_numero_jugadores').html(sizeof(jugadores));
		
		if(sizeof(jugadores) >= (x+1)){
			$("#jugador"+(x+1)).html('<div id="jugador'+(x+1)+'b" class="info_mostrar" onmouseover="javascript:actualizarinformacion('+x+', false)" onmouseout="javascript:actualizarinformacion('+yo.posicion+')" onclick="javascript:menu_jugador('+x+')"></div>');
			
			if(jugadores[x]['administrador'] >= 1){
				$("#jugador"+(x+1)+"b").append('<h2 id="jugador'+(x+1)+'_nombre" style="color: '+jugadores[x].color+';">'+jugadores[x].rango+' '+jugadores[x].nombre+'</h2>');
			}else{
				$("#jugador"+(x+1)+"b").append('<h2 id="jugador'+(x+1)+'_nombre">'+jugadores[x].nombre+'</h2>');
			}
			$("#jugador"+(x+1)+"b").append('<p id="jugador'+(x+1)+'_dinero">'+jugadores[x].dinero+'€</p>');
			$("#jugador"+(x+1)+"b").append('<img class="fichas" id="jugador'+(x+1)+'_avatar" src="avatares/'+jugadores[x].avatar.ruta+'.png" />');
		}else{
			$("#jugador"+(x+1)).html('');
		}
	}
}
function partida_actualizar_chat(response){

	/*	Actualiza el scroll del chat */
	if(temp_ultimo_mensaje < sizeof(response['chat'])){
		$('#chat_contenedor').animate(
			{scrollTop: $('#chat_contenido').height()},
			"fast"
		);
	}
	
	/*	Muestra el botón de "Sentarse en la mesa "*/
	if(response['yo']['mesa'] != 'null' && response['yo']['estado_mesa'] == '0' && /entrar_mesa/.test(document.location.href) == false){
		if($("#partida_chat").width() > 200){
			var nuevo_ancho = $("#partida_chat").width() - 151;
			$("#enlace_mesa a.boton").attr("href", "/entrar_mesa-"+response['yo']['mesa']+"-Sentarse");
			$("#chat_escribir").animate({'width': nuevo_ancho}, "fast");
			$("#enlace_mesa").show();
			$("#enlace_mesa").animate({'width': 149}, "fast");
		}
	}

	/*	Actualiza la lista de jugadores y espectadores que están en el chat */
	var temp = "";
	for(var x in response['partida']['jugadores']){
		var usr =  response['partida']['jugadores'][x];
		
		var temp_estado = usr['estado'].replace("img/", "");
		temp_estado = temp_estado.replace(".png", "");
		if(temp_estado == "online-aus"){
			temp_estado = "ausente";
		}
		
		temp += "<p onclick='javascript:menu_jugador(\""+usr['nombre_jugador']+"\");' style='cursor: default!important;'><img class='icono' src='http://www.imperdiblesoft.com/img/tipos_cuenta/"+usr['nombre_tipo_cuenta_jugador']+".png' /> ";
			if(usr['administrador'] >= 1){
				temp += '<span style="color: '+usr['color']+';"> '+usr['rango']+' ';;
			}
				temp += usr['nombre_jugador'];
			if(usr['administrador'] >= 1){
				temp += '</span>';
			}
			temp += "<img class='indicador explicacion' alt='Este usuario está "+temp_estado+"' src='"+usr['estado']+"' />";
		temp += "</p>";
	}
	for(var x in response['partida']['espectadores']){
		var usr =  response['partida']['espectadores'][x];
		
		temp += "<p onclick='javascript:menu_jugador(\""+usr['nombre_espectador']+"\");' style='cursor: default!important;'><img class='icono' src='http://www.imperdiblesoft.com/img/tipos_cuenta/"+usr['nombre_tipo_cuenta_espectador']+".png' /> ";
			if(usr['administrador'] >= 1){
				temp += '<span style="color: '+usr['color']+';"> '+usr['rango']+' ';;
			}
				temp += usr['nombre_espectador'];
			if(usr['administrador'] >= 1){
				temp += '</span>';
			}
		temp += "</p>";
	}
	$("#chat_lista_usuarios_ul").html(temp);
	
	/*	Actualiza la lista de mensajes */
	for(var x = 1; x < sizeof(response['chat'])+1; x++){
		if(temp_ultimo_mensaje < x || temp_ultimo_mensaje == false){
			var msg = response['chat'][x-1];
			temp = "";
			temp += "<p>";
				temp += "("+msg['hora']+") ";
				if(msg['administrador'] >= 1){
					temp += "<span style='color: "+msg['color']+";'><b>"+msg['rango']+" "+msg['origen']+"</b></span>";
				}else{
					temp += "<b>"+msg['origen']+"</b>";
				}
				temp += ": "+emoticons(msg['mensaje']);
			temp += "</p>";
			
			sonar("chat");
			if($("#partida_chat").height() < 50){
				$('#chat_titulo').css("background", "OrangeRed");
			}
			$('#chat_contenido').append(temp);
			temp_ultimo_mensaje = x;
		}
	}
	
	$(".explicacion").each(function(){
		$(this).mouseenter(function(){
		
			/*	Establece la posición del aviso */
			var top = parseInt($(this).offset().top) + (parseInt($(this).height())/2) + (parseInt($(this).css("marginTop").replace('px', ''))/2) + (parseInt($(this).css("padding-top").replace('px', ''))/2);
			var left = parseInt($(this).offset().left) + parseInt($(this).width()) + parseInt($(this).css("padding-right").replace('px', '')) + parseInt($(this).css("marginRight").replace('px', ''));
						
			$("body").append("<div class='flecha'></div><div id='explicacion' class='explicacion'></div>");
			$("#explicacion").html($(this).attr("alt"));
		
			if(($(window).width() - left) <= 250){
				top = 0;
				left = 0;
				$(".flecha").css("border-top", "0px solid #222");
				$(".flecha").css("border-bottom", "10px solid #222");
				$(".flecha").css("border-right", "10px solid transparent");
				$(".flecha").css("border-left", "10px solid transparent");
				
				var top_flecha = parseInt($(this).offset().top) + parseInt($(this).height()) + parseInt($(this).css("padding-top").replace('px', '')) + parseInt($(this).css("marginTop").replace('px', '')) - 3;
				var left_flecha = parseInt($(this).offset().left) + (parseInt($(this).width()) / 2) - 10;
				$("#explicacion").css("text-align", "right");
				
				top = top_flecha + 10;
				left = parseInt($(this).offset().left) + parseInt($(this).width()) - $("#explicacion").width() - 20;
				$("#explicacion").css("text-align", "right");
				
			}else{
				$(".flecha").css("border-top", "10px solid transparent");
				$(".flecha").css("border-bottom", "10px solid transparent");
				$(".flecha").css("border-right", "10px solid #222");
				$(".flecha").css("border-left", "0px solid transparent");
				
				var top_flecha = top - 5;
				var left_flecha = left;
				
				top = top - ($("#explicacion").height() / 2) - 5;
				left = left + 5;
			}
			
			$("#explicacion").css("top", (top - ($("#explicacion").height() / 2 ) - 5));
			$("#explicacion").css("left", (left + 5));
			$(".flecha").css("top", top_flecha);
			$(".flecha").css("left", left_flecha);
			
			$("#explicacion").fadeIn("fast");
			$(".flecha").fadeIn("fast");
			
		}).mouseleave(function(){
			$("#explicacion").fadeOut("fast");
			$("#explicacion").remove();
			$(".flecha").remove();
		});
	});
}

function actualizarinformacion(jugador, alerta){
	if(jugador != null && $("#datosjugador").height() <= 420){
		var algunacalle = 0;
		document.body.style.cursor="default";
		
		var temp = "";
		temp += "<p>Posición: "+casillas[jugadores[jugador].casilla].nombre+"<br />";
		
		for(i=0; i<=39; i++){
			if(casillas[i].propietario == jugadores[jugador].id){
				algunacalle++;
			}
		}
		
		if(algunacalle != 0){
			temp += "<h1>Calles</h1>";
			for(i=0; i<=39; i++){
				if(casillas[i].propietario == jugadores[jugador].id){
					if(casillas[i].color != "transpa" && casillas[i].color != "#000000" && casillas[i].color != "#ffffff"){
						if(casillas[i].hipotecada == 1){
							temp += "<a href='javascript:infocasilla("+i+")'><p style='color:"+casillas[i].color+";text-decoration:line-through;'>"+casillas[i].nombre+"</p></a>";
						
						}else{
							temp += "<a href='javascript:infocasilla("+i+")'><p style='color:"+casillas[i].color+"'>"+casillas[i].nombre+"</p></a>";
						
						}
					}else{
						if(casillas[i].hipotecada == 1){
							temp += "<a href='javascript:infocasilla("+i+")'><p style='color: #ffffff; text-decoration:line-through;'>"+casillas[i].nombre+"</p></a>";
						
						}else{
							temp += "<a href='javascript:infocasilla("+i+")'><p style='color: #ffffff;'>"+casillas[i].nombre+"</p></a>";
						
						}
					}
				}
			}
		}
		
		temp += "<br />";
		if(comunidades["113"].propietario == jugadores[jugador].id){ 
			temp += "<p><a href='javascript:infocasilla("+comunidades["113"].id+")' style='color: white;'>'Queda libre de la cárcel'</a></p><br />";
		}
		
		$("#datosjugador").html(temp);
		redibujartablero();
	}
}
function actualizar_dinero(operacion, cantidad){
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario': yo.id,
			'actualizar_dinero': true,
			'operacion': operacion,
			'cantidad': cantidad
		},
		complete : function(response){
		},
		success : function(response){
		}
	});
}
function actualizar_dinero_jugador(jugador, operacion, cantidad){
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario': yo.id,
			'actualizar_dinero_jugador': true,
			'jugador': jugador,
			'operacion': operacion,
			'cantidad': cantidad
		},
		complete : function(response){
		},
		success : function(response){
		}
	});
}
function actualizar_datos_jugador(clave, valor){
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario': yo.id,
			'actualizar_jugador': true,
			'clave': clave,
			'valor': valor
		},
		complete : function(response){
		},
		success : function(response){
		}
	});
}
function actualizar_casilla_datos(id_casilla, clave, valor){
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : yo.id,
			'actualizar_datos': true,
			'id_casilla': id_casilla,
			'clave' : clave,
			'valor' : valor
		},
		complete : function(response){
		},
		success : function(response){
			actualizarinformacion(yo.posicion);
		}
	});
}
function actualizar_tarjeta_propietario(id_usuario, id_tarjeta){
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : yo.id,
			'actualizar_tarjeta_propietario': true,
			'id_propietario' : id_usuario,
			'id_tarjeta': id_tarjeta
		},
		complete : function(response){
		},
		success : function(response){
			actualizarinformacion(yo.posicion);
		}
	});
}
function redibujartablero(){
	if($("#datosjugador").height() <= 420){
		for(var x=0; x<=39; x++){
			if(x!=0 && x!=2 && x!=4 && x!=5 && x!=7 && x!=10 && x!=12 && x!=15 && x!=17 && x!=20 && x!=22 && x!=25 && x!=28 && x!=30 && x!=33 && x!=35 && x!=36 && x!=38){
				if(casillas[x].hipotecada == 0){
					$("#casilla"+x).css("background", "url(img/"+(x+1)+"-"+casillas[x].casas+".jpg)no-repeat");
				}else{
					if((x >= 1 && x <=9) || (x >= 21 && x <= 29)){
						$("#casilla"+x).css("background", "url(img/hipotecada-0.jpg)no-repeat");
					}else if((x >= 11 && x <=19) || (x >= 31 && x <= 39)){
						$("#casilla"+x).css("background", "url(img/hipotecada-1.jpg)no-repeat");
					}
				}
				
			}else if(x == 7 || x == 22){
				$("#casilla"+x).css("background", "url(img/suerte.jpg)no-repeat");
				
			}else if(x == 36){
				$("#casilla"+x).css("background", "url(img/suerte2.jpg)no-repeat");
			
			}else if(x == 17 || x == 33){
				$("#casilla"+x).css("background", "url(img/comunidad2.jpg)no-repeat");
				
			}else if(x == 2){
				$("#casilla"+x).css("background", "url(img/comunidad.jpg)no-repeat");
				
			}else{
				if(casillas[x].hipotecada == 0){
					$("#casilla"+x).css("background", "url(img/"+(x+1)+"-0.jpg)no-repeat");
				}else{
					if((x >= 1 && x <=9) || (x >= 21 && x <= 29)){
						$("#casilla"+x).css("background", "url(img/hipotecada-0.jpg)no-repeat");
					}else if((x >= 11 && x <=19) || (x >= 31 && x <= 39)){
						$("#casilla"+x).css("background", "url(img/hipotecada-1.jpg)no-repeat");
					}
				}
			}
		}
	}
}
function redibujartablero2(){
	for(var x=0; x<=39; x++){
		if(x!=0 && x!=2 && x!=4 && x!=5 && x!=7 && x!=10 && x!=12 && x!=15 && x!=17 && x!=20 && x!=22 && x!=25 && x!=28 && x!=30 && x!=33 && x!=35 && x!=36 && x!=38){
			if(casillas[x].hipotecada == 0){
				$("#casilla"+x).css("background", "url(img/"+(x+1)+"-"+casillas[x].casas+".jpg)no-repeat");
			}else{
				if((x >= 1 && x <=9) || (x >= 21 && x <= 29)){
					$("#casilla"+x).css("background", "url(img/hipotecada-0.jpg)no-repeat");
				}else if((x >= 11 && x <=19) || (x >= 31 && x <= 39)){
					$("#casilla"+x).css("background", "url(img/hipotecada-1.jpg)no-repeat");
				}
			}
			
		}else if(x == 7 || x == 22){
			$("#casilla"+x).css("background", "url(img/suerte.jpg)no-repeat");
			
		}else if(x == 36){
			$("#casilla"+x).css("background", "url(img/suerte2.jpg)no-repeat");
		
		}else if(x == 17 || x == 33){
			$("#casilla"+x).css("background", "url(img/comunidad2.jpg)no-repeat");
			
		}else if(x == 2){
			$("#casilla"+x).css("background", "url(img/comunidad.jpg)no-repeat");
			
		}else{
			if(casillas[x].hipotecada == 0){
				$("#casilla"+x).css("background", "url(img/"+(x+1)+"-0.jpg)no-repeat");
			}else{
				if((x >= 1 && x <=9) || (x >= 21 && x <= 29)){
					$("#casilla"+x).css("background", "url(img/hipotecada-0.jpg)no-repeat");
				}else if((x >= 11 && x <=19) || (x >= 31 && x <= 39)){
					$("#casilla"+x).css("background", "url(img/hipotecada-1.jpg)no-repeat");
				}
			}
		}
	}
}

function ver_notficaciones(){
	$("#titulo").hide("fast");
	$("#jugador1").hide("fast");
	$("#jugador2").hide("fast");
	$("#jugador3").hide("fast");
	$("#jugador4").hide("fast");
	$("#datosjugador").hide("fast", function(){
		$("#jugadores").css("margin-top", "0px");
		$("#mensaje_estado").css("overflow-y", "auto");
		$("#mensaje_estado").animate({
			"height": "554px"
		}, "normal");
		$("#mensaje_estado").html("");
		for(var x in notificaciones){
			$("#mensaje_estado").prepend("<br /><hr />");
			$("#mensaje_estado").prepend("<p>"+notificaciones[x]+"</p>");
		}
	});
}
function ocultar_notificaciones(){
	$("#mensaje_estado").animate({
		"height": "17px"
	}, "normal", function(){
		$("#mensaje_estado").html("<p>"+notificaciones[sizeof(notificaciones) - 1]+"</p>");
		$("#mensaje_estado").css("height", "auto");
		$("#datosjugador").show("fast");
		$("#jugadores").css("margin-top", "10px");
		$("#jugador4").show("fast");
		$("#jugador3").show("fast");
		$("#jugador2").show("fast");
		$("#jugador1").show("fast");
		$("#titulo").show("fast");
		$("#mensaje_estado").removeAttr("style");
	});
}

function ver_propiedades(jugador){
	$("#titulo").hide("fast");
	$("#jugador1").hide("fast");
	$("#jugador2").hide("fast");
	$("#jugador3").hide("fast");
	$("#jugador4").hide("fast");
	$("#mensaje_estado").hide("fast", function(){
		$("#jugadores").css("margin-top", "0px");
		$("#datosjugador").css("overflow-y", "auto");
		$("#datosjugador").animate({
			"height": "554px"
		}, "normal");
		$("#datosjugador").html("");
		
		var algunacalle = 0;
		document.body.style.cursor="default";
		
		var temp = "";
		temp += "<p>Posición: "+casillas[jugadores[jugador].casilla].nombre+"<br />";
		for(var i in casillas){
			if(casillas[i].propietario == jugadores[jugador].id){
				algunacalle++;
			}
		}
		if(algunacalle != 0){
			temp += "<h1>Calles</h1>";
			for(var i in casillas){
				if(casillas[i].propietario == jugadores[jugador].id){
					if(casillas[i].color != "transpa" && casillas[i].color != "#000000" && casillas[i].color != "#ffffff"){
						if(casillas[i].hipotecada == 1){
							temp += "<a href='javascript:infocasilla("+i+")'><p style='color:"+casillas[i].color+";text-decoration:line-through;'>"+casillas[i].nombre+"</p></a>";
						
						}else{
							temp += "<a href='javascript:infocasilla("+i+")'><p style='color:"+casillas[i].color+"'>"+casillas[i].nombre+"</p></a>";
						
						}
					}else{
						if(casillas[i].hipotecada == 1){
							temp += "<a href='javascript:infocasilla("+i+")'><p style='color: #ffffff; text-decoration:line-through;'>"+casillas[i].nombre+"</p></a>";
						
						}else{
							temp += "<a href='javascript:infocasilla("+i+")'><p style='color: #ffffff;'>"+casillas[i].nombre+"</p></a>";
						
						}
					}
					
				}else{
					$("#casilla"+casillas[i].id).css("background", "transparent");
				}
			}
		}
		temp += "<br />";
		if(comunidades["113"].propietario == jugadores[jugador].id){ 
			temp += "<p><a href='javascript:infocasilla("+comunidades["113"].id+")' style='color: white;'>'Queda libre de la cárcel'</a></p><br />";
		}
		$("#datosjugador").html(temp);
	
		$(".ficha").each(function(){
			$(this).fadeOut("fast");
		});
	});
}
function ocultar_propiedades(){
	redibujartablero2();

	$("#datosjugador").animate({
		"height": "370px"
	}, "normal", function(){
		$("#mensaje_estado").show("fast");
		$("#jugadores").css("margin-top", "10px");
		$("#jugador4").show("fast");
		$("#jugador3").show("fast");
		$("#jugador2").show("fast");
		$("#jugador1").show("fast");
		$("#titulo").show("fast");
		
		$(".ficha").each(function(){
			$(this).fadeIn("fast");
		});
	});
}

/*	Definición de objetos */
function Jugador(jId, jNombre, fAvatar, jCasilla, jDinero, jCarcel, jJugando, jPosicion, jAdmin, jRango, jColor){
	this.id			= jId;
	this.nombre		= jNombre;
	this.avatar		= fAvatar;
	this.casilla	= jCasilla;
	this.dinero		= jDinero;
	this.carcel		= jCarcel;
	this.jugando	= jJugando;
	this.posicion 	= jPosicion;
	this.administrador 	= jAdmin;
	this.rango	 	= jRango;
	this.color	 	= jColor;
}
function Casilla(cId, cNombre, cPropietario, cPrecio, cConstruccion, cCasas, cCasas0, cCasas1, cCasas2, cCasas3, cCasas4, cCasas5, cColor, cHipotecada){
	this.id				= cId;
	this.nombre			= utf8_decode(cNombre);
	this.propietario	= cPropietario;
	this.precio			= cPrecio;
	this.construccion	= cConstruccion;
	this.casas			= cCasas;
	this.casas0			= cCasas0;
	this.casas1			= cCasas1;
	this.casas2			= cCasas2;
	this.casas3			= cCasas3;
	this.casas4			= cCasas4;
	this.casas5			= cCasas5;
	this.color			= cColor;
	this.hipotecada		= cHipotecada;
}
function Suerte(sId, sMensaje, sOrden, sPropietario, sFuncion){
	this.id				= sId;
	this.mensaje		= utf8_decode(sMensaje);
	this.orden			= sOrden;
	this.propietario	= sPropietario;
	this.funcion		= sFuncion;
}
function Comunidad(sId, sMensaje, sOrden, sPropietario, sFuncion){
	this.id				= sId;
	this.mensaje		= utf8_decode(sMensaje);
	this.orden			= sOrden;
	this.propietario	= sPropietario;
	this.funcion		= sFuncion;
}
function Ficha(fId, fRuta){
	this.id		= fId;
	this.ruta	= fRuta;
}

/*---- TARJETAS DE SUERTE ----*/
function suerte01(){
	var id_suerte = "201";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" avanzó hasta "+casillas[0].nombre+".", yo.id);
		actualizar_dinero("+", cobrar);
		actualizar_datos_jugador("casilla", 0);
		caer(0);
	});
}
function suerte02(){
	var id_suerte = "202";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" pagó 150€ por gastos escolares.", yo.id);
		actualizar_dinero("-", 150);
		actualizar_casilla_datos(20, 'casas', (parseInt(casillas[20].casas) + 150));
	});
}
function suerte03(){
	var id_suerte = "203";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" avanzó hasta "+casillas[39].nombre+".", yo.id);
		actualizar_datos_jugador("casilla", 39);
		caer(39);
	});
}
function suerte04(){
	var id_suerte = "204";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" pagó 15€ por exceso de velocidad.", yo.id);
		actualizar_dinero("-", 15);
		actualizar_casilla_datos(20, 'casas', (parseInt(casillas[20].casas) + 15));
	});
}
function suerte05(){ /*	Vaya a la cárcel */
	var id_suerte = "205";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" va a la cárcel.", yo.id);
		alacarcel();
	});
}
function suerte06(){
	var id_suerte = "206";
	if(jugadores[yo.posicion].casilla < 31){
		partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
		alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
		$("#aceptar_mensaje").click(function(){
			partida_informar(yo.nombre+" avanzó hasta "+casillas[24].nombre+".", yo.id);
			actualizar_datos_jugador("casilla", 24);
			caer(24);
		});
	}else{
		partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
		alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
		$("#aceptar_mensaje").click(function(){
			partida_informar(yo.nombre+" avanzó hasta "+casillas[24].nombre+" y cobró "+cobrar+"€ al pasar por la "+casillas[0].nombre+".", yo.id);
			actualizar_dinero("+", cobrar);
			actualizar_datos_jugador("casilla", 24);
			caer(24);
		});
	}
}
function suerte07(){
	var id_suerte = "207";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar("La banca arroja un dividendo y "+yo.nombre+" cobra 50€.", yo.id);
		actualizar_dinero("+", 50);
	});
}
function suerte08(){
	var id_suerte = "208";
	var contador_casas = 0;
	var contador_hoteles = 0;
	for(var x in casillas){
		if(casillas[x].casas < 5 && casillas[x].propietario == yo.id){
			contador_casas = parseInt(contador_casas) + parseInt(casillas[x].casas);
		}
		if(casillas[x].casas == 5 && casillas[x].propietario == yo.id){
			contador_hoteles++;
		}
	}
	var multa_casas = 40 * parseInt(contador_casas);
	var multa_hoteles = 110 * parseInt(contador_hoteles);
	var multa = parseInt(multa_casas) +  parseInt(multa_hoteles);
	
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" pagó "+multa+"€ por reparaciones en sus casas y hoteles.", yo.id);
		actualizar_dinero("-", multa);
		actualizar_casilla_datos(20, 'casas', (parseInt(casillas[20].casas) + multa));
	});
}
function suerte09(){
	var id_suerte = "209";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" retrocede 3 casillas.", yo.id);
		actualizar_datos_jugador("casilla", (parseInt(jugadores[yo.posicion].casilla) - 3));
		caer((parseInt(jugadores[yo.posicion].casilla) - 3));
	});
}
function suerte10(){
	var id_suerte = "210";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" pagó 20€ por ir hebrio.", yo.id);
		actualizar_dinero("-", 20);
		actualizar_casilla_datos(20, 'casas', (parseInt(casillas[20].casas) + 20));
	});
}
function suerte11(){
	var id_suerte = "211";
	if(jugadores[yo.posicion].casilla < 16){
		partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
		alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
		$("#aceptar_mensaje").click(function(){
			partida_informar(yo.nombre+" avanzó hasta "+casillas[16].nombre+".", yo.id);
			actualizar_datos_jugador("casilla", 16);
			caer(16);
		});
	}else{
		partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
		alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
		$("#aceptar_mensaje").click(function(){
			partida_informar(yo.nombre+" avanzó hasta "+casillas[16].nombre+" y cobró "+cobrar+"€ al pasar por la "+casillas[0].nombre+".", yo.id);
			actualizar_dinero("+", cobrar);
			actualizar_datos_jugador("casilla", 16);
			caer(16);
		});
	}
}
function suerte12(){
	var id_suerte = "212";
	var contador_casas = 0;
	var contador_hoteles = 0;
	for(var x in casillas){
		if(casillas[x].casas < 5 && casillas[x].propietario == yo.id){
			contador_casas = parseInt(contador_casas) + parseInt(casillas[x].casas);
		}
		if(casillas[x].casas == 5 && casillas[x].propietario == yo.id){
			contador_hoteles++;
		}
	}
	var multa_casas = 25 * parseInt(contador_casas);
	var multa_hoteles = 100 * parseInt(contador_hoteles);
	var multa = parseInt(multa_casas) +  parseInt(multa_hoteles);
	
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" pagó "+multa+"€ por reparaciones en sus casas y hoteles.", yo.id);
		actualizar_dinero("-", multa);
		actualizar_casilla_datos(20, 'casas', (parseInt(casillas[20].casas) + multa));
	});
}
function suerte13(){
	var id_suerte = "213";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" cobró 150€ del préstamo de su inmueble.", yo.id);
		actualizar_dinero("+", 150);
	});
}
function suerte14(){
	var id_suerte = "214";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" ganó el premio de palabras cruzadas y cobró 100€.", yo.id);
		actualizar_dinero("+", 100);
	});
}
function suerte15(){
	var id_suerte = "215";
	if(jugadores[yo.posicion].casilla < 11){
		partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
		alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
		$("#aceptar_mensaje").click(function(){
			partida_informar(yo.nombre+" avanzó hasta "+casillas[11].nombre+".", yo.id);
			actualizar_datos_jugador("casilla", 11);
			caer(11);
		});
	}else{
		partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
		alertar("logo-suerte.png", "Suerte", suertes[id_suerte].mensaje);
		$("#aceptar_mensaje").click(function(){
			partida_informar(yo.nombre+" avanzó hasta "+casillas[11].nombre+" y cobró "+cobrar+" al pasar por "+casillas[0].nombre+".", yo.id);
			actualizar_dinero("+", cobrar);
			actualizar_datos_jugador("casilla", 11);
			caer(11);
		});
	}
}

/*---- TARJETAS DE COMUNIDAD ----*/
function comunidad01(){
	var id_comunidad = "101";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-cajacomunidad.png", "Caja de comunidad", comunidades[id_comunidad].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" avanzó hasta "+casillas[1].nombre+" y cobró "+cobrar+" al pasar por "+casillas[0].nombre+".", yo.id);
		actualizar_dinero("+", cobrar);
		actualizar_datos_jugador("casilla", 1);
		caer(1);
	});
}
function comunidad02(){
	var id_comunidad = "102";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-cajacomunidad.png", "Caja de comunidad", comunidades[id_comunidad].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" cobró una herencia de 100€.", yo.id);
		actualizar_dinero("+", 100);
	});
}
function comunidad03(){
	var id_comunidad = "103";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-cajacomunidad.png", "Caja de comunidad", comunidades[id_comunidad].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" pagó 50€ por asistencia médica.", yo.id);
		actualizar_dinero("-", 50);
		actualizar_casilla_datos(20, 'casas', (parseInt(casillas[20].casas) + 50));
	});
}
function comunidad04(){
	var id_comunidad = "104";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-cajacomunidad.png", "Caja de comunidad", comunidades[id_comunidad].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" ganó el 2º premio de belleza, y gana 10€.", yo.id);
		actualizar_dinero("+", 10);
	});
}
function comunidad05(){
	var id_comunidad = "105";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-cajacomunidad.png", "Caja de comunidad", comunidades[id_comunidad].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" recibe 25€ como intereses de un préstamo.", yo.id);
		actualizar_dinero("+", 25);
	});
}
function comunidad06(){
	var id_comunidad = "106";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-cajacomunidad.png", "Caja de comunidad", comunidades[id_comunidad].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" pagó 50€ por su póliza de seguros.", yo.id);
		actualizar_dinero("-", 50);
		actualizar_casilla_datos(20, 'casas', (parseInt(casillas[20].casas) + 50));
	});
}
function comunidad07(){
	var id_comunidad = "107";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-cajacomunidad.png", "Caja de comunidad", comunidades[id_comunidad].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" pagó 100€ al Hospital.", yo.id);
		actualizar_dinero("-", 100);
		actualizar_casilla_datos(20, 'casas', (parseInt(casillas[20].casas) + 100));
	});
}
function comunidad08(){
	var id_comunidad = "108";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-cajacomunidad.png", "Caja de comunidad", comunidades[id_comunidad].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" ganó 20€ por devolución de sus contribuciones.", yo.id);
		actualizar_dinero("+", 20);
	});
}
function comunidad09(){
	var id_comunidad = "109";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-cajacomunidad.png", "Caja de comunidad", comunidades[id_comunidad].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" cobró 200€ por un error de la banca.", yo.id);
		actualizar_dinero("+", 200);
		actualizar_casilla_datos(20, 'casas', (parseInt(casillas[20].casas) + 200));
	});
}
function comunidad10(){
	var id_comunidad = "110";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-cajacomunidad.png", "Caja de comunidad", comunidades[id_comunidad].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" recibió 10€ de cada jugador.", yo.id);
		for(var x in jugadores){
			if(yo.posicion != x){
				actualizar_dinero("+", 10);
				actualizar_dinero_jugador(jugadores[x].id, "-", 10);
			}
		}
	});
}
function comunidad11(){
	var id_comunidad = "111";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-cajacomunidad.png", "Caja de comunidad", comunidades[id_comunidad].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" avanzó hasta "+casillas[0].nombre+".", yo.id);
		actualizar_dinero("+", cobrar);
		actualizar_datos_jugador("casilla", 0);
		caer(0);
	});
}
function comunidad12(){ /*	Vaya a la cárcel */
	var id_comunidad = "112";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-cajacomunidad.png", "Caja de comunidad", comunidades[id_comunidad].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" va a la cárcel.", yo.id);
		alacarcel();
	});
}
function comunidad13(){ /*	Queda libre de la cárcel */
	var id_comunidad = "113";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-cajacomunidad.png", "Caja de comunidad", comunidades[id_comunidad].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" recibió la tarjeta que le deja libre de la cárcel.", yo.id);
		actualizar_tarjeta_propietario(yo.id, '113');
	});
}
function comunidad14(){
	var id_comunidad = "114";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar_2("logo-cajacomunidad.png", "Caja de comunidad", comunidades[id_comunidad].mensaje);
	$("#pagar_mensaje").click(function(){
		partida_informar(yo.nombre+" pagó una multa de 10€.", yo.id);
		actualizar_dinero("-", 10);
		actualizar_casilla_datos(20, 'casas', (parseInt(casillas[20].casas) + 10));
	});
	$("#suerte_mensaje").click(function(){
		setTimeout(function(){
			caer_suerte();
		}, 1000);
	});
}
function comunidad15(){
	var id_comunidad = "115";
	partida_informar(yo.nombre+" cayó en "+casillas[jugadores[yo.posicion].casilla].nombre+".", yo.id);
	alertar("logo-cajacomunidad.png", "Caja de comunidad", comunidades[id_comunidad].mensaje);
	$("#aceptar_mensaje").click(function(){
		partida_informar(yo.nombre+" cobró 50€ por la venta de su stock.", yo.id);
		actualizar_dinero("+", 50);
	});
}

/*	Al cargar la página */
$(document).ready(function(){
	var temp = new Image();
	temp.src = $("body").css("background-image").replace("url(", "").replace(")", "");
	temp.onload = function(){
		if(temp.width > 300){
			$("body").css("background-size", window.innerWidth);
			$("div.espaciador").css("background-size", window.innerWidth);
		}
	};
	
	$(document).click(function(){	
		if(menu_abierto === true){
			$("#menu_raton").remove();
			menu_abierto = false;
		}

	});
	
	$("#chat_titulo").click(function(){
		var altura = $("#partida_chat").height();
		
		if(altura > 50){
			$("#partida_chat").animate(
				{"height": 30}, 
				"fast",
				function(){
					$("#partida_chat").animate(
						{"width": 200}, 
						"fast",
						function(){
							$("#controles").fadeOut("fast");
						}
					);
				}
			);
		}else{
			$("#partida_chat").animate(
				{"width": "45%"}, 
				"fast",
				function(){
					$("#partida_chat").animate(
						{"height": "65%"}, 
						"fast",
						function(){
							$("#controles").fadeIn("fast");
						}
					);
					$('#chat_contenedor').animate(
						{scrollTop: $('#chat_contenido').height()},
						"fast"
					);
					$('#chat_titulo').css("background", "#333");
					$("#chat_escribir").focus();
				
				}
			);
		}
	});

	$(".explicacion").each(function(){
		$(this).mouseenter(function(){
		
			/*	Establece la posición del aviso */
			var top = parseInt($(this).offset().top) + (parseInt($(this).height())/2) + (parseInt($(this).css("marginTop").replace('px', ''))/2) + (parseInt($(this).css("padding-top").replace('px', ''))/2);
			var left = parseInt($(this).offset().left) + parseInt($(this).width()) + parseInt($(this).css("padding-right").replace('px', '')) + parseInt($(this).css("marginRight").replace('px', ''));
						
			$("body").append("<div class='flecha'></div><div id='explicacion' class='explicacion'></div>");
			$("#explicacion").html($(this).attr("alt"));
		
			if(($(window).width() - left) <= 250){
				top = 0;
				left = 0;
				$(".flecha").css("border-top", "0px solid #222");
				$(".flecha").css("border-bottom", "10px solid #222");
				$(".flecha").css("border-right", "10px solid transparent");
				$(".flecha").css("border-left", "10px solid transparent");
				
				var top_flecha = parseInt($(this).offset().top) + parseInt($(this).height()) + parseInt($(this).css("padding-top").replace('px', '')) + parseInt($(this).css("marginTop").replace('px', '')) - 3;
				var left_flecha = parseInt($(this).offset().left) + (parseInt($(this).width()) / 2) - 10;
				$("#explicacion").css("text-align", "right");
				
				top = top_flecha + 10;
				left = parseInt($(this).offset().left) + parseInt($(this).width()) - $("#explicacion").width() - 20;
				$("#explicacion").css("text-align", "right");
				
			}else{
				$(".flecha").css("border-top", "10px solid transparent");
				$(".flecha").css("border-bottom", "10px solid transparent");
				$(".flecha").css("border-right", "10px solid #222");
				$(".flecha").css("border-left", "0px solid transparent");
				
				var top_flecha = top - 5;
				var left_flecha = left;
				
				top = top - ($("#explicacion").height() / 2) - 5;
				left = left + 5;
			}
			
			$("#explicacion").css("top", top);
			$("#explicacion").css("left", (left + 5));
			$(".flecha").css("top", top_flecha);
			$(".flecha").css("left", left_flecha);
			
			$("#explicacion").fadeIn("fast");
			$(".flecha").fadeIn("fast");
			
		}).mouseleave(function(){
			$("#explicacion").fadeOut("fast");
			$("#explicacion").remove();
			$(".flecha").remove();
		});
	});

	$("#mensaje_estado").click(function(){
		if(yo.jugando != 1 && yo.jugando != 2){
			if($(this).height() >= 100){
				ocultar_notificaciones();
			}else{
				ver_notficaciones();
			}
		}
	});

	$("#datosjugador").click(function(){
		if($(this).height() >= 420){
			ocultar_propiedades();
		}
	});
});