function enviarDatosRegistro(e) {
    e.preventDefault();
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
    fetch("print-me1.vercel.app/registercomprador/registercomp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.status === 200) {
                console.log("200")
                return response.json();
            } else if (response.status === 400) {
                console.log("Error: No se pudo completar la solicitud.");
                alert("Alguno de los datos introducidos es incorrecto")
            }
        })
        .then((data) => {
            if (data && data.token) {
                console.log("Datos enviados exitosamente:", data);
                localStorage.setItem("token", data.token);
                alert("Registro exitoso.");
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
            enviarDatosRegistro();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("registro-form");
    loginForm.addEventListener("submit", enviarDatosLogIn);
})