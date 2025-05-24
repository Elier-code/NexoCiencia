function mostrarAlerta(mensaje, tipo = 'error') {
    const alerta = document.getElementById('customAlert');
    alerta.textContent = mensaje;
    alerta.className = `custom-alert ${tipo}`;
    alerta.style.display = 'block';

    setTimeout(() => {
        alerta.style.display = 'none';
    }, 3000);
}

function habilitarEdicion(id) {
    const input = document.getElementById(id);
    input.disabled = false;
    input.focus();
}

function guardarCambios() {
    var sesion = getJSONDeLocalStore("sessionUser");
    const emailActivo = sesion[0].correo;
    var users = getJSONDeLocalStore("usuarios") || [];
    var index = -1
    for (let i = 0; i < users.length; i++) {

        if (users[i].correo == emailActivo) {

            index = i
            break
        }

    }

    if (index !== -1) {
        users[index].nombres = document.getElementById('nombre').value;
        users[index].apellido = document.getElementById('apellido').value;
        users[index].correo = document.getElementById('correo').value;
        users[index].contraseña = document.getElementById('contrasena').value;
        
        setJSONDeLocalStore("usuarios", users)

        document.querySelectorAll('input').forEach(input => input.disabled = true);
        mostrarAlerta("¡Cambios guardados exitosamente!", "success");
        cargarDatos()
    } else {
        mostrarAlerta("Usuario no encontrado", "error");
    }
}

function cargarDatos() {
    const sesion = getJSONDeLocalStore("sessionUser");
    const emailActivo = sesion[0].correo;

    var users = getJSONDeLocalStore("usuarios") || [];
    var index = -1
    for (let i = 0; i < users.length; i++) {

        if (users[i].correo == emailActivo) {

            index = i
            var user = users[i];
            break
        }

    }

    if (user) {
        document.getElementById('nombre').value = user.nombres || '';
        document.getElementById('apellido').value = user.apellidos || '';
        document.getElementById('correo').value = user.correo || '';
        document.getElementById('contrasena').value = user.contraseña || '';
    } else {
        mostrarAlerta("No se encontró información del usuario", "warning");
    }
}

// window.onload = cargarDatos();