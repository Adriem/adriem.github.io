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


  // ---[ SCROLL SPY ]--- //

  const navbar = document.querySelector(".navbar");
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
