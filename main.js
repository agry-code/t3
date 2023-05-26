// Obtén el botón y la ventana modal
var button = document.getElementById("myButton");
var modal = document.getElementById("myModal");

// Obtén el elemento <span> que cierra la ventana modal
var closeBtn = document.getElementsByClassName("close")[0];

// Cuando se haga clic en el botón, muestra la ventana modal
button.onclick = function() {
  modal.style.display = "block";
}

// Cuando se haga clic en <span> (x), cierra la ventana modal
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Cuando se haga clic fuera de la ventana modal, ciérrala
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Inicialmente, oculta la ventana modal
modal.style.display = "none";

// Resto de tu código...
function abrirVentana() {
  var ancho = 460; // ancho de la nueva ventana en píxeles
  var alto = 300; // alto de la nueva ventana en píxeles
  var opciones = "width=" + ancho + ",height=" + alto;

  window.open("./setting.html", "_blank", opciones);
}

function cambiarOpcion() {
  var select = document.getElementById("opcion");
  var opcionSeleccionada = select.value;

  // Aquí puedes realizar acciones o cambios basados en la opción seleccionada
  console.log("Opción seleccionada:", opcionSeleccionada);
}

function mostrar() {
  var nombreInput = document.getElementById("nombre");
  var nombreUsuario = document.getElementById("nombreUsuario");
  var guardarBtn = document.querySelector("button");

  guardarBtn.addEventListener("click", guardarNombre);

  function guardarNombre() {
    var nombre = nombreInput.value;
    localStorage.setItem("nombreUsuario", nombre);
    nombreUsuario.textContent = nombre;
  }

  // Eliminar el nombre almacenado al cargar la página
  window.addEventListener("load", function() {
    localStorage.removeItem("nombreUsuario");
  });
}
