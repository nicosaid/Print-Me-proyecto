document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", enviarDatosLogin);
    } else {
        console.error("No se encontró el formulario de login.");
    }
});

const validateInputs = () => {
    const mail = document.getElementById("mail").value;
    const contraseña = document.getElementById("contraseña").value;

    if (mail === "") {
        alert("Por favor, ingresa tu correo electrónico.");
        return false;
    }
    
    if (contraseña === "") {
        alert("Porfavor, ingrese su contraseña")
        return false;
    }
    return true;
}

function enviarDatosLogin(e) {
    e.preventDefault();

    if (!validateInputs()) {
        return; // Si la validación falla, salir de la función
    }

    const mail = document.getElementById("mail");
    const contraseña = document.getElementById("contraseña");
   
    const send_data = {
        mail: mail.value,
        contraseña: contraseña.value,  
    };

    fetch("https://print-me-ten.vercel.app/login/login", {  
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(send_data),
    })
    .then((data) => {
        console.log("Respuesta del servidor",send_data);
        console.log("Respuesta del servidor:", data);
        if (data.status === 200) {
            console.log("200");
            return data.json();
        } else if (data.status === 400) {
            console.log("Error: No se pudo completar la solicitud.");
            alert("Alguno de los datos introducidos es incorrecto");
        }
    })
    .then((data) => {
        console.log("data");
        if (data && data.token) {
            if (!data.data.id || isNaN(data.data.id)) {
                console.error("El ID recibido no es válido:", data.data.id);
                alert("Ocurrió un error con el ID del usuario. Inténtalo de nuevo.");
                return; // Salir si el ID no es válido
            }
            console.log("Datos enviados exitosamente:", data);
            localStorage.setItem("token", data.token);
            localStorage.setItem('LoginId', data.data.id);
            window.location.href = "/dueño/html/inicio.html";
        } else {
            console.error('Datos incompletos en la respuesta del servidor:', data);
        }
        })
    .catch((error) => {
        console.log("error");
        console.error(error);
        alert("Hubo un problema con el envío de los datos.");
    });
}