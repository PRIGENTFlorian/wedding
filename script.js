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


/* INFORMATIONS PRATIQUES — modifier uniquement ce tableau.
 * image: placer un PNG/WebP dans assets/infos/ et écrire son chemin ici.
 * Sans image, une icône de remplacement est affichée.
 * Pour ajouter une carte, dupliquer une ligne et changer id, title, description, image.
 * action: facultatif, { label: "...", url: "https://..." }.
 */
const practicalInfos = [
  { id: "lieu", title: "Le lieu", description: "Château Arribas — Condé-Sainte-Libiaire", image: "assets/infos/lieu.png", alt: "Illustration du lieu de réception", action: { label: "Voir l’itinéraire", url: "https://www.google.com/maps/search/?api=1&query=Ch%C3%A2teau+Arribas+Cond%C3%A9-Sainte-Libiaire" } },
  { id: "parking", title: "Parking", description: "Un parking sera disponible directement sur place.", image: "assets/infos/parking.png", alt: "Illustration du parking" },
  { id: "dress-code", title: "Dress code", description: "Nous vous invitons à porter une touche de bordeaux.", image: "assets/infos/dress-code.png", alt: "Illustration du dress code" },
  { id: "adultes", title: "Adultes uniquement", description: "Nous avons choisi de célébrer cette journée sans enfants.", image: "assets/infos/adultes.png", alt: "Illustration adultes uniquement" }
];

function renderPracticalInfos(items = practicalInfos) {
  const target = document.getElementById("practical-info-cards");
  if (!target) return;
  target.replaceChildren();
  for (const item of items) {
    const card = document.createElement("article");
    card.className = "info practical-card reveal";
    card.dataset.info = item.id;
    const media = document.createElement("div");
    media.className = "practical-card__media";
    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.alt || "";
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", () => { media.replaceChildren(); addIcon(); });
      media.append(img);
    } else addIcon();
    function addIcon() {
      const icon = document.createElement("span");
      icon.className = "practical-card__fallback";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = item.icon || "✦";
      media.append(icon);
    }
    const heading = document.createElement("h3");
    heading.textContent = item.title;
    const description = document.createElement("p");
    description.textContent = item.description;
    card.append(media, heading, description);
    if (item.action?.url && /^(https?:\/\/|mailto:|tel:)/i.test(item.action.url)) {
      const link = document.createElement("a");
      link.href = item.action.url;
      link.textContent = item.action.label || "En savoir plus";
      if (/^https?:\/\//i.test(item.action.url)) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      card.append(link);
    }
    target.append(card);
    if (typeof obs !== "undefined") obs.observe(card);
  }
}
renderPracticalInfos();
