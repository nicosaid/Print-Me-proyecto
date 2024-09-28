<script>
function editField(id) {
    var field = document.getElementById(id);
    field.disabled = false; // Habilita el campo para edición
    field.classList.remove('disabled'); // Elimina la clase de estilo deshabilitado

    // Cambiar el botón a un botón de guardar
    var button = field.nextElementSibling;
    button.innerHTML = '<i class="fas fa-save"></i>';
    button.setAttribute('onclick', 'saveField("' + id + '")');
}

function saveField(id) {
    var field = document.getElementById(id);
    field.disabled = true; // Deshabilita el campo nuevamente
    field.classList.add('disabled'); // Agrega la clase de estilo deshabilitado

    var button = field.nextElementSibling;
    button.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    button.setAttribute('onclick', 'editField("' + id + '")');

    alert('Cambios guardados para el campo: ' + id);
}
</script> 