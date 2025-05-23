// auth.js

function checkSession(redirectIfNotLogged = false) {
    const user = getJSONDeLocalStore("sessionUser");
    if (!user && redirectIfNotLogged) {
        window.location.href = "../index.html"; // Redirigir si no hay sesión
    }
    return user;
}

function showUserName() {
    const user = checkSession();
    if (user) {

        const span = document.getElementById("nombreSesion");
        if (span) span.textContent = user[0].nombre;
    }
}

function logout() {
    localStorage.removeItem("sessionUser");
    window.location.href = "../index.html"; // Redirigir al cerrar sesión
}

showUserName()
checkSession(true)
