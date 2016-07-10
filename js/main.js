d = document;
maxCartas = 0;
var paresCartasDescubiertas = 0;
var paresCartasErroneas = 0;

respuestaJuego = d.querySelector('#respuesta');

var arrayCartas = new Array();
var arrayHeroesAleatoeios = new Array();
var arrayPosicionAleatoria = new Array();
var arrayCartasSeleccionadas = new Array();
var arrayIdSeleccionadas = new Array();

var arrayHeroes = new Array(
		'img/batman.png',
		'img/capitan-america.png',
		'img/flash.png',
		'img/goku.png',
		'img/hulk.png',
		'img/ironman.png',
		'img/kick-ass.png',
		'img/mujer-maravilla.png',
		'img/rafael.png',
		'img/seiya.png',
		'img/spiderman.png',
		'img/superman.png',
		'img/thor.png',
		'img/V.png',
		'img/wolverine.png',
		'img/acuaman.png',
		'img/ash_ketchum.png',
		'img/daredevil.png',
		'img/hombre_elastico.png',
		'img/leono.png',
		'img/linterna_verde.png',
		'img/naruto.png',
		'img/optimus_prime.png'
	);

var numerosUsados = new Array();

function numerosAleatorios(min , max){
	while(repe != false){
		var numero=Math.floor(Math.random()*(max-min+1))+min;
		var repe = repetidos(numero);
		numerosUsados.push(numero);
	}
	return numero;
}

function repetidos(num){
	var repe = false;
	for (var i = 0; i < numerosUsados.length; i++) {
		if (num == numerosUsados[i]) {
			repe = true;
		};
	};
	return repe;
}

function cartasAleatorias() {
	/*Seleccionados  ocho Héroes aleatorios sin que se repitan */
	var nunCartas = respuestaJuego.dataset.nivel * respuestaJuego.dataset.nivel;
		nunCartas = nunCartas / 2;
	for (var i = 0; i < nunCartas; i++) {
		arrayHeroesAleatoeios[i] = numerosAleatorios(0,22) ;
		//console.log(arrayPosicionAleatoria[i]);
	};
	/*Eliminamos todos los registros del array numerosUsados */
	numerosUsados.splice(0,numerosUsados.length);
}

function posicionAleatorias() {
	/*Seleccionados  ocho Héroes aleatorios sin que se repitan */
	var nunCartas = respuestaJuego.dataset.nivel * respuestaJuego.dataset.nivel;
	for (var i = 0; i < nunCartas; i++) {
		arrayPosicionAleatoria[i] = numerosAleatorios(0,nunCartas-1) ;
		//console.log(arrayPosicionAleatoria[i]);
	};
	/*Eliminamos todos los registros del array numerosUsados */
	numerosUsados.splice(0,numerosUsados.length);
}

function cuentaRegresiba(num){
	var contador = num;
	function resta(){
		contador = contador - 1;
		segundosGamar = contador;
		if (contador<6) {
			respuestaJuego.style.color = "red";
		};
		respuestaJuego.innerHTML = contador;
		if (contador==0) {
			acabarCuantaAtras();
		};
	}
	function acabarCuantaAtras(){
		clearInterval(temporalizador);
		gameOver();
	}
	temporalizador=setInterval(resta,1000);
}

function generarTabla(num) {
	mesaJuego = d.querySelector('#mesa');
	// Crea un elemento <table> y un elemento <tbody>
  	var tabla   = d.createElement("table");
  	var tblBody = d.createElement("tbody");

  	// Crea las tdTablas
  	for (var i = 0; i < num; i++) {
    	// Crea las hileras de la tabla
    	var trTabla = d.createElement("tr");
 
    	for (var j = 0; j < num; j++) {
      		// Crea un elemento <td> y un nodo de texto, haz que el nodo de
      		// texto sea el contenido de <td>, ubica el elemento <td> al final
      		// de la trTabla de la tabla
      		var tdTabla = d.createElement("td");
      		var imgCarta = d.createElement('img');
      		imgCarta.setAttribute("src", "img/carta.png");
      		imgCarta.setAttribute("data-id", "");
      		imgCarta.setAttribute("class", "carta-heroe");
      		tdTabla.appendChild(imgCarta);
      		trTabla.appendChild(tdTabla);
    	}
 
    		// agrega la trTabla al final de la tabla (al final del elemento tblbody)
    		tblBody.appendChild(trTabla);
 	}

 	// posiciona el <tbody> debajo del elemento <table>
  	tabla.appendChild(tblBody);
  	// appends <table> into <body>
  	mesaJuego.appendChild(tabla);
  	// modifica el atributo "border" de la tabla y lo fija a "2";
  	tabla.setAttribute("class", "tabla-cartas");
  	tabla.setAttribute("cellspacing", "0");
}

function verCarta(evento) {
	id = evento.target.dataset.id;
	cartasJuego[id].setAttribute("src", arrayCartas[id]);
	cartasJuego[id].removeEventListener('click', verCarta);
	arrayCartasSeleccionadas.push(arrayCartas[id]);
	arrayIdSeleccionadas.push(id);
	if (arrayCartasSeleccionadas.length>2) {
		if (arrayCartasSeleccionadas[0] == arrayCartasSeleccionadas[1]) {
			//console.log(paresCartasDescubiertas);
			cartasJuego[arrayIdSeleccionadas[0]].removeEventListener('click', verCarta);
			cartasJuego[arrayIdSeleccionadas[1]].removeEventListener('click', verCarta);
			//console.log("\n----------Son Iguales----------");
			arrayCartasSeleccionadas.splice(0,arrayCartasSeleccionadas.length-1);
			arrayIdSeleccionadas.splice(0,arrayIdSeleccionadas.length-1);

		} else{
			cartasJuego[arrayIdSeleccionadas[0]].addEventListener('click', verCarta);
			cartasJuego[arrayIdSeleccionadas[1]].addEventListener('click', verCarta);
			cartasJuego[arrayIdSeleccionadas[0]].setAttribute("src", "img/carta.png");
			cartasJuego[arrayIdSeleccionadas[1]].setAttribute("src", "img/carta.png");
			//console.log("\n----------Son Diferentes----------");
			arrayCartasSeleccionadas.splice(0,arrayCartasSeleccionadas.length-1);
			arrayIdSeleccionadas.splice(0,arrayIdSeleccionadas.length-1);
		};
		
	}
	if (arrayCartasSeleccionadas.length>1) {
		if (arrayCartasSeleccionadas[0] == arrayCartasSeleccionadas[1]) {
			paresCartasDescubiertas++;
			//console.log("paresCartasDescubiertas:  "+paresCartasDescubiertas);
			cartasJuego[arrayIdSeleccionadas[0]].setAttribute("class", "cartas-descubiertas");
			cartasJuego[arrayIdSeleccionadas[1]].setAttribute("class", "cartas-descubiertas");
		}else{
			paresCartasErroneas++;
		}

		if (paresCartasDescubiertas == respuestaJuego.dataset.nivel * respuestaJuego.dataset.nivel / 2 ) {
			clearInterval(temporalizador);
			respuesta.style.color = "#333";
			respuesta.innerHTML  = "<h2 class='bn'>Felicitaciones has Ganado faltando "+segundosGamar+" segundos :)</h2><table class='estadistica'><tr><th>CARTAS DESCUBIERTAS</th><th>CARTAS FALTANTES</th><th>INTENTOS FALLIDOS</th></tr><tr><td>"+paresCartasDescubiertas+"</td><td>"+(respuestaJuego.dataset.nivel * respuestaJuego.dataset.nivel  / 2 - paresCartasDescubiertas)+"</td><td>"+paresCartasErroneas+"</td></tr></table><br><a href='javascript: limpiarMesa();' class='btn'>Siguiente Nivel</a>";
			if (respuestaJuego.dataset.nivel==2) {
				respuestaJuego.dataset.nivel=4;
				console.log(respuesta.dataset.nivel);
			}else if (respuestaJuego.dataset.nivel==4) {
				respuestaJuego.dataset.nivel=6;
				console.log(respuesta.dataset.nivel);
			};
		};
	}
}

function limpiarMesa(){
	paresCartasDescubiertas=0;
	respuesta.style.color = "#333";
	arrayCartasSeleccionadas.splice(0,arrayCartasSeleccionadas.length);
	arrayIdSeleccionadas.splice(0,arrayIdSeleccionadas.length);
	mesaJuego.innerHTML = '';
	main();
}

function gameOver(){
	clearInterval(temporalizador);
	for (var i = cartasJuego.length - 1; i >= 0; i--) {
		cartasJuego[i].removeEventListener("click",verCarta);
	};
	respuesta.innerHTML  = "<h2 class='error'>Game Over :(</h2><table class='estadistica'><tr><th>CARTAS DESCUBIERTAS</th><th>CARTAS FALTANTES</th><th>INTENTOS FALLIDOS</th></tr><tr><td>"+paresCartasDescubiertas+"</td><td>"+(respuestaJuego.dataset.nivel * respuestaJuego.dataset.nivel  / 2 - paresCartasDescubiertas)+"</td><td>"+paresCartasErroneas+"</td></tr></table><br><a href='javascript: limpiarMesa();' class='btn'>Jugar de Nuevo</a>";
}

function activarCartas() {
	cartasJuego = d.querySelectorAll('.carta-heroe');
	for (var i = cartasJuego.length - 1; i >= 0; i--) {
		cartasJuego[i].dataset.id = i;
		cartasJuego[i].addEventListener( 'click', empazarJuego);
		arrayCartas[i] = i;
		//console.log(arrayCartas[i]);
	};
}

function empazarJuego(evento) {
	id = evento.target.dataset.id;
	for (var i = cartasJuego.length - 1; i >= 0; i--) {
		cartasJuego[i].removeEventListener("click",empazarJuego);
		cartasJuego[i].addEventListener( 'click', verCarta);
	};
	cuentaRegresiba(tiempo);	
	cartasJuego[id].setAttribute("src", arrayCartas[id]);
	arrayCartasSeleccionadas.push(arrayCartas[id]);
	arrayIdSeleccionadas.push(id);
	cartasJuego[id].removeEventListener('click', verCarta);
}

function main() {
	/*Se muestra los segundos*/
	tiempo = respuestaJuego.dataset.nivel * respuestaJuego.dataset.nivel * respuestaJuego.dataset.nivel  / 2;
 	respuestaJuego.textContent = tiempo;

	generarTabla(respuestaJuego.dataset.nivel);

	activarCartas();

	cartasAleatorias();

	posicionAleatorias();

	for (var i = 0; i < respuestaJuego.dataset.nivel * respuestaJuego.dataset.nivel; i++) {
		maxCartas++;
		var numC = respuestaJuego.dataset.nivel * respuestaJuego.dataset.nivel;
			numC = numC / 2;
		if (maxCartas>numC) {
			maxCartas = 1;
		};

		arrayCartas[arrayPosicionAleatoria[i]] = arrayHeroes[arrayHeroesAleatoeios[maxCartas-1]];

	};
	
}

/*Al cargar ejecuto la function main;*/
window.addEventListener( 'load', main );