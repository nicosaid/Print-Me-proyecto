try{
    const response = await fetch(server, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    // Procesa el JSON de la respuesta solo si el estado es 200
    if (response.status === 200) {
        const data = await response.json();
        
if (data.token) {
    localStorage.setItem('token', data.token); // Guarda el token en localStorage
    dialogBox.style.display = "block"; // Muestra el cuadro de diálogo si el login es exitoso
    errorMessage.style.display = "none";
    console.log("Login successful, token received");
} else {
    console.error('Error: Token no recibido');
}

