function enviarDatosRegistro(e) {
    e.preventDefault(); // Previene que se recargue la página al enviar el formulario
    const nombre_apellido = document.getElementById("nombre_apellido");
    const mail = document.getElementById("mail");
    const contraseña = document.getElementById("contraseña");
    const telefono = document.getElementById("telefono");
    const residencia = document.getElementById("residencia");
    const modeloImpresora = document.getElementById("modelo-impresora");
    const material = document.getElementById("material");
    const postImpresion = document.querySelector("input[name='radio-group']:checked")?.id === "radio1"; // Verifica si se seleccionó "Sí" o "No"

    const data = {
        nombre_apellido: nombre_apellido.value,
        mail: mail.value,
        contraseña: contraseña.value,
        telefono: telefono.value,
        residencia: residencia.value,
        modeloImpresora: modeloImpresora.value,
        material: material.value,
        postImpresion
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
            console.log("Error: No se pudo completar la solicitud.");
            alert("Alguno de los datos introducidos es incorrecto");
        }
    })
    .then((data) => {
        if (data) {
            console.log("Registro exitoso", data);
        }
    })
    .catch((error) => {
        console.log("hubo error");
        console.error(error);
        alert("Hubo un problema con el envío de los datos.");
    });
}

// Escuchar el evento submit del formulario cuando el DOM está cargado
document.addEventListener("DOMContentLoaded", () => {
    const registroForm = document.getElementById("registro-form");
    if (registroForm) {
        registroForm.addEventListener("submit", enviarDatosRegistro);
    } else {
        console.error("El formulario de registro no se encontró en el DOM.");
    }
});

