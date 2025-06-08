// Variables globales para localStorage
 
const localStorageSession = "sessionUser";

function getJSONDeLocalStore(nombreLocalStore) {

    return JSON.parse(
        localStorage.getItem(nombreLocalStore) || "[]")
}

function setJSONDeLocalStore(nombreLocalStore, arrayJSON) {

    localStorage.setItem(nombreLocalStore,
        JSON.stringify(arrayJSON))
}


function obtenerFechaActual() {
    const fechaActual = new Date()
    fechaActual.setHours(0, 0, 0, 0)
    const formato = fechaActual.toLocaleDateString('es-ES')

    const [dia, mes, año] = formato.split('/') // Divide la cadena en partes
    const formatoISO = `${año}-${mes}-${dia}`
    return formatoISO
}


function alertaGuardar() {
    Swal.fire({
        title: 'Listo',
        text: 'El usuario ha sido creado exitosamente. 😊',
        icon: 'success',
        confirmButtonText: '👍 Entendido'
    }).then((result) => {
        if (result.isConfirmed) {
            refrescarPagina()
        }
    });
}

function mostrarAlertaEliminar() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        title: '⚠️',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarUsuario()
            Swal.fire(
                '¡Eliminado!',
                'El usuario ha sido eliminado.',
                'success'
            ).then(() => {
                refrescarPagina()
            });

        }
    });
}


function refrescarPagina() {
    location.reload();
}


function alertaActualizar() {
    Swal.fire({
        title: 'Listo',
        text: 'El usuario ha sido actualizado exitosamente. 😊',
        icon: 'success',
        confirmButtonText: '👍 Entendido'
    }).then((result) => {
        if (result.isConfirmed) {
            refrescarPagina()
        }
    });
}

function alertaError(mensaje) {
    Swal.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        confirmButtonText: '👍 Entendido'
    });
}