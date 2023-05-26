let tablero = ['', '', '', '', '', '', '', '', ''];
let jugadorX = 'X';
const casillas = document.querySelectorAll('.board div');
const resetButton = document.querySelector('#reset');

function handleClick(event) {
const casilla = event.target;
const index = casilla.id;



resetButton.addEventListener('click', resetGame);

if (tablero[index] !== '') return;

tablero[index] = jugadorX;
casilla.textContent = jugadorX;

const winner = checkWinner();
if (winner) {
alert(`¡${winner} ha ganado!`);
resetTablero();
return;
}

if (checkEmpate()) return;

jugadorX = jugadorX === 'X' ? 'O' : 'X';
}

casillas.forEach((casilla) => {
casilla.addEventListener('click', handleClick);
});

function checkEmpate() {
if (isBoardFull()) {
alert('¡Empate!');
resetTablero();
return true;
}
return false;
}

function isBoardFull() {
return tablero.every((casilla) => casilla !== '');
}

function checkWinner() {
const winnerCombo = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];

for (let i = 0; i < winnerCombo.length; i++) {
const [a, b, c] = winnerCombo[i];
if (tablero[a] === tablero[b] && tablero[b] === tablero[c] && tablero[a] !== '') {
return tablero[a];
}
}

return null;
}
function resetGame(){
    resetTablero();
    alert('Here we go again!');
}

function resetTablero(){
  tablero= ['', '', '', '', '', '', '', '', ''];
  casillas.forEach((casilla) => {
    casilla.textContent = '';
  });
  jugadorX='X';
}