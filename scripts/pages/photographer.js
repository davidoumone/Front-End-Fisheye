//Mettre le code JavaScript lié à la page photographer.html
let namephotographe;
let prixlanguette;
let totalLikes;
var medias = [];
/**
 * photographer-media
 */

async function photographcard() {
  /**
   * recupération du paramètre url (id)
   */
  let idproduct = window.location.search.split("?").join("");
  /**
   * Récupère l'identite des photographes grace a la méthode fetch et filtrer grace a la méthode find avec id comme parametre
   */
  const { photographers } = await getmedias();
  const photographe = photographers.find(
    (resultphotographe) => resultphotographe.id == idproduct
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

async function getmedias() {
  /**
   * les données récupérées dans le json
   */
  try {
    let response = await fetch("../../data/photographers.json");
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

async function displayphotographcard(photographe) {
  const photographheader = document.querySelector(".photograph-header");
  photographheader.innerHTML = ` <h2>${photographe.name}</h2>
  <p>${photographe.city}, ${photographe.country}</p>
  <span>${photographe.tagline}</span>
  <button class="contact_button" onclick="displayModal()">
    Contactez-moi
  </button>
  <img
    class="photographer1"
    src="assets/photographers/Photographers ID Photos/${photographe.portrait}"
    alt="${photographe.name}"
  />`;
}

/**
 * medias du photographe
 */
async function initmedia() {
  /**
   * recupération du paramètre url (id)
   */
  let idproduct = window.location.search.split("?").join("");
  /**
   * Récupère les medias des photographes grace a la méthode fetch et filtrer grace a la méthode filter avec id comme parametre
   */
  const { media } = await getmedias();
  medias = media.filter(
    (resultmedia) => resultmedia.photographerId == idproduct
  );

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
 * afficher les media
 */
async function displaymedia() {
  let sectionmedia = "";
  medias.forEach((mediasphotographe) => {
    let mediacontain;
    if (mediasphotographe.image) {
      mediacontain = ` <article>
      <img
        src="./assets/photographers/${namephotographe}/${mediasphotographe.image}"
        alt="${mediasphotographe.title}"
        onclick="displaylightbox()"
      />
      <p id="title">${mediasphotographe.title}</p>
      <span>${mediasphotographe.likes}</span>
      <div class="photograph_heart">
        <i class="far fa-heart heart--empty"> </i>
        <i class="fas fa-heart heart--empty"></i>
      </div>
    </article>`;
    } else {
      mediacontain = ` <article>
      <video
      controls="controls"
      src="./assets/photographers/${namephotographe}/${mediasphotographe.video}"
      type="video/mp4"
    ></video>
    <p id="title">${mediasphotographe.title}</p>
    <span>${mediasphotographe.likes}</span>
    <div class="photograph_heart">
      <i class="far fa-heart heart--empty"> </i>
      <i class="fas fa-heart heart--empty"></i>
    </div>
  </article>`;
    }
    sectionmedia += mediacontain;
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
}

/**
 * TRIER LES MEDIAS SELON LE TITRE, LA DATE, LA POPULARITE
 */

async function trimedia() {
  const filtermedia = document.querySelectorAll(".selectopt");
  console.log(filtermedia);

  filtermedia.forEach((Option) => {
    Option.addEventListener("click", () => {
      if (document.getElementById("opt1").checked) {
        console.log("par dédaut checked");
      }
      if (document.getElementById("opt2").checked) {
        medias.sort(function (a, b) {
          return b.likes - a.likes;
        });
        console.log("popularite checked");
      }
      if (document.getElementById("opt3").checked) {
        medias.sort(function (a, b) {
          if (a.date.toLowerCase() > b.date.toLowerCase()) {
            return -1;
          }
        });
        console.log("date checked");
      }
      if (document.getElementById("opt4").checked) {
        medias.sort(function (a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
        });
        console.log("titre checked");
      }
      displaymedia();
    });
  });
}

/**
 * lightbox
 */
function displaylightbox() {
  const lightboxmodal = document.getElementById("lightbox");
  lightboxmodal.style.display = "block";
}

function closelightbox() {
  const lightboxmodal = document.getElementById("lightbox");
  lightboxmodal.style.display = "none";
}
