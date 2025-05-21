function mostrarAlerta(mensaje, tipo = 'success') {
            const alerta = document.getElementById('alerta');
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
            mostrarAlerta(`Ahora puedes editar el campo: ${id}`, 'warning');
        }

        function guardarCambios() {
            const datosUsuario = {
                nombre: document.getElementById('nombre').value,
                apellido: document.getElementById('apellido').value,
                correo: document.getElementById('correo').value,
                contrasena: document.getElementById('contrasena').value
            };

            localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));

            document.querySelectorAll('input').forEach(input => input.disabled = true);

            mostrarAlerta("¡Cambios guardados exitosamente!", 'success');
        }

        function cargarDatos() {
            const datosGuardados = localStorage.getItem('datosUsuario');

            if (datosGuardados) {
                const datos = JSON.parse(datosGuardados);
                document.getElementById('nombre').value = datos.nombre || '';
                document.getElementById('apellido').value = datos.apellido || '';
                document.getElementById('correo').value = datos.correo || '';
                document.getElementById('contrasena').value = datos.contrasena || '';
            } else {
                document.getElementById('nombre').value = 'Elier';
                document.getElementById('apellido').value = 'Narvaez';
                document.getElementById('correo').value = 'elier.narvaez@ejemplo.com';
                document.getElementById('contrasena').value = '12345678';
            }
        }

        window.onload = cargarDatos;