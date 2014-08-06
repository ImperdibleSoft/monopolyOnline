<div id="partida_chat">
	<div id="chat_titulo">
		<span id="titulo">Chat</span>
		<span id="controles"><img class="cerrar_chat" src="img/cerrar-widget.png" /></span>
	</div>
	<div id="chat_contenedor">
		<div id="chat_contenido">
		</div>
	</div>
	<div id="chat_usuarios">
		<div id="chat_lista_usuarios">
			<ul id="chat_lista_usuarios_ul">
			</ul>
		</div>
	</div>
	<input id="chat_escribir" type="text" name="chat_texto" value="" onkeypress="javascript:enviar_chat_enter(event, '<?php echo $_SESSION['id_usuario']; ?>', '<?php echo $mimesa; ?>')"/>
	<div id="enlace_mesa">
		<a class="boton" href="">Sentarse</a>
	</div>
</div>