var height = 6; //number of guesses
var width = 5;  //number of words

var row=0;
var col= 0;

var gameOver= false;
var word = "MARGE" // var word[]={}

window.onload = function(){
    intialize();
}

function intialize(){
    //create the game board

    for(let i = 0; i<height;i++){
        for(let j = 0; j<width;j++){
            let tile = document.createElement("span");
            tile.id = i.toString() + "-" + j.toString();
            tile.classList.add("tile");
            tile.innerText="";
            document.getElementById("board").appendChild(tile);
        }
    }
    //Listen for Key Press
    document.addEventListener("keyup", (e) => {
        if(gameOver) return;

        //alert(e.code);
        if ("KeyA" <= e.code && e.code <="KeyZ"){
            if(col<width){
                let currTile= document.getElementById(row.toString() + '-' + col.toString());
                if(currTile.innerText ==""){
                    currTile.innerText= e.code[3]
                    col+=1;
                }
            }
        } 
        else if(e.code == "Backspace"){
            if (0<col && col<=width){
                col -=1;
            }
            let currTile= document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText="";
        }else if( e.code="Enter"){
            update();
            row +=1;
            col= 0;
        }

        if(!gameOver && row == height){
        gameOver= true;
        document.getElementById("answer").innerText=word;
        }
    })
}

function update (){
    let correct = 0;
    for (let i=0;i<width;i++){
        let currTile= document.getElementById(row.toString() + '-' + i.toString());
        let letter = currTile.innerText;

        //Is it in the right position?
        if (word[i]== letter){
            currTile.classList.add("correct");
            correct=+1;
        }
        //Is it in the word?
        else if(word.includes(letter)){
            currTile.classList.add("present");
        }
        else{
            currTile.classList.add("absent");
        }
        if (correct == width){
            gameOver=true;
        }
    }
}