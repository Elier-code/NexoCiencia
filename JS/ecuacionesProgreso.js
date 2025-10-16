// Funciones específicas para el manejo del progreso del curso de Ecuaciones

function guardarProgresoEcuaciones(nivel, correctas, total) {
    const sesion = getJSONDeLocalStore("sessionUser");
    if (!sesion || sesion.length === 0) return false;

    const usuario = sesion[0].userName;
    const claveProgreso = `${usuario}_nivel ${nivel}`;
    
    const progreso = {
        completado: correctas >= (total * 0.7), // 70% para aprobar
        visualizado: true,
        correctas: correctas,
        total: total,
        fecha: new Date().toISOString()
    };

    localStorage.setItem(claveProgreso, JSON.stringify(progreso));
    
    // Si completó, desbloquear siguiente nivel
    if (progreso.completado) {
        desbloquearSiguienteNivelEcuaciones(nivel);
    }
    
    return true;
}

// Función para desbloquear el siguiente nivel
function desbloquearSiguienteNivelEcuaciones(nivelActual) {
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
function verificarNivelDesbloqueadoEcuaciones(nivel) {
    const sesion = getJSONDeLocalStore("sessionUser");
    if (!sesion || sesion.length === 0) return false;

    const usuario = sesion[0].userName;
    const claveProgreso = `${usuario}_nivel ${nivel}`;
    const datos = JSON.parse(localStorage.getItem(claveProgreso) || '{}');

    // El primer nivel siempre está desbloqueado
    if (nivel === '1.1') return true;

    // Verificar si el nivel anterior está completado
    const nivelAnterior = obtenerNivelAnteriorEcuaciones(nivel);
    if (nivelAnterior) {
        const progresoAnterior = JSON.parse(localStorage.getItem(`${usuario}_nivel ${nivelAnterior}`) || '{}');
        return progresoAnterior.completado === true;
    }

    return datos.desbloqueado === true;
}

// Función para obtener el nivel anterior
function obtenerNivelAnteriorEcuaciones(nivel) {
    const [seccion, numero] = nivel.split('.');
    const numeroAnterior = parseInt(numero) - 1;
    
    if (numeroAnterior < 1) {
        const seccionAnterior = parseInt(seccion) - 1;
        if (seccionAnterior < 1) return null;
        return `${seccionAnterior}.4`;
    }
    
    return `${seccion}.${numeroAnterior}`;
}

// Función para obtener el progreso de un nivel
function obtenerProgresoNivelEcuaciones(nivel) {
    const sesion = getJSONDeLocalStore("sessionUser");
    if (!sesion || sesion.length === 0) return {};

    const usuario = sesion[0].userName;
    const claveProgreso = `${usuario}_nivel ${nivel}`;

    return JSON.parse(localStorage.getItem(claveProgreso) || '{}');
}

// Función para actualizar la interfaz de progreso
function actualizarInterfazProgresoEcuaciones() {
    const botones = document.querySelectorAll('.level-btn');
    const sesion = getJSONDeLocalStore("sessionUser");
    
    if (!sesion || sesion.length === 0) return;
    
    botones.forEach(boton => {
        const nivel = boton.getAttribute('data-level');
        const progreso = obtenerProgresoNivelEcuaciones(nivel);
        const statusIcon = boton.querySelector('.level-status i');
        
        if (progreso.completado) {
            statusIcon.className = 'fas fa-check-circle';
            boton.classList.add('completed');
            boton.disabled = false;
        } else if (verificarNivelDesbloqueadoEcuaciones(nivel)) {
            statusIcon.className = 'fas fa-unlock';
            boton.classList.remove('completed', 'locked');
            boton.disabled = false;
        } else {
            statusIcon.className = 'fas fa-lock';
            boton.classList.add('locked');
            boton.disabled = true;
        }
    });
}

// Inicializar el primer nivel para nuevos usuarios
function inicializarProgresoEcuaciones() {
    const sesion = getJSONDeLocalStore("sessionUser");
    if (!sesion || sesion.length === 0) return;

    const usuario = sesion[0].userName;
    const nivel1_1 = `${usuario}_nivel 1.1`;
    
    // Solo inicializar si no existe
    if (!localStorage.getItem(nivel1_1)) {
        localStorage.setItem(nivel1_1, JSON.stringify({
            desbloqueado: true,
            completado: false,
            visualizado: false
        }));
    }
}

