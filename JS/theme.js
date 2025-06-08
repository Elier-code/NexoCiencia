// Función para cambiar el tema
function toggleTheme(theme) {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Función para obtener el tema actual
function getCurrentTheme() {
    return localStorage.getItem('theme') || 'light';
}

// Función para inicializar el tema
function initializeTheme() {
    const currentTheme = getCurrentTheme();
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Actualizar los botones de tema si existen
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
        button.classList.remove('active');
        if (button.dataset.theme === currentTheme) {
            button.classList.add('active');
        }
    });
}

// Agregar event listeners cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();

    // Agregar event listeners a los botones de tema
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            toggleTheme(theme);
            
            // Actualizar estado activo de los botones
            themeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}); 