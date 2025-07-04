document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad del botón del menú móvil
    const menuButton = document.getElementById('menuButton');
    const navbarLower = document.getElementById('navbarLower');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    // Función para cerrar todos los menús móviles abiertos
    function closeAllMobileMenus() {
        mobileDropdownToggles.forEach(function(toggle) {
            const dropdownMenu = toggle.nextElementSibling;
            dropdownMenu.classList.remove('open');
        });
    }

    // Manejo del evento de clic en el botón del menú móvil
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            navbarLower.classList.toggle('open');
        });
    }

    // Manejo de los eventos de clic en los toggles de los menús desplegables móviles
    mobileDropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            const dropdownMenu = this.nextElementSibling;
            const isOpen = dropdownMenu.classList.contains('open');

            // Cerrar todos los menús móviles abiertos
            closeAllMobileMenus();

            // Abrir el menú actual si no estaba abierto
            if (!isOpen) {
                dropdownMenu.classList.add('open');
            }
        });
    });
});