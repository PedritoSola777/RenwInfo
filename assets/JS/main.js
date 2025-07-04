document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad para los menús desplegables de desktop
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            const dropdownMenu = this.nextElementSibling;

            // Cerrar otros menús desplegables abiertos
            dropdownToggles.forEach(function(otherToggle) {
                if (otherToggle !== toggle) {
                    otherToggle.nextElementSibling.style.display = 'none';
                }
            });

            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Nuevo: Funcionalidad para abrir el menú al pasar el cursor en desktop
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            // Cerrar todos los menús
            navItems.forEach(i => {
                const dropdownMenu = i.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.display = 'none';
                }
            });
            // Abrir el menú del elemento actual
            const dropdownMenu = item.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.style.display = 'block';
            }
        });
    });

    // Cerrar menús cuando el mouse sale de la navbar
    document.querySelector('.navbar-lower').addEventListener('mouseleave', () => {
        navItems.forEach(item => {
            const dropdownMenu = item.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.style.display = 'none';
            }
        });
    });

   
    

    // Funcionalidad del menú para móviles
    const menuButton = document.getElementById('menuButton');
    const searchButton = document.getElementById('searchButton');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    function closeAllMobileMenus() {
        mobileDropdownToggles.forEach(function(toggle) {
            const dropdownMenu = toggle.nextElementSibling;
            dropdownMenu.classList.remove('open');
        });
        const mobileSearch = document.getElementById('mobileSearch');
        mobileSearch.classList.remove('open');
    }

    if (menuButton) {
        menuButton.addEventListener('click', function() {
            closeAllMobileMenus();
            const navbarLower = document.getElementById('navbarLower');
            navbarLower.classList.toggle('open');
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', function() {
            closeAllMobileMenus();
            const mobileSearch = document.getElementById('mobileSearch');
            mobileSearch.classList.toggle('open');
        });
    }

    mobileDropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            closeAllMobileMenus();
            const dropdownMenu = this.nextElementSibling;
            dropdownMenu.classList.toggle('open');
        });
    });

    // Validación del formulario
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(event) {
            if (!userForm.checkValidity()) {
                event.preventDefault();
                alert('Por favor, complete todos los campos antes de enviar.');
            }
        });
    }
});
