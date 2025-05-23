class Usuario{
    constructor(idUsuario,nombres,apellidos,usuario,contraseña,correo,tipoUsuario){
        this.idUsuario = idUsuario
        this.nombres = nombres
        this.apellidos = apellidos
        this.userName = usuario
        this.contraseña = contraseña
        this.correo = correo
        this.tipoUsuario = tipoUsuario
    }
}
























// function mostrarAlertaPersonalizada(mensaje) {
//     const alerta = document.getElementById('customAlert');
//     alerta.textContent = mensaje;
//     alerta.classList.add('show');

//     setTimeout(() => {
//         alerta.classList.remove('show');
//     }, 3000);
// }

// function actualizarDatosUsuario() {
//     mostrarAlertaPersonalizada("Redirigiendo a la página de edición de datos del usuario...");
//     setTimeout(() => {
//         window.location.href = "usuarioModifica.html";
//     }, 1500);
// }

// function verProgreso() {
//     mostrarAlertaPersonalizada("Mostrando resumen del progreso del usuario...");
//     // Puedes redirigir si deseas:
//     // setTimeout(() => { window.location.href = "/usuario/progreso.html"; }, 1500);
// }