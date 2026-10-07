const weddingDate=new Date("2027-05-14T15:00:00+02:00");
function tick(){const d=weddingDate-new Date();if(d<=0)return;const vals=[Math.floor(d/86400000),Math.floor(d%86400000/3600000),Math.floor(d%3600000/60000),Math.floor(d%60000/1000)];["days","hours","minutes","seconds"].forEach((id,i)=>document.getElementById(id).textContent=String(vals[i]).padStart(i?2:3,"0"))}tick();setInterval(tick,1000);
const obs=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.12});document.querySelectorAll(".reveal").forEach(e=>obs.observe(e));
const menu=document.querySelector(".menu"),links=document.querySelector(".links");menu.onclick=()=>links.classList.toggle("open");links.querySelectorAll("a").forEach(a=>a.onclick=()=>links.classList.remove("open"));
const box=document.getElementById("lightbox"),pic=box.querySelector("img");document.querySelectorAll(".gallery-item").forEach(b=>b.onclick=()=>{pic.src=b.dataset.image;box.showModal()});box.querySelector("button").onclick=()=>box.close();box.onclick=e=>e.target===box&&box.close();
document.getElementById("google-form-link").onclick=e=>{if(e.currentTarget.getAttribute("href")==="#"){e.preventDefault();alert("Ajoutez le lien de votre Google Form dans index.html.")}};


/* Programme modulaire
 * Pour ajouter, retirer ou réordonner une étape, modifiez uniquement ce tableau.
 * time, title, description et image sont indépendants du HTML.
 */
const programEvents = [
  { id: "ceremonie-religieuse", time: "Horaire à définir", title: "Cérémonie religieuse", description: "Nous célébrerons notre union entourés de nos proches.", image: "assets/programme/ceremonie-religieuse.png", alt: "Illustration de la cérémonie religieuse" },
  { id: "photos", time: "Horaire à définir", title: "Photos", description: "Un moment pour immortaliser cette journée avec vous.", image: "assets/programme/photos.png", alt: "Illustration d'un appareil photo" },
  { id: "vin-honneur", time: "Horaire à définir", title: "Vin d'honneur", description: "Un moment convivial pour trinquer ensemble.", image: "assets/programme/vin-honneur.png", alt: "Illustration de coupes de champagne" },
  { id: "diner", time: "Horaire à définir", title: "Dîner", description: "Nous passerons à table pour poursuivre les festivités.", image: "assets/programme/diner.png", alt: "Illustration du dîner" },
  { id: "entree-maries", time: "Horaire à définir", title: "Entrée des mariés", description: "Le début de la soirée tous ensemble.", image: "assets/programme/entree-maries.png", alt: "Illustration de Lucie et Florian" },
  { id: "decoupe-gateau", time: "Horaire à définir", title: "Découpe du gâteau", description: "Place à une petite touche de douceur.", image: "assets/programme/decoupe-gateau.png", alt: "Illustration du gâteau de mariage" },
  { id: "ouverture-bal", time: "Horaire à définir", title: "Ouverture de bal", description: "Nous ouvrirons la piste avant de danser tous ensemble.", image: "assets/programme/ouverture-bal.png", alt: "Illustration de Lucie et Florian dansant" },
  { id: "fin-soiree", time: "Horaire à définir", title: "Fin de soirée", description: "Jusqu'au bout de la nuit.", image: "assets/programme/fin-soiree.png", alt: "Illustration de fin de soirée" }
];

function renderProgram(events = programEvents) {
  const timeline = document.getElementById("program-timeline");
  if (!timeline) return;
  timeline.innerHTML = events.map((event, index) => {
    const side = index % 2 === 0 ? "left" : "right";
    return `
      <article class="program-step ${side} reveal" data-event="${event.id}">
        <div class="program-copy">
          <strong class="program-time">${event.time}</strong>
          <h3>${event.title}</h3>
          <p>${event.description}</p>
        </div>
        <div class="program-marker" aria-hidden="true"><span></span></div>
        <figure class="program-visual">
          <img src="${event.image}" alt="${event.alt}" loading="lazy">
        </figure>
      </article>`;
  }).join("");
  timeline.querySelectorAll(".reveal").forEach(el => obs.observe(el));
}
renderProgram();
