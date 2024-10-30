//select usuarios como dueños, 
//tmb se puede hacer con el token, con eso verificamos si el user es cliente o dueño
//yo tengio q hacer un fetch de su ruta

//buscador
function buscar() {
    const query = document.getElementById("buscador").value;
    
    fetch(`https://print-me1.vercel.app/vendedores/buscar?g=${encodeURIComponent(query)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Agrega headers adicionales si los necesitas, como autenticación.
        }
    })
    .then(response => response.json())
    .then(data => {
        const resultadosContainer = document.getElementById("resultados");
        resultadosContainer.innerHTML = ""; // Limpiar resultados anteriores

        if (data.length === 0) {
            resultadosContainer.innerHTML = "<p>No se encontraron resultados.</p>";
            return;
        }

        data.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("resultado-item");
            itemElement.innerHTML = `<p>${item.nombre}</p><p>${item.descripcion}</p>`;
            resultadosContainer.appendChild(itemElement);
        });
    })
    .catch(error => {
        console.error("Error en la búsqueda:", error);
        alert("Hubo un problema al realizar la búsqueda.");
    });
}
