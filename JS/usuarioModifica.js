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
    const emailActivo = localStorage.getItem('email');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const index = users.findIndex(u => u.email === emailActivo);

    if (index !== -1) {
        users[index].username = document.getElementById('nombre').value;
        users[index].surname = document.getElementById('apellido').value;
        users[index].email = document.getElementById('correo').value;
        users[index].password = document.getElementById('contrasena').value;

        localStorage.setItem('email', users[index].email);
        localStorage.setItem('users', JSON.stringify(users));

        document.querySelectorAll('input').forEach(input => input.disabled = true);
        mostrarAlerta("¡Cambios guardados exitosamente!", "success");
    } else {
        mostrarAlerta("Usuario no encontrado", "error");
    }
}

function cargarDatos() {
    const emailActivo = localStorage.getItem('email');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.email === emailActivo);

    if (user) {
        document.getElementById('nombre').value = user.username || '';
        document.getElementById('apellido').value = user.surname || '';
        document.getElementById('correo').value = user.email || '';
        document.getElementById('contrasena').value = user.password || '';
    } else {
        mostrarAlerta("No se encontró información del usuario", "warning");
    }
}

window.onload = cargarDatos;