
var localStorage = "usuarios"
var usuarios = getJSONDeLocalStore(localStorage)
const adminExiste = usuarios.some(
    (u) => u.userName === "ElierN" && u.tipoUsuario === "administrador"
);
if (!adminExiste) {
    const adim = new Usuario(getValorSecuenciaUsuario(), "Elier", "Narvaez Velasquez", "ElierN", "12345", "eliernarvaez93@gmail.com", "administrador")
    usuarios.push(adim)
    setJSONDeLocalStore(localStorage, usuarios)
}





function listarUsuarios() {

    const listar = document.getElementById("lista")
    const tbody = listar.querySelector('tbody')

    const usuarios = getJSONDeLocalStore(localStorage)

    for (const i in usuarios ) {

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
        eliminar.onclick = function () { obtenerIdUsuarioTabla(this) }
        editar.textContent = "Editar"
        editar.className = "editar"
        editar.onclick = function () { editarFila(this) }
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

function guardarUsuario() {
    recuperarDatosFormulario()
    var usuarios = getJSONDeLocalStore(localStorage)
    var resultado = -1
    for (let i = 0; i < usuarios.length; i++) {

        if (usuarios[i].correo == correo.value) {

            resultado = i
        }

    }

    if (resultado == -1) {
        const usuario = new Usuario(getValorSecuenciaUsuario(), nombre.value, apellido.value, "", "09876", correo.value, tipoUsuario.value)
        usuarios.push(usuario)
        setJSONDeLocalStore(localStorage, usuarios)
        limpiarFormulario()
        alertaGuardar()

    }else{
        alertaError("El correo ingresado ya exite")

    }
}

function actualizarUsuario(id, usarioActualizado) {
    this.usuarios = getJSONDeLocalStore(localStorage)
    this.id = id

    var indice = buscarIndiceUsuario()
    if (indice != -1) {
        usuarios[indice].nombres = usarioActualizado.nombre
        usuarios[indice].apellidos = usarioActualizado.apellido
        usuarios[indice].correo = usarioActualizado.correo
        usuarios[indice].tipoUsuario = usarioActualizado.tipoUsuario

        setJSONDeLocalStore(localStorage, usuarios)
        alertaActualizar()
    } else {
        alert("no encontrado")
    }



}


function eliminarUsuario() {
    this.usuarios = getJSONDeLocalStore(localStorage)
    var indice = buscarIndiceUsuario()
    if (indice > -1) {

        // alert("El usuario " + usuarios[indice].idUsuario + " eliminado")
        usuarios.splice(indice, 1)
        setJSONDeLocalStore(localStorage, usuarios)

    }
}


function obtenerIdUsuarioTabla(boton) {


    const fila = boton.parentNode.parentNode;
    this.id = fila.cells[0].textContent;
    mostrarAlertaEliminar()

}


function editarFila(boton) {
    const fila = boton.parentNode.parentNode;
    const celdas = fila.querySelectorAll("td");

    if (boton.textContent === "Editar") {
        for (let i = 1; i < celdas.length - 1; i++) {
            const texto = celdas[i].textContent;
            celdas[i].innerHTML = `<input type="text" value="${texto}">`;
        }
        boton.textContent = "Guardar";
    } else {
        const id = celdas[0].textContent; // asumimos que la primera columna es el ID
        const nuevosDatos = {
            nombre: celdas[1].querySelector("input").value,
            apellido: celdas[2].querySelector("input").value,
            correo: celdas[3].querySelector("input").value,
            tipoUsuario: celdas[4].querySelector("input").value
        };

        // Guardamos los datos actualizados en localStorage
        actualizarUsuario(id, nuevosDatos);

        boton.textContent = "Editar";

    }
}







function buscarIndiceUsuario() {

    var resultado = -1
    for (let i = 0; i < usuarios.length; i++) {

        if (usuarios[i].idUsuario == id) {

            resultado = i
        }

    }
    return resultado

}


function limpiarFormulario() {
    document.getElementById("name").value = ""
    document.getElementById("apellido").value = ""
    document.getElementById("email").value = ""
    document.getElementById("tipoUsuario").value = ""
}




function recuperarDatosFormularioRegistro() {
    this.nombre = document.getElementById("name")
    this.apellido = document.getElementById("apellido")
    this.correo = document.getElementById("email")
    this.password = document.getElementById("password")
}

function recuperarDatosFormulario() {
    this.nombre = document.getElementById("name")
    this.apellido = document.getElementById("apellido")
    this.correo = document.getElementById("email")
    this.tipoUsuario = document.getElementById("tipoUsuario")
}



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
    var users = getJSONDeLocalStore(localStorage);

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

        setJSONDeLocalStore(localStorage, users)

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

    var users = getJSONDeLocalStore(localStorage) ;
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