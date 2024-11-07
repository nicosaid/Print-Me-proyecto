fetch("https://print-me-ten.vercel.app/registercomprador/registercomp", {  
    method: "GET",
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
        alert("Registro exitoso.");
    }
})
.catch((error) => {
    console.log("hubo error");
    console.error(error);
    alert("Hubo un problema con el envío de los datos.");
});
}