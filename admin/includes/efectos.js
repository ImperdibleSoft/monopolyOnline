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

/*	Objetos */
var jugadores = false;
var yo = false;
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

function depurar(parametro){
	$("#consultarecibida").html(JSON.stringify(parametro));
	
	$("#consultarecibida").show();
}

function alertar(imagen, titulo, mensaje){
	$("#mensajes").html("<div id='tarjeta'><img src='img/"+imagen+"'><h1>"+titulo+"</h1><p>"+mensaje+"</p><div id='botonera'><a id='aceptar_mensaje' class='boton' href='javascript:cerrar_alerta()'>Aceptar</a></div></div>");
	$("#mensajes").fadeIn("fast");
}
function alertar_2(imagen, titulo, mensaje){
	$("#mensajes").html("<div id='tarjeta'><img src='img/"+imagen+"'><h1>"+titulo+"</h1><p>"+mensaje+"</p><div id='botonera'><a id='pagar_mensaje' class='boton' href='javascript:cerrar_alerta()'>Pagar</a><a id='suerte_mensaje' class='boton' href='javascript:cerrar_alerta()'>Suerte</a></div></div>");
	$("#mensajes").fadeIn("fast");
}
function cerrar_alerta(){
	$('#mensajes').fadeOut(
		"fast",
		function(){
			$('#mensajes').html('');
		}
	);
}
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
function estado_esperando(){
	var temp = $("#mensajes").children();
	temp.fadeOut("fast", function(){
		temp.css("top", "50%");
		temp.css("left", "50%");
		temp.animate({
			"width": "250px",
			"height": "40px", 
			"margin-left": "-125px",
			"margin-top": "-20px"
		}, function(){
			temp.html('<p>Esperando respuesta...</p>');
			temp.fadeIn("fast");
		});
	});
}
function preguntar(parametro){
	switch(parametro){
		case "calle":
			$("#mensajes").html("<div id='tarjeta'><select id='listado'></select><div id='botonera'><a id='aceptar_mensaje' class='boton' href='javascript:cerrar_alerta()'>Aceptar</a><a id='cancelar_mensaje' class='boton cancelar' href='javascript:cerrar_alerta()'>Cancelar</a></div></div>");
			for(var x in casillas){
				$("#listado").append("<option value='"+casillas[x].id+"'>"+casillas[x].nombre);
			}
			$("#mensajes").fadeIn("fast");
			break;;
			
		case "dinero":
			$("#mensajes").html("<div id='tarjeta'><input type='text' id='dinero' value='' />€<div id='botonera'><a id='aceptar_mensaje' class='boton' href='javascript:cerrar_alerta()'>Aceptar</a><a id='cancelar_mensaje' class='boton cancelar' href='javascript:cerrar_alerta()'>Cancelar</a></div></div>");
			$("#mensajes").fadeIn("fast");
			break;;
			
		case "carcel":
			$("#mensajes").html("<div id='tarjeta'><input type='text' id='carcel' value='' /> turnos<div id='botonera'><a id='aceptar_mensaje' class='boton' href='javascript:cerrar_alerta()'>Aceptar</a><a id='cancelar_mensaje' class='boton cancelar' href='javascript:cerrar_alerta()'>Cancelar</a></div></div>");
			$("#mensajes").fadeIn("fast");
			break;;
			
		case "propietario":
			$("#mensajes").html("<div id='tarjeta'><select id='propietario'></select><div id='botonera'><a id='aceptar_mensaje' class='boton' href='javascript:cerrar_alerta()'>Aceptar</a><a id='cancelar_mensaje' class='boton cancelar' href='javascript:cerrar_alerta()'>Cancelar</a></div></div>");
			for(var x in jugadores){
				$("#propietario").append("<option value='"+jugadores[x].id+"'>"+jugadores[x].nombre);
			}
			$("#mensajes").fadeIn("fast");
			break;;
			
		case "casas":
			$("#mensajes").html("<div id='tarjeta'><select id='casas'></select> casas<div id='botonera'><a id='aceptar_mensaje' class='boton' href='javascript:cerrar_alerta()'>Aceptar</a><a id='cancelar_mensaje' class='boton cancelar' href='javascript:cerrar_alerta()'>Cancelar</a></div></div>");
			for(var x=0; x<=5; x++){
				$("#casas").append("<option value='"+x+"'>"+x);
			}
			$("#mensajes").fadeIn("fast");
			break;;
	}
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
		if(casillas[i].propietario == yo['nombre'] && casillas[id].color == casillas[i].color)
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

/*	Funciones de interacción con las propiedades */
function hipotecar(id){
		actualizar_casilla_datos(id, 'hipotecada', 1);
		actualizar_dinero('+', Math.round(casillas[id].precio / 2));
		$('#mensajes').html("<div id='tarjeta3'><h1>Hipotecado</h1><p>Has hipoteacado "+casillas[id].nombre+".</p><br /><p>A cambio has recibido "+(casillas[id].precio / 2)+"€, pero si alguien cae aquí no tendrá que pagarte nada.</p><div id='botonera'><a class='boton' href='javascript:cerrar_alerta()'>Aceptar</a></div></div>'");
		$('#mensajes').fadeIn("fast");
}
function deshipotecar(id){
	cerrar_alerta();
	setTimeout(function(){
		actualizar_casilla_datos(id, 'hipotecada', 0);
		actualizar_dinero('-', Math.round(casillas[id].precio / 2));
		$('#mensajes').html("<div id='tarjeta3'><h1>Deshipotecado</h1><p>Has pagado tu hipoteca por "+casillas[id].nombre+".</p><br /><p>A cambio los jugadores que caigan aquí volverán a pagarte la cantidad correspondiente.</p><div id='botonera'><a class='boton' href='javascript:cerrar_alerta()'>Aceptar</a></div></div>'");
		$('#mensajes').fadeIn("fast");
	}, 1000);
}

/*	Funciones de actualización de estado */
function estado_partida(id_usuario){
	$.ajax({
		type : 'get',
		url : '/funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : id_usuario
		},
		complete : function(response){
		},
		success : function(response){
			yo = response['yo'];
			
			/*	Definien los objetos de jugadores */
			var temp = response['partida']['jugadores'];
			jugadores = new Array();
			for(var x in temp){
				var temp_avatar = new Ficha(temp[x]['id_avatar'], temp[x]['avatar_jugador'])
				jugadores[temp[x]['id_jugador']] = new Jugador(temp[x]['id_jugador'], temp[x]['nombre_jugador'], temp_avatar, temp[x]['casilla'], temp[x]['dinero'], temp[x]['carcel'], temp[x]['jugando'], x);
			}
			
			/*	Si no se definieron los objetos de las casillas, los crea */
			var temp = response['partida']['propiedades'];
			casillas = new Array(40);
			for(var x in temp){
				casillas[x] = new Casilla(temp[x]['id_casilla'], temp[x]['nombre'], temp[x]['id_propietario'], temp[x]['precio'], temp[x]['precio_construccion'], temp[x]['casas'], temp[x]['0casas'], temp[x]['1casas'], temp[x]['2casas'], temp[x]['3casas'], temp[x]['4casas'], temp[x]['5casas'], temp[x]['color'], temp[x]['hipotecada']);
			}
			
			/*	Si no se definieron los objetos de las suertes, los crea */
			var temp = response['partida']['suertes'];
			suertes = new Array(15);
			for(var x in temp){
				suertes[x] = new Suerte(temp[x]['id_tarjeta'], temp[x]['mensaje'], x, temp[x]['propietario'], temp[x]['funcion']);
			}
			
			/*	Si no se definieron los objetos de las comunidades, los crea */
			var temp = response['partida']['comunidades'];
			comunidades = new Array(15);
			for(var x in temp){
				comunidades[x] = new Comunidad(temp[x]['id_tarjeta'], temp[x]['mensaje'], x, temp[x]['propietario'], temp[x]['funcion']);
			}
		}
	});
}

function actualizar_datos_jugador(jugador, clave, valor){
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario': jugador,
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
function actualizar_casilla_datos(jugador, id_casilla, clave, valor){
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : jugador,
			'actualizar_datos': true,
			'id_casilla': id_casilla,
			'clave' : clave,
			'valor' : valor
		},
		complete : function(response){
		},
		success : function(response){
		}
	});
}
function actualizar_tarjeta_propietario(jugador, id_tarjeta){
	$.ajax({
		type : 'get',
		url : 'funciones/ajax_monopoly.php',
		dataType : 'json', 
		data : {
			'id_usuario' : jugador,
			'actualizar_tarjeta_propietario': true,
			'id_tarjeta': id_tarjeta
		},
		complete : function(response){
		},
		success : function(response){
		}
	});
}

/*	Definición de objetos */
function Jugador(jId, jNombre, fAvatar, jCasilla, jDinero, jCarcel, jJugando, jPosicion){
	this.id			= jId;
	this.nombre		= jNombre;
	this.avatar		= fAvatar;
	this.casilla	= jCasilla;
	this.dinero		= jDinero;
	this.carcel		= jCarcel;
	this.jugando	= jJugando;
	this.posicion 	= jPosicion
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

function nuevo_ban(){
	
	$("#mensajes").html("<div id='tarjeta2'><form id='formul' class='personal'></form><div id='botonera'><a id='aceptar_mensaje' class='boton' href='javascript:cerrar_alerta()'>Aceptar</a><a id='cancelar_mensaje' class='boton cancelar' href='javascript:cerrar_alerta()'>Cancelar</a></div></div>");
	
	$("#formul").append("<label>Tipo de ban:</label><select id='tipo'></select><br /><br />");
	$("#tipo").append("<option value='id_usuario'>Cuenta");
	$("#tipo").append("<option value='ip_ultima_conexion'>IP");
	
	$("#formul").append("<label>Usuario:</label><select id='usuario'></select><br /><br />");
	$("#usuario").append("<option value=''>Cargando...");
	
	$("#formul").append("<label>Hasta:</label><input type='date' id='fecha_fin' placeholder='Fin del Ban' /><br /><br />");
	
	$("#formul").append("<label>Motivo:</label><textarea id='motivo'></textarea>");
	$("#mensajes").fadeIn("fast");
	
	$.ajax({
		type : 'get',
		url : '/admin/funciones/admin_ajax.php',
		dataType : 'json', 
		data : {
			'array': 'usuarios'
		},
		complete : function(response){
		},
		success : function(response){
			$("#usuario").html("<option>Selecciona un usuario");
			for(var x in response['usuarios']){
				$("#usuario").append("<option value='"+response['usuarios'][x]['id_usuario']+"'>"+utf8_decode(response['usuarios'][x]['nombre'])+" ("+response['usuarios'][x]['id_usuario']+")");
			}
		}
	});
	
	$("#aceptar_mensaje").click(function(){
		$.ajax({
			type : 'post',
			url : '/admin/funciones/admin_ajax.php',
			dataType : 'json', 
			data : {
				'accion': 'banear',
				'tipo': $("#tipo").val(),
				'id_usuario': $("#usuario").val(),
				'fin': $("#fecha_fin").val(),
				'motivo': $("#motivo").val()
			},
			complete : function(response){
			},
			success : function(response){
				location.reload();
			}
		});
	});
}

$(document).ready(function(){
	
	var temp = new Image();
	temp.src = $("body").css("background-image").replace("url(", "").replace(")", "");
	temp.onload = function(){
		if(temp.width > 300){
			$("body").css("background-size", window.innerWidth);
			$("div.espaciador").css("background-size", window.innerWidth);
		}
	};

	$(".elegir_calle").each(function(){
		var jugador_elegido = $(this).attr("jugador");
		$(this).click(function(){
			preguntar("calle");
			$("#aceptar_mensaje").click(function(){
				var casilla_elegida = $("#listado").val();
				actualizar_datos_jugador(jugador_elegido, "casilla", casilla_elegida);
			});
		});
	});
	
	$(".cambiar_dinero").each(function(){
		var jugador_elegido = $(this).attr("jugador");
		$(this).click(function(){
			preguntar("dinero");
			$("#aceptar_mensaje").click(function(){
				var dinero_elegido = $("#dinero").val();
				actualizar_datos_jugador(jugador_elegido, "dinero", dinero_elegido);
			});
		});
	});
	
	$(".cambiar_carcel").each(function(){
		var jugador_elegido = $(this).attr("jugador");
		$(this).click(function(){
			preguntar("carcel");
			$("#aceptar_mensaje").click(function(){
				var turnos_carcel = $("#carcel").val();
				actualizar_datos_jugador(jugador_elegido, "casilla", "10");
				actualizar_datos_jugador(jugador_elegido, "carcel", turnos_carcel);
			});
		});
	});
	
	$(".cambiar_propietario").each(function(){
		var calle_elegida = $(this).attr("casilla");
		$(this).click(function(){
			preguntar("propietario");
			$("#aceptar_mensaje").click(function(){
				var nuevo_propietario = $("#propietario").val();
				actualizar_casilla_datos(nuevo_propietario, calle_elegida, "id_propietario", nuevo_propietario);
			});
		});
	});
	
	$(".cambiar_casas").each(function(){
		var calle_elegida = $(this).attr("casilla");
		$(this).click(function(){
			preguntar("casas");
			$("#aceptar_mensaje").click(function(){
				var nuevas_casas = $("#casas").val();
				actualizar_casilla_datos(casillas[calle_elegida].propietario, calle_elegida, "casas", nuevas_casas);
			});
		});
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

});