const secciones = {
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
    Torque: ["nivel 3.1", "nivel 3.2", "nivel 3.3", "nivel 3.4"],
    "Rotación del cuerpo rígido": [
        "nivel 4.1",
        "nivel 4.2",
        "nivel 4.3",
        "nivel 4.4",
    ],
};

const rutas = {
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
    "nivel 4,4": "../HTML/botonMecanica-4-4.html",
};

const contenedor = document.getElementById("progreso-secciones");

const sesion = getJSONDeLocalStore("sessionUser");
if (sesion.length === 0 || !sesion[0].userName) {
    contenedor.innerHTML =
        "<p>⚠️ No hay sesión activa. Inicia sesión para ver tu progreso.</p>";
} else {
    const usuario = sesion[0].userName;

    for (const [tituloSeccion, niveles] of Object.entries(secciones)) {
        const seccionDiv = document.createElement("div");

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
                const porcentaje = Math.round(
                    (datos.correctas / datos.total) * 100
                );
                contenidoHTML = `
              <h3>✔ ${nombre}</h3>
              <p class="estado completado">Completado - ${datos.correctas}/${datos.total} correctas</p>
              <div class="progreso-barra"><span style="width: ${porcentaje}%">${porcentaje}%</span></div>
              <div class="boton">
                  <button onclick="window.location.href='${rutas[nivel]}'">Ir al quiz</button>
              </div>
            `;
                div.classList.add("nivel", "completado");
            } else {
                contenidoHTML = `
              <h3>✖ ${nombre}</h3>
              <p class="estado pendiente">Pendiente</p>
              <div class="progreso-barra"><span style="width: 0%">0%</span></div>
              <div class="boton">
                  <button onclick="window.location.href='${rutas[nivel]}'">Ir al quiz</button>
              </div>
            `;
                div.classList.add("nivel", "pendiente");
            }

            div.innerHTML = contenidoHTML;
            seccionDiv.appendChild(div);
        });

        contenedor.appendChild(seccionDiv);
    }
}