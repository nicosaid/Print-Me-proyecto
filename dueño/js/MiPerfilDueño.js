const id = localStorage.getItem('LoginId');
console.log("ID actual:", id); // Debug: Verificar el valor del ID
const token = localStorage.getItem('token');
console.log("Token actual:", token); // Debug: Verificar el valor del token

if (!id) {
    console.error("No se encontró el ID en localStorage.");
    alert("Por favor, inicia sesión para acceder a tu perfil.");
    throw new Error("No se puede continuar sin un ID válido.");
}

fetch(`https://print-me-ten.vercel.app/vendedores/vendedorByID/${id}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const vendedor = data.vendedor;

        if (!vendedor) {
            throw new Error("No se encontró el vendedor en la respuesta");
        }

        console.log("Datos del vendedor:", vendedor);

        const nombreElemento = document.getElementById("nombre");
        const mailElemento = document.getElementById('mail');
        const descripcionElemento = document.getElementById("description-input");
        const zonaElemento = document.getElementById('zona-select');
        const impresoraElemento = document.getElementById('impresora-input');
        const filamentoElemento = document.getElementById('filamento-input');

        if (nombreElemento) nombreElemento.value = vendedor.nombre_apellido || "Sin nombre";
        if (mailElemento) mailElemento.value = vendedor.mail || "Sin mail";
        if (descripcionElemento) descripcionElemento.value = vendedor.descripcion || "Sin nombre";
        if (zonaElemento) zonaElemento.value = vendedor.zona || "Sin nombre";
        if (impresoraElemento) impresoraElemento.value = vendedor.impresora_modelo || "Sin nombre";
        if (filamentoElemento) filamentoElemento.value = vendedor.materiales || "Sin nombre";
        //if (procesadoElemento) procesadoElemento.value = vendedor.post_procesado || "Sin nombre";
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error.message);
        alert("No se pudieron cargar los datos del perfil. Inténtalo más tarde.");
    });
