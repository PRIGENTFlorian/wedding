document.addEventListener("DOMContentLoaded", () => {

  const envelopeSection = document.querySelector(".scroll-envelope-section");
  const scrollEnvelope = document.getElementById("scroll-envelope");
  const progressBar = document.querySelector(".scroll-progress");

  function updateEnvelopeAnimation() {
    if (!envelopeSection || !scrollEnvelope) return;

    const rect = envelopeSection.getBoundingClientRect();
    const scrollable = Math.max(envelopeSection.offsetHeight - window.innerHeight, 1);
    const travelled = Math.min(Math.max(-rect.top, 0), scrollable);
    const rawProgress = travelled / scrollable;

    // L'ouverture se déroule surtout au milieu de la section.
    const progress = Math.min(Math.max((rawProgress - 0.08) / 0.78, 0), 1);

    scrollEnvelope.style.setProperty("--progress", progress.toFixed(4));
    if (progressBar) {
      progressBar.style.setProperty("--envelope-progress", progress.toFixed(4));
    }
  }

  updateEnvelopeAnimation();
  window.addEventListener("scroll", updateEnvelopeAnimation, { passive: true });
  window.addEventListener("resize", updateEnvelopeAnimation);
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
