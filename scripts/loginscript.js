document.addEventListener("DOMContentLoaded", () => {
    console.log("Script cargado y DOM listo");

    const loginForm = document.getElementById("login-form");
    console.log("Formulario encontrado:", loginForm);

    if (loginForm) {
        loginForm.addEventListener("submit", enviarDatosLogin);
        console.log("EventListener de submit añadido");
    } else {
        console.error("El formulario de login no se encontró en el DOM.");
    }
});

function validarFormulario() {

    var mail = document.getElementById("mail").value;
    var contra = document.getElementById("contra").value;


    if (mail === "") {
        alert("Por favor, ingresa tu correo electrónico.");
        return false;
    }

    // Verificar que el email sea válido
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(mail)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return false;
    }

    if (contra === "") {
        alert("Porfavor, ingrese su contraseña")
        return false;
    }
    return true;
}

function enviarDatosLogin(e) {
    e.preventDefault(); // Previene que se recargue la página al enviar el formulario
    const mail = document.getElementById("mail");
    const contraseña = document.getElementById("contraseña");
    const nombre_apellido = document.getElementById("nombre_apellido");

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
            console.log("Error: No se pudo completar la solicitud.");
            alert("Alguno de los datos introducidos es incorrecto");
        }
    })
    .then((data) => {
        if (data && data.token) {
            console.log("Datos enviados exitosamente:", data);
            localStorage.setItem("token", data.token);
            alert("Login exitoso.");
        }
    })
    .catch((error) => {
        console.log("hubo error");
        console.error(error);
        alert("Hubo un problema con el envío de los datos.");
    });
}

function ConfirmarLogin() {
    document.getElementById("form").addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar que la página se recargue
        console.log("entra");

        // Llamamos a la función de validación de datos
        if (validarFormulario()) {
            // Si los datos son válidos, enviamos los datos
            enviarDatosLogIn();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    if (registroForm) {
        registroForm.addEventListener("submit", enviarDatosRegistro);
    } else {
        console.error("El formulario de registro no se encontró en el DOM.");
    }
})