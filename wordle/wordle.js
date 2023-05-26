var height = 6; //number of guesses
var width = 5;  //number of words

var row = 0;
var col = 0;

var gameOver = false;
var wordList = ['homer', 'marge', 'burns', 'ralph', 'lenny','patty', 'selma', 'frank', 'disco','kodos', 'rasca', 'jimbo', 'muntz', 'barto', 'mindy', 'maude', 'santa', 'eddie', 'frink', 'janey', 'laura', 'stacy', 'cecil', 'artie', 'lance', 'power', 'arnie', 'helen', 'lewis', 'jones', 'sarah', 'largo', 'akira', 'billy', 'larry', 'hyman', 'colin', 'gavin', 'alice', 'chuck', 'terri', 'louie', 'tatum', 'dewey', 'luigi', 'doris', 'shary', 'luann', 'gabbo'];
var word = wordList[Math.floor(Math.random()* wordList.length)].toUpperCase();
console.log(word);

window.onload = function () {
    intialize();
}

function intialize() {

    //create the game board
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            //vamos a crear un <span id="0-0" class="tile">""</span>
            //crea un nuevo elemento HTML en la página web utilizando el método document.createElement() de JavaScript.
            //Esta línea de código crea un nuevo elemento span que luego se utilizará para representar una celda del tablero en la página web. 
            // La variable tile se utiliza para hacer referencia a este nuevo elemento span en el código posterior.
            let tile = document.createElement("span");
            tile.id = i.toString() + "-" + j.toString();
            // establece el atributo id del elemento span recién creado como una cadena que representa su posición en el tablero. 0-0, 0-1. . .
            tile.classList.add("tile");
            //
            tile.innerText = "";
            // establece el texto interno del elemento span recién creado como una cadena vacía.
            document.getElementById("board").appendChild(tile);
            //
        }
    }

    //Create the keyboard
    let keyboard=[
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
    ]

    for( let i=0 ; i<keyboard.length;i++){
        let currRow= keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for(let j=0;j<currRow.length;j++){
            let keyTile = document.createElement("div");

            let key = currRow[j]
            keyTile.innerText = key;
            if(key == "Enter"){
                keyTile.id="Enter";
            }
            else if(key=="⌫"){
                keyTile.id="Backspace";
            }
            else if ("A" <= key && key <= "Z"){
                keyTile.id = "Key" +key; //"Key"+"A"
            }
            keyTile.addEventListener("click", processKey);

            if (key == "Enter"){
                keyTile.classList.add("enter-key-tile");
            }
            else{
                keyTile.classList.add("key-tile");
            }
            keyboardRow.appendChild(keyTile);
        }
        document.body.appendChild(keyboardRow)
    }

    //Listen for Key Press
    document.addEventListener("keyup", (e) => {
        processInput(e);
    })
}


function processKey(){
     e={"code" : this.id};
    processInput(e);
}


function processInput(e){
    if (gameOver) return; 

    // alert(e.code);
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (col < width) {
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            if (currTile.innerText == "") {
                currTile.innerText = e.code[3];
                col += 1;
            }
        }
    }
    else if (e.code == "Backspace") {
        if (0 < col && col <= width) {
            col -=1;
        }
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        currTile.innerText = "";
    }

    else if (e.code == "Enter") {
        update();
    }

    if (!gameOver && row == height) {
        gameOver = true;
        document.getElementById("answer").innerText = word;
    }
}
 
    
function update() {
    let guess="";
    document.getElementById("answer").innerText="";

    //String up the guess word
    for(let i=0;i<width;i++){
            let currTile= document.getElementById(row.toString()+ "-"+i.toString())
            let letter = currTile.innerText;
            guess += letter;
    }

    guess= guess.toLocaleLowerCase(); //case sensitive
    console.log(guess)

    if(!wordList.includes(guess)){
        document.getElementById("answer").innerText="Not a sinsons character";
        return;
    }

    //start it
    let correct = 0;
    let letterCount = {}; //Kenny -> {K:1, E:1, N:2, Y:1}
    for(let i=0;i<word.length;i++){
        letter=word[i];
        if(letterCount[letter]){
            letterCount[letter] +=1;
        }else{
         letterCount[letter] = 1;
        }
    }
    //first iteraction, check all the corrects one
    for (let i = 0; i < width; i++) {
        let currTile = document.getElementById(row.toString() + '-' + i.toString());
        let letter = currTile.innerText;
        //Is it in the right position?
        if (word[i] == letter) {
            currTile.classList.add("correct");
            let keyTile = document.getElementById("Key" + letter);
            keyTile.classList.remove("present");
            keyTile.classList.add("correct");
            correct = +1;
            letterCount[letter] -=1;
        }
        if (correct == width) {
            gameOver = true;
        }
    }
    //second iteraction, mark which ones are present but in wrong position
        for (let i = 0; i < width; i++) {
        let currTile = document.getElementById(row.toString() + '-' + i.toString());
        let letter = currTile.innerText;
        if(!currTile.classList.contains("correct"))
        //Is it in the word?{}
        if (word.includes(letter)&& letterCount[letter]>0) {
            currTile.classList.add("present");
            let keyTile = document.getElementById("Key" + letter);
            if(!keyTile.classList.contains("correct")){
                keyTile.classList.add("present");
            }            
            letterCount[letter] -=1;
        }
        else {
            currTile.classList.add("absent");
            let keyTile = document.getElementById("Key" + letter);
            keyTile.classList.add("absent")
        }
    }
    row += 1;
    col = 0;
    }   
    