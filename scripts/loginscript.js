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

function enviarDatosLogIn(e) {
    e.preventDefault();
    console.log("entro a la funcion enviar datos Log In")
    const mail = document.getElementById("mail");
    const contra = document.getElementById("contra");

    //const telefono = document.querySelector("input[name='telefono']").value;
    //const email = document.querySelector("input[name='email']").value;
    //const contrasena = document.querySelector("input[name='contrasena']").value;

    const data = {
        mail: mail.value,
        contra: contra.value

    };
    console.log(data);
    fetch("print-me1.vercel.app/login/login", {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.status === 200) {
                console.log("200")
                return response.json();
            } 
            else if (response.status === 400) {
                console.log("Error: No se pudo completar la solicitud.");
                alert("Alguno de los datos introducidos es incorrecto")
            }
        })
        .then((data) => {
            if (data && data.token) {
                console.log("Datos enviados exitosamente:", data);
                localStorage.setItem("token", data.token);
                alert("LogIn exitoso.");

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
    loginForm.addEventListener("submit", enviarDatosLogIn);
})