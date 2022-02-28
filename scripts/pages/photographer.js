//Mettre le code JavaScript lié à la page photographer.html
let namephotographe;
/*********************BARRE DE FILTRES**********************************************************************/
function DropDown(dropDown) {
  const [toggler, menu] = dropDown.children;

  const handleClickOut = (e) => {
    if (!dropDown) {
      return document.removeEventListener("click", handleClickOut);
    }

    if (!dropDown.contains(e.target)) {
      this.toggle(false);
    }
  };

  const setValue = (item) => {
    const val = item.textContent;
    toggler.textContent = val;
    this.value = val;
    this.toggle(false);
    dropDown.dispatchEvent(new Event("change"));
    toggler.focus();
  };

  const handleItemKeyDown = (e) => {
    e.preventDefault();

    if (e.keyCode === 38 && e.target.previousElementSibling) {
      // up
      e.target.previousElementSibling.focus();
    } else if (e.keyCode === 40 && e.target.nextElementSibling) {
      // down
      e.target.nextElementSibling.focus();
    } else if (e.keyCode === 27) {
      // escape key
      this.toggle(false);
    } else if (e.keyCode === 13 || e.keyCode === 32) {
      // enter or spacebar key
      setValue(e.target);
    }
  };

  const handleToggleKeyPress = (e) => {
    e.preventDefault();

    if (e.keyCode === 27) {
      // escape key
      this.toggle(false);
    } else if (e.keyCode === 13 || e.keyCode === 32) {
      // enter or spacebar key
      this.toggle(true);
    }
  };

  toggler.addEventListener("keydown", handleToggleKeyPress);
  toggler.addEventListener("click", () => this.toggle());
  [...menu.children].forEach((item) => {
    item.addEventListener("keydown", handleItemKeyDown);
    item.addEventListener("click", () => setValue(item));
  });

  this.element = dropDown;

  this.value = toggler.textContent;

  this.toggle = (expand = null) => {
    expand =
      expand === null ? menu.getAttribute("aria-expanded") !== "true" : expand;

    menu.setAttribute("aria-expanded", expand);

    if (expand) {
      toggler.classList.add("active");
      document.addEventListener("click", handleClickOut);
      dropDown.dispatchEvent(new Event("opened"));
    } else {
      toggler.classList.remove("active");
      dropDown.dispatchEvent(new Event("closed"));
      document.removeEventListener("click", handleClickOut);
    }
  };
}

const dropDown = new DropDown(document.querySelector(".dropdown"));

dropDown.element.addEventListener("change", (e) => {});

dropDown.element.addEventListener("opened", (e) => {});

dropDown.element.addEventListener("closed", (e) => {});

dropDown.toggle();
/*********************LIGHTBOX**********************************************************************/
function displaylightbox() {
  const lightboxmodal = document.getElementById("lightbox");
  lightboxmodal.style.display = "block";
}

function closelightbox() {
  const lightboxmodal = document.getElementById("lightbox");
  lightboxmodal.style.display = "none";
}

/*********************photographer-media**********************************************************************/

async function photographcard() {
  // recupération du paramètre url (id)
  let idproduct = window.location.search.split("?").join("");
  // Récupère l'identite des photographes grace a la méthode fetch et filtrer grace a la méthode find avec id comme parametre
  const { photographers } = await getmedias();
  const photographe = photographers.find(
    (resultphotographe) => resultphotographe.id == idproduct
  );  
  console.log(photographe);
  displayphotographcard(photographe);
  // variable utilisé pour le chemin du media
  namephotographe= photographe.name;
}

photographcard();

async function getmedias() {
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

/******************** medias du photographe ****************************************/
async function initmedia() {
  // recupération du paramètre url (id)
  let idproduct = window.location.search.split("?").join("");
  // Récupère les medias des photographes grace a la méthode fetch et filtrer grace a la méthode filter avec id comme parametre
  const { media } = await getmedias();
  const newmedia = media.filter(
    (resultmedia) => resultmedia.photographerId == idproduct
  );

  console.log(newmedia);
  displaymedia(newmedia);
}

initmedia();

async function displaymedia(newmedia) {
  let sectionmedia = "";
  newmedia.forEach((mediasphotographe) => {
    const mediacontain = ` <article>
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

    sectionmedia += mediacontain;
  });

  const mediasection = document.querySelector(".photograph-photos");
  mediasection.innerHTML = sectionmedia;
}
