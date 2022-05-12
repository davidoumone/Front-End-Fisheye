 // eslint-disable-next-line no-unused-vars
 class CardPhotographe {
  constructor(name, id, city, country, tagline, price, portrait) {
    this.name = name;
    this.id = id;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.price = price;
    this.portrait = portrait;
  }

  /**
   * fonction utilsé dans index.js
   * @returns la variable htmlSegment
   */
  indexdisplay() {
    const htmlSegment = `<article class="photographer_card">
    <a aria-label="accès a la page photographe" href="photographer.html?${this.id}">
      <img
        src="assets/photographers/Photographers-ID-Photos/${this.portrait}"
        alt="${this.portrait}"
      />
      <h3>${this.name}</h3>
    </a>
    <p>${this.city} ${this.country}</p>
    <span>${this.tagline}</span>
    <span class="prix">${this.price}€/jour</span>
  </article>`;
    return htmlSegment;
  }

  /**
   * fonction utilsé dans photographer.js
   * @returns la variable photographeDisplay
   */
  mediaDisplay() {
    const photographeDisplay = ` <h2 tabindex="0">${this.name}</h2>
    <p>${this.city}, ${this.country}</p>
    <span>${this.tagline}</span>
    <button class="contact_button" onclick="displayModal()">
      Contactez-moi
    </button>
    <img tabindex="0"
      class="photographer1"
      src="assets/photographers/Photographers-ID-Photos/${this.portrait}"
      alt="${this.name}"
    />`;
    return photographeDisplay;
  }
}

/**
 * début du projet openclassroom
 */

/**
 * DOSSIER PAGES + FICHIER INDEX.JS
 */
//  async function getPhotographers() {
//   // Penser à remplacer par les données récupérées dans le json
//   const photographers = [
//       {
//           "name": "Ma data test",
//           "id": 1,
//           "city": "Paris",
//           "country": "France",
//           "tagline": "Ceci est ma data test",
//           "price": 400,
//           "portrait": "account.png"
//       },
//       {
//           "name": "Autre data test",
//           "id": 2,
//           "city": "Londres",
//           "country": "UK",
//           "tagline": "Ceci est ma data test 2",
//           "price": 500,
//           "portrait": "account.png"
//       },
//   ]
//   // et bien retourner le tableau photographers seulement une fois
//   return ({
//       photographers: [...photographers, ...photographers, ...photographers]})
// }

// async function displayData(photographers) {
//   const photographersSection = document.querySelector(".photographer_section");

//   photographers.forEach((photographer) => {
//       const photographerModel = photographerFactory(photographer);
//       const userCardDOM = photographerModel.getUserCardDOM();
//       photographersSection.appendChild(userCardDOM);
//   });
// };

// async function init() {
//   // Récupère les datas des photographes
//   const { photographers } = await getPhotographers();
//   displayData(photographers);
// };

// init();

/**
 * DOSSIER FACTORIES + FICHIER PHOTOGRAPHER.JS
 */

//  function photographerFactory(data) {
//   const { name, portrait } = data;

//   const picture = `assets/photographers/${portrait}`;

//   function getUserCardDOM() {
//       const article = document.createElement( 'article' );
//       const img = document.createElement( 'img' );
//       img.setAttribute("src", picture)
//       const h2 = document.createElement( 'h2' );
//       h2.textContent = name;
//       article.appendChild(img);
//       article.appendChild(h2);
//       return (article);
//   }
//   return { name, picture, getUserCardDOM }
// }
