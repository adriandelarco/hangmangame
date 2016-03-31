var map = [];
var word_to_guess = ""
var lifes = 6
var correct = 0
var guesses = 0
var dictionary =""
var foto = "img/1.jpg"

 if (localStorage.getItem('map')) { document.getElementById("loadbutton").style.display = 'block';}

function loadFileAsText(){
	var fileToLoad = document.getElementById("fileToLoad").files[0];

	if (fileToLoad == null) { return alert("Selecciona antes un diccionario.");};

	document.getElementById("dictionarylabel").innerHTML = fileToLoad.name

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) 
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		dictionary = textFromFileLoaded
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

function newWord() {

	if (dictionary !== "") {
		
		var dictionary_array = dictionary.split('\n');
		var random_number = Math.floor((Math.random() * dictionary_array.length)); 
		var random_word = quitaAcentos(dictionary_array[random_number]).toLowerCase()
		if (random_word.length < 3) {return newWord;}

		return random_word;
	} else {

		alert ("Selecciona primero un diccionario.");
	}
}


function newGameAI() {

	restartvariables();
	cleanGame();

	word_to_guess = newWord();
	if (dictionary === "") { return;}

	document.getElementById("game").style.display = 'block';
	document.getElementById("savebutton").style.display = 'block';

	for (var i = 0; i < word_to_guess.length; i++) {
		map.push ("_");
	}

	imprMap(map);
	imprConsole ("Comienza la partida.");

}

function newGame2P() {

	restartvariables();
	cleanGame();

	word_to_guess = quitaAcentos(prompt("¿Qué palabra tendrá que adivinar?").toLowerCase()); 
	if (word_to_guess.length < 3) {alert("La palabra tiene que ser de tres o más letras"); return newGame2P();}

	document.getElementById("game").style.display = 'block';
	document.getElementById("savebutton").style.display = 'block';

	for (var i = 0; i < word_to_guess.length; i++) {
		map.push ("_");
	}


	imprMap(map);
	imprConsole ("Comienza la partida.");

}


function game (){

	if (word_to_guess==="" || lifes === 0) {return;}

	var attempt=document.getElementById("gameinput").value.toLowerCase();
	document.getElementById("gameinput").value = ""

	if (attempt.length === 1) {

		for (var i = 0; i < word_to_guess.length; i++) {

			if (word_to_guess.charAt(i) === attempt){
				if (map[i] !== attempt) {
					map[i] = attempt
					guesses++
				} else {
					imprConsole ("Ya habías usado esa letra.")
				}
				correct = 1
			}
			
		}

		if (correct === 1) {return acierto();}else{return fallo();}


	} else if (attempt.length === word_to_guess.length) { 

		if (attempt === word_to_guess) {
			map = word_to_guess
			imprMap(map);
			imprConsole ("Has ganado, es la palabra correcta\n .Por favor, inicia una nueva partida.");
			document.getElementById("hangmandrawing").src = "img/8.jpg";
			document.getElementById("savebutton").style.display = 'none';
			return;
		} else {
			map = word_to_guess
			imprMap(map);
			imprConsole ("Has perdido, la palabra era: " + word_to_guess + "\n .Por favor, inicia una nueva partida.");	
			document.getElementById("hangmandrawing").src = "img/7.jpg";
			document.getElementById("savebutton").style.display = 'none';
			return cleanGame();		
		}

	} else {

		imprConsole ("Por favor, introduce una letra, o la palabra de " + word_to_guess.length + " letras a adivinar.");	


	}



}


function acierto (){

	if (guesses === word_to_guess.length) {
		 imprConsole ("Has ganado, has acertado todas las letras la palabra. \n Por favor, inicia una nueva partida.");
		 document.getElementById("hangmandrawing").src = "img/8.jpg";
		 document.getElementById("savebutton").style.display = 'none';
		 imprMap(map);
		 return;
	}else{
		imprMap(map);
		correct = 0
	}

}


function fallo (){

	lifes--

	if (lifes === 0) {
		map = word_to_guess
		imprConsole ("Has perdido, la palabra era: " + word_to_guess + "\n .Por favor, inicia una nueva partida.");	
		imprMap(map);
		document.getElementById("hangmandrawing").src = "img/7.jpg";
		document.getElementById("savebutton").style.display = 'none';
		return cleanGame();
	} else {
		imprConsole ("Te quedan: " + lifes + " vidas.");

		foto = "img/" + (7 - lifes) + ".jpg"
		document.getElementById("hangmandrawing").src = foto;
	}

}

function quitaAcentos(str){
for (var i=0;i<str.length;i++){
	if (str.charAt(i)=="á") {str = str.replace(/á/,"a")};
	if (str.charAt(i)=="é") {str = str.replace(/é/,"e")};
	if (str.charAt(i)=="í") {str = str.replace(/í/,"i")};
	if (str.charAt(i)=="ó") {str = str.replace(/ó/,"o")};
	if (str.charAt(i)=="ú") {str = str.replace(/ú/,"u")};
}
return str;
}





function imprMap(map) {

	if (typeof map === 'string') {mapclean = map } else { var mapclean = map.join(" ")}

    document.getElementById("letters2").textContent=mapclean;
    console.log (mapclean);
}

function imprConsole(text) {

    document.getElementById("consoletext").textContent=text;
    console.log (text);
}


function enterpressalert(e, textarea){

	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13) { 
	    return game();
	}
}

function restartvariables(){
	map = [];
	word_to_guess = ""
	lifes = 6
	correct = 0
	guesses = 0
	document.getElementById("hangmandrawing").src = "img/1.jpg";
}

function saveGame() {

	if (lifes === 0 || lifes === 6) {return console.log ("No puedes guardar una partida que no está en juego.");}

	localStorage.setItem('word_to_guess', word_to_guess);
	localStorage.setItem('lifes', lifes);
	localStorage.setItem('correct', correct);
	localStorage.setItem('guesses', guesses);
	localStorage.setItem('dictionary', dictionary);
	localStorage.setItem("map", JSON.stringify(map));
	localStorage.setItem("foto", foto);
	document.getElementById("game").style.display = 'none';
	document.getElementById("savebutton").style.display = 'none';
	document.getElementById("loadbutton").style.display = 'block';

}

function loadGame() {

    if (localStorage.getItem('map')) {
        word_to_guess = localStorage.getItem('word_to_guess');
        lifes = localStorage.getItem('lifes');
        correct = localStorage.getItem('correct');
        guesses = localStorage.getItem('guesses');
        dictionary = localStorage.getItem('dictionary');
        map = JSON.parse(localStorage.getItem("map"));
        foto = localStorage.getItem("foto");

	    document.getElementById("game").style.display = 'block';
		document.getElementById("savebutton").style.display = 'block';
		document.getElementById("loadbutton").style.display = 'none';
		document.getElementById("hangmandrawing").src = foto;
		imprConsole ("Te quedan: " + lifes + " vidas.");	
		imprMap(map);
	}

	
}

function cleanGame() {
 
	localStorage.clear();
	window.localStorage.clear();
	document.getElementById("loadbutton").style.display = 'none';
	return restartvariables();
}


