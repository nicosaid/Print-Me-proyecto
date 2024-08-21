//boton menu abrir y cerrar
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

//boton regresar, codigo boton: <a id="Regresar">&#8592;</a>
    document.getElementById('Regresar').addEventListener('click', function() {
        window.history.back();
    });