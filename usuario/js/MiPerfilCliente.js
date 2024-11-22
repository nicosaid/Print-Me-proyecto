const id = localStorage.getItem('LoginId');
console.log("ID actual:", id);

if (id) {
    fetch(`http://print-me-ten.vercel.app/compradores/compradorByID/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const comprador = data.comprador;

            if (!comprador) {
                throw new Error("No se encontró el comprador en la respuesta");
            }

            console.log("Datos del comprador:", comprador);

            const nombreElemento = document.getElementById("nombre-apellido");
            const mailElemento = document.getElementById('mail');

            if (nombreElemento) nombreElemento.value = comprador.nombre_apellido || "Sin nombre";
            if (mailElemento) mailElemento.value = comprador.mail || "Sin mail";
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error.message);
            alert("No se pudieron cargar los datos del perfil. Inténtalo más tarde.");
        });
} else {
    console.error('No se encontró id en localStorage.');
    alert("Por favor, inicia sesión para acceder a tu perfil.");
}

//EDITAR DATOS

function actualizarCampoEnServidor(campo, valor) {

  if (!id) {
      alert("ID de usuario no encontrado. Por favor, inicia sesión.");
      return;
  }

  const datosActualizados = { [campo]: valor };

  fetch(`http://print-me-ten.vercel.app/compradores/updatecomprador/${id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(datosActualizados)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Error al actualizar: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      console.log("Actualización exitosa:", data);
      alert("Cambios guardados correctamente.");
  })
  .catch(error => {
      console.error("Error al actualizar el campo:", error.message);
      alert("Error al guardar los cambios. Inténtalo más tarde.");
  });
}

//HACER EL CAMBIAR CONTRASEÑA