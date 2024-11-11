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
        if (response.status === 200) {
            console.log("200");
            return response.json();
        } else if (response.status === 400) {
            console.log("datos incorrectos");
        }
    })
    .then((data) => {
        console.log("Registro exitoso", data);
        window.location.href = '/general/html/sesion.html';
    })
    .catch((error) => {
        console.log("error con el envio de datos");
        console.error(error);
    });
}
