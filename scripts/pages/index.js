async function getPhotographers() {
  //  les données récupérées dans le json
  try {
    let response = await fetch("../../data/photographers.json");
    if (response.ok) {
      // si le statut HTTP est 200-299
      // obtenir le corps de la réponse (la méthode expliquée ci-dessous)
      let datas = response.json();
      console.log(datas);
      // et bien retourner le tableau photographers seulement une fois
      return datas;
    } else {
      console.log("Retour du serveur: " + response.status);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Cette fonction prend une liste de photographes et renvoie une chaîne HTML qui affiche les données
 * pour chaque photographe
 * @param photographers - un tableau d'objets contenant les données de chaque photographe.
 */
async function displayData(photographers) {
  let html = "";
  photographers.forEach((photographer) => {
    const htmlSegment = `<article class="photographer_card">
    <a aria-label="accès a la page photographe" href="photographer.html?${photographer.id}">
      <img
        src="assets/photographers/Photographers ID Photos/${photographer.portrait}"
        alt="${photographer.portrait}"
      />
      <h3>${photographer.name}</h3>
    </a>
    <p>${photographer.city} ${photographer.country}</p>
    <span>${photographer.tagline}</span>
    <span class="prix">${photographer.price}€/jour</span>
  </article>`;

    html += htmlSegment;
  });
  const photographersSection = document.querySelector(".photographer_section");
  photographersSection.innerHTML = html;
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  console.log(photographers);
  displayData(photographers);
}

init();
