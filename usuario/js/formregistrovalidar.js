document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById('registro-form');
    const username = document.getElementById('nombre_apellido');
    const mail = document.getElementById('mail');
    const contraseña = document.getElementById('contraseña');
    const contraseña2 = document.getElementById('contraseña2');

    const a = form.addEventListener('submit', e => {
        e.preventDefault();
        console.log("El 'submit' event listener está leyendo los siguientes valores:");
        console.log(`Nombre y Apellido: ${username.value}`);
        console.log(`Email: ${mail.value}`);
        console.log(`Contraseña: ${contraseña.value}`);
        console.log(`Confirmación de Contraseña: ${contraseña2.value}`);
        validateInputs();
    });

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

    const isValidEmail = mail => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(mail).toLowerCase());
    }

    const validateInputs = () => {
        const usernameValue = nombre_apellido.value.trim();
        const mailValue = mail.value.trim();
        const contraseñaValue = contraseña.value.trim();
        const contraseña2Value = contraseña2.value.trim();

        if (usernameValue === '') {
            setError(nombre_apellido, 'Usuario requerido');
        } else {
            setSuccess(nombre_apellido);
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
            setError(contraseña, 'La contraseña debe tener tener mas de 8 caracteres.')
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
    }
})