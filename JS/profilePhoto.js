// Función para cargar la foto de perfil
function loadProfilePhoto() {
    const profilePhoto = localStorage.getItem('profilePhoto');
    const defaultPhoto = 'https://cdn-icons-png.flaticon.com/512/2922/2922506.png';
    
    // Actualizar todas las imágenes de perfil en la página
    const avatars = document.querySelectorAll('.user-avatar, #profile-photo');
    
    avatars.forEach(avatar => {
        if (avatar) {
            avatar.src = profilePhoto || defaultPhoto;
        }
    });

    // Actualizar el botón de eliminar si existe
    const removeButton = document.getElementById('btn-remove-photo');
    if (removeButton) {
        removeButton.style.display = profilePhoto ? 'block' : 'none';
    }
}

// Función para actualizar la foto de perfil
function updateProfilePhoto(photoUrl) {
    if (photoUrl) {
        localStorage.setItem('profilePhoto', photoUrl);
    } else {
        localStorage.removeItem('profilePhoto');
    }
    loadProfilePhoto();
}

// Función para eliminar la foto de perfil
function removeProfilePhoto() {
    localStorage.removeItem('profilePhoto');
    loadProfilePhoto();
}

// Cargar la foto cuando el documento esté listo
document.addEventListener('DOMContentLoaded', loadProfilePhoto);

// Recargar la foto cuando se vuelve a la página
window.addEventListener('pageshow', loadProfilePhoto); 