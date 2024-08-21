const form = document.getElementById('FormRegistro');
const username = document.getElementById('Usuario');
const email = document.getElementById('email');
const contra = document.getElementById('contra');
const contra2 = document.getElementById('contra2');

form.addEventListener('submit', e => {
    e.preventDefault();
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

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = usuario.value.trim();
    const emailValue = email.value.trim();
    const contraValue = contra.value.trim();
    const contra2Value = contra2.value.trim();

    if(usernameValue === '') {
        setError(usuario, 'Usuario requerido');
    } else {
        setSuccess(usuario);
    }

    if(emailValue === '') {
        setError(email, 'Email requerido');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Ingrese una direccion email valida');
    } else {
        setSuccess(email);
    }

    if(contraValue === '') {
        setError(contra, 'Contraseña requerida');
    } else if (contraValue.length < 8 ) {
        setError(contra, 'La contraseña debe tener tener mas de 8 caracteres.')
    } else {
        setSuccess(contra);
    }

    if(contra2Value === '') {
        setError(contra2, 'Porfavor confirma tu contraseña');
    } else if (contra2Value !== contraValue) {
        setError(contra2, "Las contraseñas no coinciden");
    } else {
        setSuccess(contra2);
    }
}
