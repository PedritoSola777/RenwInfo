document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     ELEMENTOS
  ===================================================== */
  const menuBtn = document.getElementById("menuButton");
  const closeBtn = document.getElementById("closeMenuButton");
  const mobileMenu = document.getElementById("navbarLower");
  const body = document.body;

  const BREAKPOINT = 768;

  /* =====================================================
     GUARDAS (anti errores silenciosos)
  ===================================================== */
  if (!menuBtn || !closeBtn || !mobileMenu) {
    console.warn("⚠️ Menú mobile: elementos no encontrados");
    return;
  }

  /* =====================================================
     FUNCIONES DE ESTADO
  ===================================================== */
  function openMenu() {
    mobileMenu.classList.add("menu-open");
    body.classList.add("menu-open");
  }

  function closeMenu() {
    mobileMenu.classList.remove("menu-open");
    body.classList.remove("menu-open");
  }

  function resetMenu() {
    closeMenu();
  }

  function isDesktop() {
    return window.innerWidth > BREAKPOINT;
  }

  /* =====================================================
     EVENTOS BOTONES
  ===================================================== */
  menuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openMenu();
  });

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeMenu();
  });

  /* =====================================================
     SEGURIDAD AL CAMBIAR DE VIEWPORT
  ===================================================== */
  window.addEventListener("resize", () => {
    if (isDesktop()) {
      resetMenu();
    }
  });

  /* =====================================================
     ESTADO INICIAL (MUY IMPORTANTE)
  ===================================================== */
  resetMenu();

});
