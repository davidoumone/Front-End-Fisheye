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
 * Il prend un tableau d'objets, les parcourt en boucle,
 * crée une nouvelle instance de la classe CardPhotographe pour chaque objet,
 * puis ajoute le résultat de la méthode indexdisplay() à la variable html.
 * @param photographers - est un tableau d'objets
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

    html += photo.indexdisplay();
  });
  const photographersSection = document.querySelector(".photographer_section");
  photographersSection.innerHTML = html;
}
