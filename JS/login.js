function mostrarAlerta(mensaje, tipo = 'error') {
    const alerta = document.getElementById('customAlert');
    alerta.textContent = mensaje;
    alerta.className = `custom-alert ${tipo}`;
    alerta.style.display = 'block';

    setTimeout(() => {
        alerta.style.display = 'none';
    }, 3000);
}

function startGame() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('email', email);
        window.location.href = 'menu.html'; // redirige a la edición de perfil
    } else {
        mostrarAlerta("Correo o contraseña incorrectos", "error");
    }
}

function register() {

    recuperarDatosFormularioRegistro();

    if (nombre && apellido && password && correo) {
        const usersExistente = getJSONDeLocalStore(localStorage);

        if (usersExistente.some(u => u.email === email)) {
            mostrarAlerta("Este correo electrónico ya está registrado", "warning");
            return;
        }
        const usuario = new Usuario(getValorSecuenciaUsuario,nombre.value,apellido.value,"",password.value,email.value,"Estudiante")
        users.push(usuario);

        mostrarAlerta(`Usuario ${newUsername} registrado correctamente.`, "success");
        toggleForm();
    } else {
        mostrarAlerta("Por favor completa todos los campos", "warning");
    }
}

function toggleForm() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const formTitle = document.getElementById('form-title');

    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');

    if (!loginForm.classList.contains('hidden')) {
        formTitle.innerHTML = 'Inicio Sesión <i class="fas fa-user-lock"></i>';
    } else {
        formTitle.innerHTML = 'Registro <i class="fas fa-user-plus"></i>';
    }
}