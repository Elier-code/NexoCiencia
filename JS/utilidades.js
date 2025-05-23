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
            Swal.fire(
                '¡Eliminado!',
                'Tu archivo ha sido eliminado.',
                'success'
            );
        }
    });
}