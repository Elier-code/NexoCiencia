var localStorage = "usuarios"
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
    var usuarios = getJSONDeLocalStore(localStorage) || []

    sw = false

    for (const usuarioJSON of usuarios) {

        if (email == usuarioJSON.correo && password == usuarioJSON.contraseña) {

            switch (usuarioJSON.tipoUsuario) {

                case 'estudiante':
                    var datosSesion = new SesionUsuario(usuarioJSON.nombres,usuarioJSON.correo)
                    var sesion = getJSONDeLocalStore("sessionUser")
                    sesion.push(datosSesion)
                    setJSONDeLocalStore("sessionUser", sesion)
                    window.location.href = '../HTML/usuario.html'
                    break

                case 'administrador':
                    var datosSesion = new SesionUsuario(usuarioJSON.nombres,usuarioJSON.correo)
                    var sesion = getJSONDeLocalStore("sessionUser")
                    sesion.push(datosSesion)
                    setJSONDeLocalStore("sessionUser", sesion)
                    window.location.href = '../HTML/inicioAdmin.html'
                    break
                case 'profesor':
                    var datosSesion = new SesionUsuario(usuarioJSON.nombres,usuarioJSON.correo)
                    var sesion = getJSONDeLocalStore("sessionUser")
                    sesion.push(datosSesion)
                    setJSONDeLocalStore("sessionUser", sesion)
                    window.location.href = '../HTML/profesor.html'
                    break
            }

            sw = true

            break
        }

    }


    if (!sw)
        mostrarAlerta("Correo o contraseña incorrectos", "error");

}

function register() {

    recuperarDatosFormularioRegistro();
    var users = getJSONDeLocalStore(localStorage)
    if (nombre && apellido && password && correo) {
        const usersExistente = getJSONDeLocalStore(localStorage);

        if (usersExistente.some(u => u.email === email)) {
            mostrarAlerta("Este correo electrónico ya está registrado", "warning");
            return;
        }
        const usuario = new Usuario(getValorSecuenciaUsuario, nombre.value, apellido.value, "", password.value, email.value, "estudiante")
        users.push(usuario);

        mostrarAlerta(`Usuario ${nombre.value} registrado correctamente.`, "success");
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