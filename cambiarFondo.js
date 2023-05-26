const cambiarFondoBtn = document.getElementById('cambiarFondo');
const body = document.querySelector('body');

cambiarFondoBtn.addEventListener('click', function() {
  const newBackgroundImage = 'url(./img/Clouds_Background.webp)'; // Reemplaza "./ruta/a/tu/nueva/imagen.jpg" con la ruta de tu nueva imagen
  body.style.backgroundImage = newBackgroundImage;

  // Almacenar la ruta de la imagen en el almacenamiento local
  localStorage.setItem('backgroundImage', newBackgroundImage);
});

// Recuperar la ruta de la imagen al cargar la página
window.addEventListener('load', function() {
  const storedBackgroundImage = localStorage.getItem('backgroundImage');
  if (storedBackgroundImage) {
    body.style.backgroundImage = storedBackgroundImage;
  }
});