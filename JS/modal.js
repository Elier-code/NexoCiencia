// Mostrar modal al enviar
document.querySelectorAll('.cuestionario').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // evita el envío real
        mostrarModal();
    });
});

// Función para mostrar el modal
function mostrarModal() {
    document.getElementById("modal-mensaje").style.display = "flex";
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById("modal-mensaje").style.display = "none";
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
    var modal = document.getElementById("modal-mensaje");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Asegurar que el modal esté oculto al cargar la página
window.addEventListener('load', function() {
    document.getElementById("modal-mensaje").style.display = "none";
});