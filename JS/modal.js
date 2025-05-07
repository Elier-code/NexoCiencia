// Mostrar modal al enviar
document.querySelectorAll('.cuestionario').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // evita el envío real
        document.getElementById("modal-mensaje").style.display = "block";
    });
});

function cerrarModal() {
    document.getElementById("modal-mensaje").style.display = "none";
}