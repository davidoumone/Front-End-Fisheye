async function getPhotographers() {
  //  les données récupérées dans le json
  try {
    let response = await fetch("../../data/photographers.json");
    // let response = await fetch(
    //   "https://github.com/davidoumone/Front-End-Fisheye/blob/main/data/photographers.json",
    //   { mode: "no-cors" }
    // );

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

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();

/**
 * Cette fonction prend une liste de photographes et renvoie une chaîne HTML qui affiche les données
 * pour chaque photographe
 * @param photographers - un tableau d'objets contenant les données de chaque photographe.
 */
async function displayData(photographers) {
  let html = "";
  photographers.forEach((photographer) => {
    const photo = new CardPhotographe(
      photographer.name,
      photographer.id,
      photographer.city,
      photographer.country,
      photographer.tagline,
      photographer.price,
      photographer.portrait
    );
    //   const htmlSegment = `<article class="photographer_card">
    //   <a aria-label="accès a la page photographe" href="photographer.html?${photographer.id}">
    //     <img
    //       src="assets/photographers/Photographers ID Photos/${photographer.portrait}"
    //       alt="${photographer.portrait}"
    //     />
    //     <h3>${photographer.name}</h3>
    //   </a>
    //   <p>${photographer.city} ${photographer.country}</p>
    //   <span>${photographer.tagline}</span>
    //   <span class="prix">${photographer.price}€/jour</span>
    // </article>`;

    html += photo.indexdisplay();
  });
  const photographersSection = document.querySelector(".photographer_section");
  photographersSection.innerHTML = html;
}
