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

  // Fade transition for non-anchor links
  document.querySelectorAll('a:not([href*="#"])').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.add("fading");
      setTimeout(() => { window.location.href = link.href; }, 300);
    });
  });


  // ---[ SCROLL SPY ]--- //

  const navbar = document.querySelector(".navbar");
  let navbarExpanded = true;

  const getScrollPosition = () =>
    document.documentElement.scrollTop || document.body.scrollTop;

  const expandNavbar = () => {
    navbarExpanded = true;
    navbar.classList.remove("navbar--collapsed");
    navbar.classList.add("navbar--expanded");
  };

  const collapseNavbar = () => {
    navbarExpanded = false;
    navbar.classList.remove("navbar--expanded");
    navbar.classList.add("navbar--collapsed");
  };

  const transformNavbar = () => {
    const scrollPosition = getScrollPosition();
    if (navbarExpanded && scrollPosition > 100) collapseNavbar();
    else if (!navbarExpanded && scrollPosition <= 50) expandNavbar();
  };


  // ---[ PARALLAX SCROLL ]--- //

  const bg = document.querySelector(".parallax__bg");

  const updatePosition = () => {
    const scrollPosition = getScrollPosition();
    if (scrollPosition < bg.offsetHeight) {
      bg.style.transform = `translateY(${scrollPosition / 2}px)`;
    }
  };

  window.addEventListener("scroll", () => { transformNavbar(); updatePosition(); });
  window.addEventListener("resize", transformNavbar);
});
