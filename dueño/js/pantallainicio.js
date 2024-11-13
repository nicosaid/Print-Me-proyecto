document.addEventListener('DOMContentLoaded', function () {
  // Manejador para el ícono del menú
  const menuIcon = document.getElementById('menu-icon');
  const buttonContainer = document.querySelector('.button-container');

  // Alternar el menú al hacer clic en el ícono
  menuIcon.addEventListener('click', function () {
      buttonContainer.classList.toggle('show-menu');
  });

  // Cierra el menú si se hace clic fuera de él
  document.addEventListener('click', function (event) {
      if (!buttonContainer.contains(event.target) && !menuIcon.contains(event.target)) {
          buttonContainer.classList.remove('show-menu');
      }
  });


});
 
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado");
    cargarPerfiles();
});

function seleccionarPerfil(idPerfilSeleccionado) {
    localStorage.setItem('perfilSeleccionado', idPerfilSeleccionado);
    window.location.href = 'usuario/html/perfilduenio.html';
}

function crearPerfil(vendedor) {
    console.log("vendedor:",vendedor);

    // Crear un div contenedor para cada perfil
    const perfilDiv = document.createElement("div");
    perfilDiv.classList.add("info");//clase del css

    // Crear y añadir imagen
    const img = document.createElement("img");
    img.src = "../fotos/impresora 3d.png"; 
    perfilDiv.appendChild(img);

    // Crear y añadir nombre
    const nombre = document.createElement("h2");
    nombre.textContent = vendedor.nombre_apellido;
    perfilDiv.appendChild(nombre);

    // Crear y añadir descripción
    const descripcion = document.createElement("p");
    descripcion.textContent = vendedor.descripcion;
    perfilDiv.appendChild(descripcion);

    // Crear y añadir botón "Ir al Perfil"
    const botonPerfil = document.createElement("button");
    botonPerfil.textContent = "Ir al Perfil";
    botonPerfil.classList.add("button");
    botonPerfil.onclick = () => {
        redirectWithDelay(`/vendedor/${vendedor.id}`);
    };
    perfilDiv.appendChild(botonPerfil);

    // Agregar el perfil al contenedor principal
    document.getElementById("TodosPerfiles").appendChild(perfilDiv);
}

function cargarPerfiles() {
    fetch("https://print-me-ten.vercel.app/vendedores/vendedor/get")
        .then(response => response.json())
        .then(data => {
            console.log("Data recibida:", data);
            if (Array.isArray(data.vendedor)) {
                data.vendedor.forEach(crearPerfil);
            } else {
                console.error("La propiedad 'vendedor' no es un array:", data);
            }
        })
        .catch(error => console.error("Error al cargar perfiles:", error));
}

function buscarPerfiles() {
    document.getElementById("TodosPerfiles").innerHTML = "";
    const searchInput = document.getElementById('buscador').value.toLowerCase(); // Obtener el valor del buscador en minúsculas
    fetch("https://print-me-ten.vercel.app/vendedores/buscar?q=" + searchInput) 
        .then(response => response.json())
        .then(data => {
            console.log("Data recibida:", data);
            if (Array.isArray(data.message)) {
                data.message.forEach(crearPerfil);
            } else {
                console.log(data.message);
                console.error("La propiedad 'message' no es un array:", data);
            }
        })
        .catch(error => console.error("Error al cargar perfiles:", error));
}