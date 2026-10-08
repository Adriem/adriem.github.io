document.addEventListener("DOMContentLoaded", () => {

  // ---[ ANCHOR LINKS ]--- //

  const smoothScrollTo = (target) => {
    target.scrollIntoView({ behavior: "smooth" });
  };

  // If url contains an anchor, smooth scroll to it
  if (location.hash !== "") {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      const target = document.querySelector(hash) ||
                     document.querySelector(`[name=${hash.slice(1)}]`);
      if (target) smoothScrollTo(target);
    }, 100);
  }

  // Add smooth scroll to '#anchor' links
  document.querySelectorAll('a[href*="#"]:not([href="#"])').forEach((link) => {
    link.addEventListener("click", (e) => {
      if (location.pathname.replace(/^\//, "") === link.pathname.replace(/^\//, "") &&
          location.hostname === link.hostname) {
        const target = document.querySelector(link.hash) ||
                       document.querySelector(`[name=${link.hash.slice(1)}]`);
        if (target) {
          e.preventDefault();
          smoothScrollTo(target);
        }
      }
    });
  });

  // Fade transition for non-anchor links that navigate away in this tab.
  // Skipped (default behaviour) for links opening in a new tab, mailto:/tel:
  // links (they don't leave the page) and modified / non-left clicks.
  document.querySelectorAll(
    'a:not([href*="#"]):not([target="_blank"]):not([href^="mailto:"]):not([href^="tel:"])'
  ).forEach((link) => {
    link.addEventListener("click", (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      document.body.classList.add("fading");
      setTimeout(() => { window.location.href = link.href; }, 300);
    });
  });


  // ---[ SPLASH SCROLL LOCK ]--- //

  const parallax = document.querySelector(".parallax");
  const splashImage = document.querySelector(".splash__image");

  if (splashImage) {
    splashImage.addEventListener("animationend", () => {
      parallax.classList.add("parallax--scrollable");
    });
  } else {
    parallax.classList.add("parallax--scrollable");
  }


  // ---[ MOBILE MENU ]--- //

  const navbar = document.querySelector(".navbar");
  const menu = document.querySelector(".navbar-menu");
  const menuPanel = document.querySelector(".navbar-menu__panel");
  const menuToggle = document.querySelector(".navbar__toggle");

  const setMenuOpen = (open) => {
    menu.classList.toggle("navbar-menu--open", open);
    navbar.classList.toggle("navbar--menu-open", open);
    menuToggle.setAttribute("aria-expanded", open);
  };

  // Keep the navbar offset in sync with the panel height. The panel only has
  // no height when the menu isn't rendered (above the collapse breakpoint,
  // e.g. after rotating the device), so close it then.
  new ResizeObserver(() => {
    const height = menuPanel.offsetHeight;
    document.documentElement.style.setProperty("--navbar-menu-height", `${height}px`);
    if (height === 0) setMenuOpen(false);
  }).observe(menuPanel);

  menuToggle.addEventListener("click", () => {
    setMenuOpen(!menu.classList.contains("navbar-menu--open"));
  });

  // Close when clicking anywhere outside the panel, or on one of its links
  document.addEventListener("click", (e) => {
    if (menuToggle.contains(e.target)) return;
    if (!e.target.closest(".navbar-menu__panel") || e.target.closest(".navbar-menu__link")) {
      setMenuOpen(false);
    }
  });


  // ---[ SCROLL SPY ]--- //

  const splashSocial = document.querySelector(".splash__social");

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio >= 1.0) {
        navbar.classList.remove("navbar--collapsed");
        navbar.classList.add("navbar--expanded");
      } else if (entry.intersectionRatio < 0.5) {
        navbar.classList.remove("navbar--expanded");
        navbar.classList.add("navbar--collapsed");
      }
    },
    { root: document.querySelector(".parallax"), threshold: [0.5, 1.0] }
  );

  observer.observe(splashSocial);
});
