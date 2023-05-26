var botonInsertar = document.getElementById("botonInsertar");
var inputNick = document.getElementById("inputNick");
var textoIngresado = document.getElementById("textoIngresado");

botonInsertar.addEventListener("click", function() {
  var nick = inputNick.value;
  textoIngresado.textContent = nick;
  sessionStorage.setItem("nickGuardado", nick);
});

function cargarNick() {
  var nickGuardado = sessionStorage.getItem("nickGuardado");
  if (nickGuardado) {
    document.getElementById("textoIngresado").innerHTML = nickGuardado;
  }
}
