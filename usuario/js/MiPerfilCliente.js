const id = localStorage.getItem('LoginId');
console.log("ID actual:", id); // Debug: Verificar el valor del ID
const token = localStorage.getItem('token');
console.log("Token actual:", token); // Debug: Verificar el valor del token

if (!id) {
    console.error("No se encontró el ID en localStorage.");
    alert("Por favor, inicia sesión para acceder a tu perfil.");
    throw new Error("No se puede continuar sin un ID válido.");
}

fetch(`https://print-me-ten.vercel.app/compradores/compradorByID/${id}`, {
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
        const comprador = data.comprador;

        if (!comprador) {
            throw new Error("No se encontró el comprador en la respuesta");
        }

        console.log("Datos del comprador:", comprador);

        const nombreElemento = document.getElementById("nombre-apellido");
        const mailElemento = document.getElementById('mail');

        if (nombreElemento) nombreElemento.value = comprador.nombre_apellido || "Sin nombre";
        if (mailElemento) mailElemento.value = comprador.mail || "Sin mail";
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error.message);
        alert("No se pudieron cargar los datos del perfil. Inténtalo más tarde.");
    });
