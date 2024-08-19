function validarContraseña() {
    var contra = document.getElementById("contra").value;
    var confirmarContraseña = document.getElementById("confirmarContra").value;
    if (contra !== confirmarContra) {
      alert("Las contraseñas no coinciden");
      return false;
    }
  else
  {
    return true;
  } }