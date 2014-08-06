<?php include "includes/cabecera.php";?>

<script type="text/javascript">
	function actualizar_avatar(){
		$.ajax({
			type : 'get',
			url : 'funciones/ajax_monopoly.php',
			dataType : 'json', 
			data : {
				'id_usuario' : <?php echo $_SESSION['id_usuario']; ?>,
				'online': true,
				'miAsiento' : miAsiento,
				'avatar' : $("#avatar").val(),
				'mesa' : '<?php echo $_GET['mesa']; ?>'
			},
			complete : function(response) {
			},
			success : function(response) {
			}
		});
	}
	function actualizar_estado(){
		$.ajax({
			type : 'get',
			url : 'funciones/ajax_monopoly.php',
			dataType : 'json', 
			data : {
				'id_usuario': <?php echo $_SESSION['id_usuario']; ?>,
				'online': true,
				'mesa': '<?php echo $_GET['mesa']; ?>',
				'estado': true
			},
			complete : function(response) {
			},
			success : function(response) {
			}
		});
	}
	function comenzar_partida(){
		$.ajax({
			type : 'get',
			url : 'funciones/ajax_monopoly.php',
			dataType : 'json', 
			data : {
				'id_usuario' : <?php echo $_SESSION['id_usuario']; ?>,
				'online': true,
				'mesa' : <?php echo $_GET['mesa']; ?>,
				'empezar': true
			},
			complete : function(response){
			},
			success : function(response){
			}
		});
	}
</script>

<?php
echo "<div style='float:left; display:block; position:relative;'>";

/* Carga el módulo para mostrar la lista de jugadores. */
include "vistas/vista_mesa_jugadores.php";

/* Carga el módulo de espectadores. */
echo "<br />";
include "vistas/vista_mesa_espectadores.php";

echo "</div>";
echo "<br class='dcha'>";

/* Carga el módulo del chat. */
include "vistas/modulo_chat.php";
?>

<script type="text/javascript">
	var consultando = true;
	var admin_style = "color: green;";
	var miAvatar = "";
	var miAsiento = "";
	var temp_ultimo_mensaje = false;
	
	var Mesa = function (){
		this.connect = function(){
			var self = this;
			$.ajax({
				type : 'get',
				url : 'funciones/ajax_monopoly.php',
				dataType : 'json', 
				data : {
					'id_usuario' : '<?php echo $_SESSION['id_usuario']; ?>',
					'mesa' : '<?php echo $_GET['mesa']; ?>',
					'jugadores' : 'true',
					'espectadores' : 'true'
				},
				complete : function(response) {
					setTimeout(function(){ mesa.connect(); }, 500);
				},
				success : function(response) {
					var temp = "";
					var numJugadores = 0;
					var numJugadoresListos = 0;
					
					/* Actualizamos la lista de jugadores */
					temp += "<tr>";
						temp += "<th id='cabecera1'>"+response['idiomas']['glo_nombre']+"</th>";
						temp += "<th width='75px' id='cabecera3'>"+response['idiomas']['cfg_imagen']+"</th>";
						temp += "<th width='75px' id='cabecera2'>"+response['idiomas']['glo_estado']+"</th>";
						temp += "<th width='75px' id='cabecera2'>Ok</th>";
					temp += "</tr>";
					
					for(var x = 0; x < sizeof(response['jugadores']); x++){
						var usr = response['jugadores'][x];
						numJugadores++;
						
						if(usr['id_usuario'] == response['yo']['id_usuario']){
							miAsiento = 'jugador'+numJugadores;
							miAvatar = response['avatares'][usr['avatar']]['id_avatares'];
						}
						if(usr['estado'] == "img/estado_listo.png"){
							numJugadoresListos++;
						}
						
						temp += "<tr>";
							temp += "<td style='text-align:left; cursor: default!important;' onclick='javascript:menu_jugador(\""+usr['nombre']+"\");'>";
							
								/*	Tipo de cuenta */
								temp += "<img id='tipo_cuenta' height='20px' style='vertical-align: middle;' src='http://www.imperdiblesoft.com/img/tipos_cuenta/"+usr['tipo_cuenta']+".png' />";
								
								/*	Nombre */
								if(usr['administrador'] >= 1){ 
									temp += "<span id='nombre' style='color:"+usr['color']+"'> "+usr['rango']+" "+usr['nombre']+"</span>";
								}else{ 
									temp += "<span id='nombre'> "+usr['nombre']+"</span>";
								}
							temp += "</td>";
							
							/*	Avatar */
							temp += "<td><img  height='36px' style='vertical-align: middle;' src='avatares/"+response['avatares'][usr['avatar']]['ruta']+".png' /></td>";
							
							/*	Estado online */
							temp += "<td><img src='"+usr['est_online']+"' /></td>";
							
							/*	Listo */
							if(usr['estado'] == 0){
								temp += "<td></td></tr>";
							}else{
								temp += "<td><img src='"+usr['estado']+"' /></td>";
							}
							
						temp += "</tr>";
					}
					$("#tabla_jugadores").html(temp);
					
					/* Actualizamos la lista de avatares */
					temp = "";
					for (var key in response['avatares']){
						var avt = response['avatares'][key];
						var id_avatar = avt['id_avatares'];
						
						if((avt['usado'] && avt['usado'] == 1 && avt['id_avatares'] != miAvatar) || (response['yo']['administrador'] < 1 && avt['ruta'] == "administrador")){
							$("#avatar"+id_avatar).attr('disabled','disabled');
							
						}else if((!avt['usado'] || avt['usado'] != 1) && (response['yo']['administrador'] >= 1 || avt['ruta'] != "administrador")){
							$("#avatar"+id_avatar).removeAttr('disabled');
						}
					}
					
					
					/* Actualizamos los botones de estado */
					if(response['mesa'][miAsiento+'ok'] == 1){
						$("#estado_izda").attr("class", "cancelar-izq");
						$("#estado_izda").attr("value", "No estoy listo");
						$("#estado_izda").show();
						$("#selector_de_avatar").hide();
					}else{
						$("#estado_izda").attr("class", "aceptar");
						$("#estado_izda").attr("value", "Estoy Listo");
						$("#estado_izda").show();
						$("#selector_de_avatar").show();
					}
					if(numJugadoresListos >= 2 && numJugadores == numJugadoresListos){
						$("#estado_dcha").attr("type", "button");
						$("#estado_dcha").attr("name", "empezar_partida");
						$("#estado_dcha").attr("class", "aceptar-dcha");
						$("#estado_dcha").attr("value", "Empezar");
						$("#estado_dcha").attr("onclick", "comenzar_partida();");
						$("#estado_dcha").show();
					}else{
						$("#estado_dcha").attr("type", "submit");
						$("#estado_dcha").attr("name", "dejar_mesa");
						$("#estado_dcha").attr("class", "cancelar");
						$("#estado_dcha").attr("value", "Dejar mesa");
						$("#estado_dcha").show();
					}
					
					/* Actualizamos la lista de espectadores */
					temp = "";
					if(response['espectadores']){
						for(var x=0; x < sizeof(response['espectadores']); x++){
							var usr = response['espectadores'][x];
							
							temp += "<tr>";
								temp += "<td style='text-align:left; cursor: default!important;' onclick='javascript:menu_jugador(\""+usr['nombre']+"\");'>";
								
									/*	Tipo de cuenta */
									temp += "<img id='tipo_cuenta' height='20px' style='vertical-align: middle;' src='http://www.imperdiblesoft.com/img/tipos_cuenta/"+usr['tipo_cuenta']+".png' />";
									
									/*	Nombre */
									if(usr['administrador'] >= 1){ 
										temp += "<span id='nombre' style='color:"+usr['color']+"'> "+usr['rango']+" "+usr['nombre']+"</span>";
									}else{ 
										temp += "<span id='nombre'> "+usr['nombre']+"</span>";
									}
								temp += "</td>";
								
								/*	Estado online */
								temp += "<td width='35px'><img src='"+usr['est_online']+"' /></td>";
							temp += "</tr>";
						}
						$("#tabla_espectadores").html(temp);
						$("#lista_espectadores").show();
						
					}else{
						$("#tabla_espectadores").html("");
						$("#lista_espectadores").hide();
					}
				}
			});
		}
	}
	var mesa = new Mesa();
	mesa.connect();
	
	$("#estado_izda").click(function(){
		actualizar_estado();
	});
</script>

<?php
include "includes/pie.php";?>
