const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

//boton regresar
<a id="Regresar">&#8592;</a>
<script>
    document.getElementById('Regresar').addEventListener('click', function() {
        window.history.back(); // Regresa a la página anterior en el historial del navegador
    });
</script>