let postImpresionValue; // Declaración global de la variable

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById('registro-form');
    const username = document.getElementById('nombre_apellido');
    const mail = document.getElementById('mail');
    const contraseña = document.getElementById('contraseña');
    const contraseña2 = document.getElementById('contraseña2');

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
    };
        });
      
//esta funcion es para que se ponga el borde rojo y aparezca el mensaje en caso de error
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')     
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

