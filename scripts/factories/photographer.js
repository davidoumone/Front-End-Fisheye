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
        src="assets/photographers/Photographers ID Photos/${this.portrait}"
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
      src="assets/photographers/Photographers ID Photos/${this.portrait}"
      alt="${this.name}"
    />`;
    return photographeDisplay;
  }
}

class Image {
  /**
   * C'est une fonction constructeur qui prend 8 paramètres et les affecte aux propriétés de
   * l'objet créé lors de l'appel de la fonction.
   * @param image - l'url de l'image
   * @param title - le titre de la photo
   * @param likes - nombres de likes
   * @param id - l'id de la photo
   * @param photographerId - l'identifiant du photographe qui a pris la photo
   * @param date - la date de l'image
   * @param price - le prix de la photo
   * @param namephotographe - le nom du photographe
   */
  constructor(
    image,
    title,
    likes,
    id,
    photographerId,
    date,
    price,
    namephotographe
  ) {
    this.image = image;
    this.title = title;
    this.likes = likes;
    this.id = id;
    this.photographerId = photographerId;
    this.date = date;
    this.price = price;
    this.namephotographe = namephotographe;
  }

  /**
   * Il renvoie une chaîne de code HTML
   * @returns la variable mediacontain.
   */
  display() {
    const mediacontain = ` <article>
    <img tabindex="0" class="gallerie-image"
      src="./assets/photographers/${this.namephotographe}/${this.image}"
      alt="${this.title}"
    />
    <p id="title">${this.title}</p>
    <span class="numberLikes">${this.likes}</span>
    <div class="photograph_heart">
      <i class="far fa-heart heart--empty"> </i>
      <i class="fas fa-heart heart--empty likeselect"></i>
    </div>
  </article>`;
    return mediacontain;
  }
}

class Video {
  /**
   * C'est une fonction constructeur qui prend 8 paramètres et les affecte aux propriétés de
   * l'objet créé lors de l'appel de la fonction.
   * @param image - l'url de la video
   * @param title - le titre de la photo
   * @param likes - nombres de likes
   * @param id - l'id de la photo
   * @param photographerId - l'identifiant du photographe qui a pris la photo
   * @param date - la date de l'image
   * @param price - le prix de la photo
   * @param namephotographe - le nom du photographe
   */
  constructor(
    video,
    title,
    likes,
    id,
    photographerId,
    date,
    price,
    namephotographe
  ) {
    this.video = video;
    this.title = title;
    this.likes = likes;
    this.id = id;
    this.photographerId = photographerId;
    this.date = date;
    this.price = price;
    this.namephotographe = namephotographe;
  }

  /**
   * Il renvoie une chaîne de code HTML
   * @returns la variable mediacontain.
   */
  display() {
    const mediacontain = ` <article>
    <video tabindex="0" class="gallerie-image"
    autoplay loop
    src="./assets/photographers/${this.namephotographe}/${this.video}"
    type="video/mp4">
    </video>
  <p id="title">${this.title}</p>
  <span class="numberLikes">${this.likes}</span>
  <div class="photograph_heart">
    <i class="far fa-heart heart--empty"> </i>
    <i class="fas fa-heart heart--empty likeselect"></i>
  </div>
</article>`;
    return mediacontain;
  }
}

class Mediafactories {
  /**
   * fonction utilsé dans photographer.js
   * Si l'objet média a une propriété image, renvoie un nouvel objet Image, sinon renvoie un nouvel objetvidéo
   * @param media - l'objet média de l'API
   * @param namephotographe - le nom du photographe
   * @returns Le constructeur renvoie une nouvelle instance de Image ou Video.
   */
  constructor(media, namephotographe) {
    if (media.image) {
      return new Image(
        media.image,
        media.title,
        media.likes,
        media.id,
        media.photographerId,
        media.date,
        media.price,
        namephotographe
      );
    } else {
      return new Video(
        media.video,
        media.title,
        media.likes,
        media.id,
        media.photographerId,
        media.date,
        media.price,
        namephotographe
      );
    }
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
