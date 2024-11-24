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
        alert("Por favor, ingresa tu contraseña.");
        return false;
    }

    return true;
};

function enviarDatosLogin(e) {
    e.preventDefault();

    if (!validateInputs()) {
        return; // Si la validación falla, salir de la función
    }

    const mail = document.getElementById("mail").value;
    const contraseña = document.getElementById("contraseña").value;

    const requestData = {
        mail: mail,
        contraseña: contraseña,
    };

    console.log("Datos enviados al servidor:", JSON.stringify(requestData));

    fetch("https://print-me-ten.vercel.app/login/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    })
    .then((response) => {
        console.log("Estado de la respuesta:", response.status);
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 400) {
            console.error("Error 400: Solicitud incorrecta.");
            alert("Alguno de los datos introducidos es incorrecto.");
            throw new Error("Bad Request");
        } else {
            console.error("Error no manejado, código de estado:", response.status);
            throw new Error("Unexpected Error");
        }
    })
    .then((responseData) => {
        console.log("Respuesta completa del servidor:", responseData);

        // Validar la estructura de la respuesta
        if (responseData && responseData.token) {
            const userId = responseData.data?.id;
            if (!userId || isNaN(userId)) {
                console.error("El ID recibido no es válido:", userId);
                alert("Ocurrió un error con el ID del usuario. Inténtalo de nuevo.");
                return;
            }

            // Guardar token e ID en localStorage
            localStorage.setItem("token", responseData.token);
            localStorage.setItem("LoginId", userId);

            // Redireccionar al usuario
            window.location.href = "/usuario/html/servicioimpresion3d.html";
        } else {
            console.error("El token no fue recibido o la estructura de la respuesta es incorrecta.");
            alert("Hubo un problema con la autenticación. Inténtalo de nuevo.");
        }
    })
    .catch((error) => {
        console.error("Error al procesar la solicitud:", error);
        alert("Hubo un problema con el envío de los datos. Inténtalo de nuevo.");
    });
}
