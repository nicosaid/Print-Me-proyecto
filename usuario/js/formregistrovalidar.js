let postImpresionValue; // Declaración global de la variable
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById('registro-form');
    const username = document.getElementById('nombre_apellido');
    const mail = document.getElementById('mail');
    const contraseña = document.getElementById('contraseña');
    const contraseña2 = document.getElementById('contraseña2');
    const telefono = document.getElementById("telefono");
    const residencia = document.getElementById("residencia");
    const modeloImpresora = document.getElementById("modelo-impresora");
    const material = document.getElementById("material");

    form.addEventListener('submit', e => {
        e.preventDefault();
        validateInputs();
    });

    const isValidEmail = mail => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(mail).toLowerCase());
    }

    const validateInputs = () => {
        const usernameValue = username.value.trim();
        const mailValue = mail.value.trim();
        const contraseñaValue = contraseña.value.trim();
        const contraseña2Value = contraseña2.value.trim();
        const telefonoValue = telefono.value.trim();
        const residenciaValue = residencia.value;
        const modeloImpresoraValue = modeloImpresora.value;
        const materialValue = material.value;
        const postImpresion = document.querySelector("input[name='radio-group']:checked");

        if (usernameValue === '') {
            setError(username, 'Usuario requerido');
        } else {
            setSuccess(username);
        }

        if (mailValue === '') {
            setError(mail, 'Email requerido');
        } else if (!isValidEmail(mailValue)) {
            setError(mail, 'Ingrese una direccion email valida');
        } else {
            setSuccess(mail);
        }

        if (contraseñaValue === '') {
            setError(contraseña, 'Contraseña requerida');
        } else if (contraseñaValue.length < 8) {
            setError(contraseña, 'La contraseña debe tener mas de 8 caracteres.')
        } else {
            setSuccess(contraseña);
        }

        if (contraseña2Value === '') {
            setError(contraseña2, 'Porfavor confirma tu contraseña');
        } else if (contraseña2Value !== contraseñaValue) {
            setError(contraseña2, "Las contraseñas no coinciden");
        } else {
            setSuccess(contraseña2);
        }

        if (telefonoValue === '') {
            setError(telefono, 'Teléfono requerido');
        } else if (!/^\d{10}$/.test(telefonoValue)) {
            setError(telefono, 'El teléfono debe tener exactamente 10 dígitos');
        } else {
            setSuccess(telefono);
        }

        if (residenciaValue === '') {
            setError(residencia, 'Seleccione una zona de residencia');
        } else {
            setSuccess(residencia);
        }

        if (modeloImpresoraValue === '') {
            setError(modeloImpresora, 'Seleccione un modelo de impresora');
        } else {
            setSuccess(modeloImpresora);
        }

        if (materialValue === '') {
            setError(material, 'Seleccione un material');
        } else {
            setSuccess(material);
        }

        if (!postImpresion) {
            // Si ninguno de los radio buttons está seleccionado, mostrar un mensaje de error
            setError(document.querySelector('.radio-button-container'),'Seleccione una opción de post impresión');
            return false; // No permitir el envío del formulario
        } else {
            // Si uno de los radio buttons está seleccionado, ejecutar la lógica
            setSuccess(document.querySelector('.radio-button-container'));
    
            // Verificar cuál de los radio buttons está seleccionado
            if (postImpresion.id === "radio1") {
                postImpresionValue = true;
            } else if (postImpresion.id === "radio2") {
                postImpresionValue = false;
            }
    
            return true; // Permitir el envío del formulario
        }
    };
        });
      
//esta funcion es para que se ponga el borde rojo y aparezca el mensaje en caso de error
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
   // element.classList.add('error');// Aplica borde rojo al select o radio button container      
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

