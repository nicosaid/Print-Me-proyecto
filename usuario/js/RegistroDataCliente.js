// Escuchar el evento submit del formulario cuando el DOM está cargado
document.addEventListener("DOMContentLoaded", () => {
    const registroForm = document.getElementById("registro-form");
    if (registroForm) {
        registroForm.addEventListener("submit", enviarDatosRegistro);
    } else {
        console.error("El formulario de registro no se encontró en el DOM.");
    }
});

function enviarDatosRegistro(e) {
    e.preventDefault(); // Previene que se recargue la página al enviar el formulario
    const nombre_apellido = document.getElementById("nombre_apellido");
    const mail = document.getElementById("mail");
    const contraseña = document.getElementById("contraseña");
   // Validar que los campos no estén vacíos
   if (!nombre_apellido || !mail || !contraseña) {
    alert("Por favor, llena todos los campos.");
    return;
}
    const data = {
        mail: mail.value,
        contraseña: contraseña.value,
        nombre_apellido: nombre_apellido.value,

    };
    console.log(data);

    fetch("https://print-me-ten.vercel.app/registercomprador/registercomp", {  
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 400) {
            throw new Error(`Error: ${response.statusText}`);
        }
    })
    .then((data) => {
        console.log("Registro exitoso", data);
        window.location.href = '/general/html/sesion.html';
    })
    .catch((error) => {
        console.error("Error con el envío de datos", error);
    });
}
