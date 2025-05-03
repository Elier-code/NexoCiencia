function insertarLogo(){
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = '../Recursos/Imagenes/nexo-ciencia-logo.ico'; // Ruta de tu ícono
    link.type = 'image/png';
    document.head.appendChild(link);
}