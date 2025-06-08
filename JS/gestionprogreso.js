const seccionesMecanica = {
    "Velocidad angular": [
        "nivel 1.1",
        "nivel 1.2",
        "nivel 1.3",
        "nivel 1.4",
    ],
    "Aceleración angular": [
        "nivel 2.1",
        "nivel 2.2",
        "nivel 2.3",
        "nivel 2.4",
    ],
    "Torque": [
        "nivel 3.1", 
        "nivel 3.2", 
        "nivel 3.3", 
        "nivel 3.4"
    ],
    "Rotación del cuerpo rígido": [
        "nivel 4.1",
        "nivel 4.2",
        "nivel 4.3",
        "nivel 4.4",
    ],
};

const seccionesCalculo = {
    "Básicas": [
        "nivel 1.1",
        "nivel 1.2",
        "nivel 1.3",
        "nivel 1.4",
    ],
    "Por partes": [
        "nivel 2.1",
        "nivel 2.2",
        "nivel 2.3",
        "nivel 2.4",
    ],
    "Fracciones racionales": [
        "nivel 3.1",
        "nivel 3.2",
        "nivel 3.3",
        "nivel 3.4",
    ],
    "Avanzadas": [
        "nivel 4.1",
        "nivel 4.2",
        "nivel 4.3",
        "nivel 4.4",
    ],
};

const rutasMecanica = {
    "nivel 1.1": "../HTML/botonMecanica-1-1.html",
    "nivel 1.2": "../HTML/botonMecanica-1-2.html",
    "nivel 1.3": "../HTML/botonMecanica-1-3.html",
    "nivel 1.4": "../HTML/botonMecanica-1-4.html",
    "nivel 2.1": "../HTML/botonMecanica-2-1.html",
    "nivel 2.2": "../HTML/botonMecanica-2-2.html",
    "nivel 2.3": "../HTML/botonMecanica-2-3.html",
    "nivel 2.4": "../HTML/botonMecanica-2-4.html",
    "nivel 3.1": "../HTML/botonMecanica-3-1.html",
    "nivel 3.2": "../HTML/botonMecanica-3-2.html",
    "nivel 3.3": "../HTML/botonMecanica-3-3.html",
    "nivel 3.4": "../HTML/botonMecanica-3-4.html",
    "nivel 4.1": "../HTML/botonMecanica-4-1.html",
    "nivel 4.2": "../HTML/botonMecanica-4-2.html",
    "nivel 4.3": "../HTML/botonMecanica-4-3.html",
    "nivel 4.4": "../HTML/botonMecanica-4-4.html",
};

const rutasCalculo = {
    "nivel 1.1": "../HTML/botonCalculo-1-1.html",
    "nivel 1.2": "../HTML/botonCalculo-1-2.html",
    "nivel 1.3": "../HTML/botonCalculo-1-3.html",
    "nivel 1.4": "../HTML/botonCalculo-1-4.html",
    "nivel 2.1": "../HTML/botonCalculo-2-1.html",
    "nivel 2.2": "../HTML/botonCalculo-2-2.html",
    "nivel 2.3": "../HTML/botonCalculo-2-3.html",
    "nivel 2.4": "../HTML/botonCalculo-2-4.html",
    "nivel 3.1": "../HTML/botonCalculo-3-1.html",
    "nivel 3.2": "../HTML/botonCalculo-3-2.html",
    "nivel 3.3": "../HTML/botonCalculo-3-3.html",
    "nivel 3.4": "../HTML/botonCalculo-3-4.html",
    "nivel 4.1": "../HTML/botonCalculo-4-1.html",
    "nivel 4.2": "../HTML/botonCalculo-4-2.html",
    "nivel 4.3": "../HTML/botonCalculo-4-3.html",
    "nivel 4.4": "../HTML/botonCalculo-4-4.html",
};

let currentTab = 'mecanica';

document.addEventListener('DOMContentLoaded', function() {
    checkSession(true);
    cargarProgreso();
});

function cambiarTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="cambiarTab('${tab}')"]`).classList.add('active');
    cargarProgreso();
}

function cargarProgreso() {
    const contenedor = document.getElementById("progreso-secciones");
    const sesion = getJSONDeLocalStore("sessionUser");
    
    if (sesion.length === 0 || !sesion[0].userName) {
        contenedor.innerHTML = "<p class='mensaje-error'>⚠️ No hay sesión activa. Inicia sesión para ver tu progreso.</p>";
        return;
    }

    const usuario = sesion[0].userName;
    const secciones = currentTab === 'mecanica' ? seccionesMecanica : seccionesCalculo;
    const rutas = currentTab === 'mecanica' ? rutasMecanica : rutasCalculo;
    
    let nivelesCompletados = 0;
    let totalPuntuacion = 0;
    let totalNivelesConPuntuacion = 0;
    let mejorPuntuacion = 0;

    contenedor.innerHTML = '';

    for (const [tituloSeccion, niveles] of Object.entries(secciones)) {
        const seccionDiv = document.createElement("div");
        seccionDiv.className = "seccion";

        const titulo = document.createElement("h2");
        titulo.textContent = tituloSeccion;
        seccionDiv.appendChild(titulo);

        niveles.forEach((nivel) => {
            const claveProgreso = `${usuario}_${nivel}`;
            const datos = JSON.parse(localStorage.getItem(claveProgreso));
            const div = document.createElement("div");
            const nombre = nivel.toUpperCase();
            let contenidoHTML = "";

            if (datos && datos.completado) {
                nivelesCompletados++;
                const porcentaje = Math.round((datos.correctas / datos.total) * 100);
                totalPuntuacion += porcentaje;
                totalNivelesConPuntuacion++;
                mejorPuntuacion = Math.max(mejorPuntuacion, porcentaje);

                contenidoHTML = `
                    <h3>
                        <i class="fas fa-check-circle" style="color: var(--success)"></i>
                        ${nombre}
                        <span class="estado completado">${datos.correctas}/${datos.total} correctas</span>
                    </h3>
                    <div class="progreso-barra">
                        <span style="width: ${porcentaje}%"></span>
                    </div>
                    <div class="boton">
                        <button onclick="window.location.href='${rutas[nivel]}'">
                            <i class="fas fa-redo"></i> Reintentar
                        </button>
                    </div>
                `;
                div.classList.add("nivel", "completado");
            } else {
                contenidoHTML = `
                    <h3>
                        <i class="fas fa-circle" style="color: var(--warning)"></i>
                        ${nombre}
                        <span class="estado pendiente">Pendiente</span>
                    </h3>
                    <div class="progreso-barra">
                        <span style="width: 0%"></span>
                    </div>
                    <div class="boton">
                        <button onclick="window.location.href='${rutas[nivel]}'">
                            <i class="fas fa-play"></i> Comenzar
                        </button>
                    </div>
                `;
                div.classList.add("nivel", "pendiente");
            }

            div.innerHTML = contenidoHTML;
            seccionDiv.appendChild(div);
        });

        contenedor.appendChild(seccionDiv);
    }

    // Actualizar estadísticas
    document.getElementById('total-niveles').textContent = nivelesCompletados;
    document.getElementById('promedio-general').textContent = 
        totalNivelesConPuntuacion > 0 
            ? Math.round(totalPuntuacion / totalNivelesConPuntuacion) + '%' 
            : '0%';
    document.getElementById('mejor-puntuacion').textContent = mejorPuntuacion + '%';
}