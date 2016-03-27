var map = [];
var word_to_guess = ""
var lifes = 6
var correct = 0
var guesses = 0
var texto = ""

function loadFileAsText()
{
	var fileToLoad = document.getElementById("fileToLoad").files[0];

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

		return dictionary_array[random_number];
	} else {

		console.log ("Selecciona primero un diccionario.");
	}
}


function newgame() {

	word_to_guess = newWord();
	//word_to_guess = quitaAcentos(prompt("¿Qué palabra tendrá que adivinar?").toLowerCase()); 

	for (var i = 0; i < word_to_guess.length; i++) {
		map.push ("_");
	}

	console.log (map);
	return game();
}


function game (){

	var attempt = prompt("Intenta resolverlo, o prueba con una nueva letra.").toLowerCase();

	if (attempt.length === 1) {

		for (var i = 0; i < word_to_guess.length; i++) {

			if (word_to_guess.charAt(i) === attempt){
				if (map[i] !== attempt) {
					map[i] = attempt
					guesses++
				} else {
					console.log ("Ya habías usado esa letra.")
				}
				correct = 1
			}
			
		}

		if (correct === 1) {return acierto();}else{return fallo();}


	} else if (attempt.length === word_to_guess.length) { 

		if (attempt === word_to_guess) {
			console.log ("Has ganado, es la palabra correcta: " + word_to_guess);
			return;
		} else {
			console.log ("Has perdido, la palabra era: " + word_to_guess);	
			return;		
		}

	} else {

		console.log ("Por favor, introduce una letra, o la palabra de " + word_to_guess.length + " letras a adivinar.");	
		return game();

	}



}


function acierto (){

	if (guesses === word_to_guess.length) {
		console.log ("Has ganado, has acertado todas las letras la palabra: " + word_to_guess);
		return;
	}else{
		console.log (map);
		correct = 0
		return game();
	}

}


function fallo (){

	lifes--

	if (lifes === 0) {
		console.log ("You lost.");
		return;
	} else {
		console.log ("You have now: " + lifes + " lifes.");
		return game();
	}

}

function quitaAcentos(str){
for (var i=0;i<str.length;i++){
//Sustituye "á é í ó ú"
if (str.charAt(i)=="á") {str = str.replace(/á/,"a")};
if (str.charAt(i)=="é") {str = str.replace(/é/,"e")};
if (str.charAt(i)=="í") {str = str.replace(/í/,"i")};
if (str.charAt(i)=="ó") {str = str.replace(/ó/,"o")};
if (str.charAt(i)=="ú") {str = str.replace(/ú/,"u")};
}
return str;
}





