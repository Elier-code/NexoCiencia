function register() {
    const newUsername = document.getElementById('new-username').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!newUsername || !surname || !email || !password || !confirmPassword) {
        alert("Por favor completa todos los campos");
        return;
    }

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // Opcional: guardar datos en localStorage para pruebas
    const user = {
        nombre: newUsername,
        apellido: surname,
        correo: email,
    };
    localStorage.setItem('user', JSON.stringify(user));

    alert(`Usuario ${newUsername} ${surname} registrado correctamente.`);
    toggleForm(); // Cambia a vista de login
}
