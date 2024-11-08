//BORRADOR
fetch("https://print-me-ten.vercel.app")
.then((response) => {
    if (response.status === 200) {
        console.log("200");
        return response.text();
    } else if (response.status === 400) {
        console.log("Error: No se pudo completar la solicitud.");
        alert("Alguno de los datos introducidos es incorrecto");
    }
})
.then((data) => {
    alert(data)
})
.catch((error) => {
    console.log("hubo error");
    console.error(error);
    alert("Hubo un problema con el envío de los datos.");
});
