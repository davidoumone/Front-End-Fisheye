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

// eslint-disable-next-line no-unused-vars
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
