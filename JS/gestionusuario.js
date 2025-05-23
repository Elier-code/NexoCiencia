
var localStorage = "usuarios"
var usuarios = getJSONDeLocalStore(localStorage)
const adminExiste = usuarios.some(
    (u) => u.userName === "ElierN" && u.tipoUsuario === "administrador"
);
if(!adminExiste){
    const adim = new Usuario(getValorSecuenciaUsuario(), "Elier", "Narvaez Velasquez", "ElierN", "12345", "eliernarvaez93@gmail.com", "administrador")
    usuarios.push(adim)
    setJSONDeLocalStore(localStorage,usuarios)
}





function listarUsuarios() {

    const listar = document.getElementById("lista")
    const tbody = listar.querySelector('tbody')

    for (const i in usuarios) {

        var fila = document.createElement("tr")
        var id = document.createElement("td")
        var nombre = document.createElement("td")
        var apellido = document.createElement("td")
        var correo = document.createElement("td")
        var rolUser = document.createElement("td")
        var acciones = document.createElement("td")
        var eliminar = document.createElement("button")
        var editar = document.createElement("button")


        id.textContent = usuarios[i].idUsuario
        nombre.textContent = usuarios[i].nombres
        apellido.textContent = usuarios[i].apellidos
        correo.textContent = usuarios[i].correo
        rolUser.textContent = usuarios[i].tipoUsuario

        eliminar.textContent = "Eliminar"
        eliminar.className = "eliminar"
        eliminar.onclick = function () { mostrarAlertaEliminar() }
        editar.textContent = "Editar"
        editar.className = "editar"
        acciones.className = "acciones"
        acciones.appendChild(editar)
        acciones.appendChild(eliminar)

        fila.appendChild(id)
        fila.appendChild(nombre)
        fila.appendChild(apellido)
        fila.appendChild(correo)
        fila.appendChild(rolUser)
        fila.appendChild(acciones)


        tbody.appendChild(fila)

    }
    listar.appendChild(tbody)
}

function guardarUsurio(){
    recuperarDatosFormulario()
    var usuarios = getJSONDeLocalStore(localStorage)
    const usuario = new Usuario(getValorSecuenciaUsuario(),nombre.value,apellido.value,"","09876",correo.value,tipoUsuario.value)
    usuarios.push(usuario)
    setJSONDeLocalStore(localStorage,usuarios)
    limpiarFormulario()
    alertaGuardar()
}











function limpiarFormulario(){
    document.getElementById("name").value = ""
    document.getElementById("apellido").value = ""
    document.getElementById("email").value = ""
    document.getElementById("tipoUsuario").value = ""
}




function recuperarDatosFormularioRegistro(){
    this.nombre = document.getElementById("name")
    this.apellido = document.getElementById("apellido")
    this.correo = document.getElementById("email")
    this.password = document.getElementById("password")
}

function recuperarDatosFormulario(){
    this.nombre = document.getElementById("name")
    this.apellido = document.getElementById("apellido")
    this.correo = document.getElementById("email")
    this.tipoUsuario = document.getElementById("tipoUsuario")
}