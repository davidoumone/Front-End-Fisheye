/* Création de variables globales qui seront utilisées dans le code ci-dessous. */
let namephotographe;
let prixlanguette;
let totalLikes;
var medias = [];
let filterdefault;
let index;

async function getmedias() {
  /**
   * les données récupérées dans le json
   */
  try {
    let response = await fetch("../../data/photographers.json");
    // let response = await fetch(
    //   "https://github.com/davidoumone/Front-End-Fisheye/blob/main/data/photographers.json",
    //   { mode: "no-cors" }
    // );
    if (response.ok) {
      /**
       * si le statut HTTP est 200-299
         obtenir le corps de la réponse (la méthode expliquée ci-dessous)
       */
      let datas = response.json();
      console.log(datas);
      /**
       * et bien retourner le tableau photographers seulement une fois
       */
      return datas;
    } else {
      console.log("Retour du serveur: " + response.status);
    }
  } catch (error) {
    console.log(error);
  }
}
/**
 * photographer-media
 */

async function photographcard() {
  /**
   * recupération du paramètre url (id)
   */
  let idphotographe = window.location.search.split("?").join("");
  /**
   * Récupère l'identite des photographes grace a la méthode fetch et filtrer grace a la méthode find avec id comme parametre
   */
  const { photographers } = await getmedias();
  const photographe = photographers.find(
    (resultphotographe) => resultphotographe.id == idphotographe
  );
  displayphotographcard(photographe);
  /**
   * variable utilisé pour le chemin du media
   */
  namephotographe = photographe.name;
  /**
   * variable utilisé pour récupérer le prix du photographe affiché sur la languette;
   */
  prixlanguette = photographe.price;
}

photographcard();

/**
 * Cette fonction affiche les informations d'un photographe dans le DOM
 * @param photographe - L'objet contenant les informations du photographe.
 */
async function displayphotographcard(photographe) {
  let headerPhotographe = "";
  const photograph = new CardPhotographe(
    photographe.name,
    photographe.id,
    photographe.city,
    photographe.country,
    photographe.tagline,
    photographe.price,
    photographe.portrait
  );

  headerPhotographe = photograph.mediaDisplay();
  const photographheader = document.querySelector(".photograph-header");
  photographheader.innerHTML = headerPhotographe;
  // photographheader.innerHTML = ` <h2 tabindex="0">${photographe.name}</h2>
  // <p>${photographe.city}, ${photographe.country}</p>
  // <span>${photographe.tagline}</span>
  // <button class="contact_button" onclick="displayModal()">
  //   Contactez-moi
  // </button>
  // <img tabindex="0"
  //   class="photographer1"
  //   src="assets/photographers/Photographers ID Photos/${photographe.portrait}"
  //   alt="${photographe.name}"
  // />`;
}

/**
 * medias du photographe
 */
async function initmedia() {
  /**
   * recupération du paramètre url (id)
   */
  let idphotographe = window.location.search.split("?").join("");
  /**
   * Récupère les medias des photographes grace a la méthode fetch et filtrer grace a la méthode filter avec id comme parametre
   */
  const { media } = await getmedias();
  medias = media.filter(
    (resultmedia) => resultmedia.photographerId == idphotographe
  );

  filterdefault = medias.sort(function (a, b) {
    return b.id - a.id;
  });

  /**
   * nombre total de likes pour la languette
   */
  initialvalue = 0;
  totalLikes = medias.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.likes;
  }, initialvalue);

  displaymedia();
  trimedia();
}

initmedia();

/**
 * Cette fonction affiche les médias du photographe dans la section medias
 */
async function displaymedia() {
  let sectionmedia = "";
  medias.forEach((mediasphotographe) => {
    const media = new Mediafactories(mediasphotographe, namephotographe);
    // // if (mediasphotographe.image) {
    //   //   mediacontain = ` <article>
    //   //   <img tabindex="0" class="gallerie-image"
    //   //     src="./assets/photographers/${namephotographe}/${mediasphotographe.image}"
    //   //     alt="${mediasphotographe.title}"
    //   //   />
    //   //   <p id="title">${mediasphotographe.title}</p>
    //   //   <span class="numberLikes">${mediasphotographe.likes}</span>
    //   //   <div class="photograph_heart">
    //   //     <i class="far fa-heart heart--empty"> </i>
    //   //     <i class="fas fa-heart heart--empty likeselect"></i>
    //   //   </div>
    //   // </article>`;
    //   const media = new Image(mediasphotographe.image, mediasphotographe.title, mediasphotographe.likes, mediasphotographe.id, mediasphotographe.photographerId, mediasphotographe.date, mediasphotographe.price, namephotographe);
    //   mediacontain = media.display();
    // // } else {
    //   //     mediacontain = ` <article>
    //   //     <video tabindex="0" class="gallerie-image"
    //   //     autoplay loop
    //   //     src="./assets/photographers/${namephotographe}/${mediasphotographe.video}"
    //   //     type="video/mp4">
    //   //     </video>
    //   //   <p id="title">${mediasphotographe.title}</p>
    //   //   <span class="numberLikes">${mediasphotographe.likes}</span>
    //   //   <div class="photograph_heart">
    //   //     <i class="far fa-heart heart--empty"> </i>
    //   //     <i class="fas fa-heart heart--empty likeselect"></i>
    //   //   </div>
    //   // </article>`;
    //   const media = new Video();
    //   mediacontain = media.display();
    // }

    sectionmedia += media.display();
  });

  const mediasection = document.querySelector(".photograph-photos");
  mediasection.innerHTML = sectionmedia;

  /**
   * languette avec prix et likes
   */
  const animlanguette = document.querySelector(".languette");
  animlanguette.innerHTML = `<p class="languette_vue">${totalLikes}</p>
  <i class="fas fa-heart heart--empty"> </i>
  <p class="languette_prix">${prixlanguette}€ / jour</p>`;

  lightbox();
  clicklikes();
}

/**
 *  ajoute un écouteur d'événement à chaque bouton "J'aime".
 */
async function clicklikes() {
  const likes = document.querySelectorAll(".likeselect");
  likes.forEach((increment) => {
    increment.addEventListener("click", (event) => {
      const indexlike = Array.from(likes).indexOf(event.target);
      recuplike(indexlike);
    });
  });
}

/**
 *  incrémente les goûts d'un média spécifique de 1.
 * @param likeelement - L'élément qui contient le bouton J'aime.
 */
function recuplike(likeelement) {
  index = likeelement;
  const incrementlike = medias[index];
  ++incrementlike.likes;
  ++totalLikes;
  displaymedia();
}

/**
 * * Cette fonction est utilisée pour trier les médias selon l'option sélectionnée
 */
async function trimedia() {
  const filtermedia = document.querySelectorAll(".selectopt");

  filtermedia.forEach((Option) => {
    Option.addEventListener("click", () => {
      if (document.getElementById("opt1").checked) {
        medias.sort(function (a, b) {
          return b.id - a.id;
        });
      }
      if (document.getElementById("opt2").checked) {
        medias.sort(function (a, b) {
          return b.likes - a.likes;
        });
      }
      if (document.getElementById("opt3").checked) {
        medias.sort(function (a, b) {
          if (a.date.toLowerCase() > b.date.toLowerCase()) {
            return -1;
          }
        });
      }
      if (document.getElementById("opt4").checked) {
        medias.sort(function (a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
        });
      }
      displaymedia();
    });
  });
}

/**
 * fonction qui crée un événement click pour chaque élément du tableau lightbox.
 * Utilisation de la méthode indexOf pour trouver l'index de l'élément dans le tableau.
 */
async function lightbox() {
  const lightbox = document.querySelectorAll(".gallerie-image");
  lightbox.forEach((datalightbox) => {
    datalightbox.addEventListener("click", (event) => {
      const index = Array.from(lightbox).indexOf(event.target);
      clicklightbox(index);
    });
  });
}

/**
 * Cliquez sur l'image pour ouvrir la lightbox
 * @param indexelement - l'index de l'élément que vous souhaitez afficher dans la lightbox.
 */
function clicklightbox(indexelement) {
  const lightboxmodal = document.getElementById("lightbox");
  lightboxmodal.style.display = "block";
  index = indexelement;
  displaylightboxelement();
}

/**
 * La fonction affiche l'image ou la vidéo dans la lightbox
 * Créer une variable appelée `element` et lui affecter la valeur de l'index du tableau `medias`.
 */
function displaylightboxelement() {
  const element = medias[index];
  let lightboxcontain = "";
  if (element.image) {
    lightboxcontain = `
    <img class="gallerie-image"
      src="./assets/photographers/${namephotographe}/${element.image}"
      alt="${element.title}"
    />
    <p id="title">${element.title}</p>`;
  } else {
    lightboxcontain = `
    <video class="gallerie-image"
    autoplay loop
    src="./assets/photographers/${namephotographe}/${element.video}"
    type="video/mp4">
    </video>
  <p id="title">${element.title}</p>`;
  }
  document.querySelector("#lightbox_contain").innerHTML = lightboxcontain;
}

/**
 * Ajout d'un écouteur d'événement à l'élément avec la classe `lightbox__close`
 * et lorsque l'élément est cliqué, il appellera la fonction `closelightox()`.
 */
document.querySelector(".lightbox__close").addEventListener("click", () => {
  closelightox();
});

/**
 * Ajout d'un écouteur d'événement à l'élément avec la classe `lightbox__next`
 * et lorsque l'élément est cliqué, il appellera la fonction `deplacementdroite()`.
 */
document.querySelector(".lightbox__next").addEventListener("click", () => {
  deplacementdroite();
});

/**
 * Ajout d'un écouteur d'événement à l'élément avec la classe `lightbox__prev`
 * et lorsque l'élément est cliqué, il appellera la fonction `deplacementgauche()`.
 */
document.querySelector(".lightbox__prev").addEventListener("click", () => {
  deplacementgauche();
});

/**
 * Si l'index est égal à la longueur du tableau, définissez l'index sur 0, sinon, incrémentez l'index de 1.
 */
function deplacementdroite() {
  index = index + 1;
  if (index == medias.length) {
    index = 0;
  }
  displaylightboxelement();
}

/**
 * Si l'index est inférieur à zéro, définissez l'index sur le dernier élément du tableau.
 */
function deplacementgauche() {
  index = index - 1;
  if (index == -1) {
    index = medias.length - 1;
  }
  displaylightboxelement();
}

/**
 * Lorsque l'utilisateur clique sur le bouton de fermeture, la lightbox sera masquée.
 */
function closelightox() {
  const lightboxmodal = document.getElementById("lightbox");
  lightboxmodal.style.display = "none";
}

/**
 * touches clavier
 */

document.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    clicklightbox();
  }
  if (e.key == "ArrowLeft") {
    deplacementgauche();
  }

  if (e.key == "ArrowRight") {
    deplacementdroite();
  }

  if (e.key == "Escape") {
    closelightox();
  }
});
