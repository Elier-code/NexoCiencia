// Función para guardar el progreso de una lección de cálculo
function guardarProgresoCalculo(nivel, correctas, total) {
    const sesion = getJSONDeLocalStore("sessionUser");
    if (!sesion || sesion.length === 0) return false;

    const usuario = sesion[0].userName;
    const claveProgreso = `${usuario}_nivel ${nivel}`;
    
    // Guardar progreso actual
    const progreso = {
        completado: true,
        correctas: correctas,
        total: total,
        fecha: new Date().toISOString()
    };
    
    localStorage.setItem(claveProgreso, JSON.stringify(progreso));
    
    // Desbloquear siguiente nivel si corresponde
    desbloquearSiguienteNivelCalculo(nivel);
    
    return true;
}

// Función para desbloquear el siguiente nivel
function desbloquearSiguienteNivelCalculo(nivelActual) {
    const sesion = getJSONDeLocalStore("sessionUser");
    if (!sesion || sesion.length === 0) return;

    const usuario = sesion[0].userName;
    const [seccion, numero] = nivelActual.split('.');
    const siguienteNumero = parseInt(numero) + 1;
    
    // Si es el último número de la sección, pasar a la siguiente sección
    if (siguienteNumero > 4) {
        const siguienteSeccion = parseInt(seccion) + 1;
        if (siguienteSeccion <= 4) { // Solo si no hemos llegado al final
            const siguienteNivel = `${siguienteSeccion}.1`;
            const claveProgreso = `${usuario}_nivel ${siguienteNivel}`;
            localStorage.setItem(claveProgreso, JSON.stringify({
                desbloqueado: true,
                completado: false
            }));
        }
    } else {
        // Desbloquear siguiente nivel de la misma sección
        const siguienteNivel = `${seccion}.${siguienteNumero}`;
        const claveProgreso = `${usuario}_nivel ${siguienteNivel}`;
        localStorage.setItem(claveProgreso, JSON.stringify({
            desbloqueado: true,
            completado: false
        }));
    }
}

// Función para verificar si un nivel está desbloqueado
function verificarNivelDesbloqueadoCalculo(nivel) {
    const sesion = getJSONDeLocalStore("sessionUser");
    if (!sesion || sesion.length === 0) return false;

    const usuario = sesion[0].userName;
    const claveProgreso = `${usuario}_nivel ${nivel}`;
    const datos = JSON.parse(localStorage.getItem(claveProgreso) || '{}');

    // El primer nivel siempre está desbloqueado
    if (nivel === '1.1') return true;

    return datos.desbloqueado === true;
}

// Función para obtener el progreso de un nivel
function obtenerProgresoNivelCalculo(nivel) {
    const sesion = getJSONDeLocalStore("sessionUser");
    if (!sesion || sesion.length === 0) return null;

    const usuario = sesion[0].userName;
    const claveProgreso = `${usuario}_nivel ${nivel}`;
    return JSON.parse(localStorage.getItem(claveProgreso) || '{}');
}

// Función para actualizar la interfaz de progreso
function actualizarInterfazProgresoCalculo() {
    const botones = document.querySelectorAll('.level-btn');
    const sesion = getJSONDeLocalStore("sessionUser");
    
    if (!sesion || sesion.length === 0) return;
    
    botones.forEach(boton => {
        const nivel = boton.getAttribute('data-level');
        const progreso = obtenerProgresoNivelCalculo(nivel);
        const statusIcon = boton.querySelector('.level-status i');
        
        if (progreso.completado) {
            statusIcon.className = 'fas fa-check-circle';
            boton.classList.add('completed');
        } else if (progreso.desbloqueado || nivel === '1.1') {
            statusIcon.className = 'fas fa-unlock';
            boton.classList.remove('completed');
        } else {
            statusIcon.className = 'fas fa-lock';
            boton.classList.add('locked');
        }
    });
}

// Inicializar el primer nivel para nuevos usuarios
function inicializarProgresoCalculo() {
    const sesion = getJSONDeLocalStore("sessionUser");
    if (!sesion || sesion.length === 0) return;

    const usuario = sesion[0].userName;
    const claveProgreso = `${usuario}_nivel 1.1`;
    const progreso = JSON.parse(localStorage.getItem(claveProgreso) || '{}');

    if (!progreso.desbloqueado) {
        localStorage.setItem(claveProgreso, JSON.stringify({
            desbloqueado: true,
            completado: false
        }));
    }
}

// Event listener para cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', function() {
    inicializarProgresoCalculo();
    actualizarInterfazProgresoCalculo();
}); 