// auth.js

function checkSession(redirectIfNotLogged = false) {
    const user = getJSONDeLocalStore(localStorageSession);
    if (!user || user.length === 0) {
        if (redirectIfNotLogged) {
            window.location.href = "../index.html"; // redirección si no hay sesión
        }
        return null;
    }
    return user;
}

function showUserName() {
    const user = checkSession();
    if (user) {
        const span = document.getElementById("nombreSesion");
        if (span) {
            span.textContent = user[0].nombres;
        }
    }
}

function logout() {
    // Usar SweetAlert2 para mostrar el modal de confirmación
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas cerrar la sesión?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Limpiar la sesión
    localStorage.removeItem(localStorageSession);
            localStorage.removeItem('theme');
            
            // Obtener la ruta base del sitio
            const currentPath = window.location.pathname;
            const pathToRoot = currentPath.split('/HTML/')[0];
            
            // Mostrar mensaje de éxito antes de redirigir
            Swal.fire({
                title: '¡Sesión cerrada!',
                text: 'Has cerrado sesión exitosamente',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                // Redirigir a la página principal
                window.location.href = pathToRoot + '/index.html';
            });
        }
    });
}

// Agregar event listener para el botón de logout
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.querySelector('.btn-logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});

