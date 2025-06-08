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
    localStorage.removeItem(localStorageSession);
    window.location.href = "../index.html"; // Redirigir al cerrar sesión
}

