\
const intro = document.getElementById("intro-screen");
const envelope = document.getElementById("envelope");
const openButton = document.getElementById("open-envelope");
const site = document.getElementById("site");

function openInvitation(){
  if(envelope.classList.contains("open")) return;
  envelope.classList.add("open");
  document.querySelector(".tap-hint").style.opacity = "0";

  setTimeout(() => {
    intro.classList.add("hidden");
    site.classList.add("visible");
    document.body.classList.remove("locked");
  }, 1850);
}

openButton.addEventListener("click", openInvitation);

const weddingDate = new Date("2027-05-14T15:00:00+02:00");

function updateCountdown(){
  const distance = weddingDate - new Date();
  if(distance <= 0){
    document.getElementById("countdown").innerHTML = "<p>Le grand jour est arrivé ❤️</p>";
    return;
  }

  const values = [
    Math.floor(distance / 86400000),
    Math.floor((distance % 86400000) / 3600000),
    Math.floor((distance % 3600000) / 60000),
    Math.floor((distance % 60000) / 1000)
  ];

  ["days","hours","minutes","seconds"].forEach((id,index) => {
    document.getElementById(id).textContent = String(values[index]).padStart(index ? 2 : 3,"0");
  });
}

updateCountdown();
setInterval(updateCountdown,1000);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
},{threshold:.12});

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click",() => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded",String(open));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click",() => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded","false");
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector("img");

document.querySelectorAll(".gallery-item").forEach(button => {
  button.addEventListener("click",() => {
    lightboxImage.src = button.dataset.image;
    lightbox.showModal();
  });
});

lightbox.querySelector(".lightbox-close").addEventListener("click",() => lightbox.close());
lightbox.addEventListener("click",event => {
  if(event.target === lightbox) lightbox.close();
});

document.getElementById("google-form-link").addEventListener("click",event => {
  if(event.currentTarget.getAttribute("href") === "#"){
    event.preventDefault();
    alert("Ajoutez votre lien Google Form dans le fichier index.html.");
  }
});
