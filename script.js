document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro-screen");
  const envelope = document.getElementById("envelope");
  const openButton = document.getElementById("open-envelope");
  const skipButton = document.getElementById("skip-intro");
  const site = document.getElementById("site");
  const tapHint = document.querySelector(".tap-hint");

  let introOpened = false;

  function revealSite(immediate = false) {
    if (!intro || !site) return;

    if (immediate) {
      intro.style.transition = "none";
      site.style.transition = "none";
    }

    intro.classList.add("hidden");
    site.classList.add("visible");
    document.body.classList.remove("locked");

    if (immediate) {
      requestAnimationFrame(() => {
        intro.style.transition = "";
        site.style.transition = "";
      });
    }
  }

  function openInvitation() {
    if (introOpened) return;
    introOpened = true;

    if (!envelope) {
      revealSite(true);
      return;
    }

    intro.classList.add("opening");
    envelope.classList.add("open");

    if (tapHint) tapHint.style.opacity = "0";
    if (skipButton) skipButton.style.opacity = "0";

    window.setTimeout(() => revealSite(false), 1900);
  }

  if (openButton) {
    openButton.addEventListener("click", openInvitation);
    openButton.addEventListener("touchend", event => {
      event.preventDefault();
      openInvitation();
    }, { passive: false });
  }

  if (skipButton) {
    skipButton.addEventListener("click", () => revealSite(true));
  }

  // Sécurité : le site reste accessible même si l'animation échoue.
  window.setTimeout(() => {
    if (!introOpened && intro && !intro.classList.contains("hidden")) {
      if (skipButton) skipButton.style.opacity = "1";
    }
  }, 2500);

  const weddingDate = new Date("2027-05-14T15:00:00+02:00");

  function updateCountdown() {
    const countdown = document.getElementById("countdown");
    if (!countdown) return;

    const distance = weddingDate - new Date();

    if (distance <= 0) {
      countdown.innerHTML = "<p>Le grand jour est arrivé ❤️</p>";
      return;
    }

    const values = [
      Math.floor(distance / 86400000),
      Math.floor((distance % 86400000) / 3600000),
      Math.floor((distance % 3600000) / 60000),
      Math.floor((distance % 60000) / 1000)
    ];

    ["days", "hours", "minutes", "seconds"].forEach((id, index) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = String(values[index]).padStart(index ? 2 : 3, "0");
      }
    });
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

  const menuButton = document.querySelector(".menu-button");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  const closeButton = lightbox?.querySelector(".lightbox-close");

  document.querySelectorAll(".gallery-item").forEach(button => {
    button.addEventListener("click", () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = button.dataset.image || "";
      lightbox.showModal();
    });
  });

  if (closeButton && lightbox) {
    closeButton.addEventListener("click", () => lightbox.close());
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) lightbox.close();
    });
  }

  const formLink = document.getElementById("google-form-link");
  if (formLink) {
    formLink.addEventListener("click", event => {
      if (formLink.getAttribute("href") === "#") {
        event.preventDefault();
        alert("Ajoutez votre lien Google Form dans le fichier index.html.");
      }
    });
  }
});
