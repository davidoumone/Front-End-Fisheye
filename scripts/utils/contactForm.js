function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// validation du formulaire
function validate() {
  alert("formulaire envoyé");
  initialize();
}

// réinitialise le formulaire
function initialize() {
  // reinitialisation des messages d'erreurs
  let myerreur = document.getElementsByClassName("error");
  for (let msgerreur = 0; msgerreur < myerreur.length; msgerreur++) {
    myerreur[msgerreur].classList.add("erreur-disappared");
  }
  form.reset();
}

// DOM elements
const form = document.querySelector("#Messenger");

// CHAMP PRENOM

// addEventListener() méthode pour enregistrer un écouteur d'événement avec change comme type d'évènements.
form.first.addEventListener("change", function () {
  // appel de la fonction prise en charge this = paramètre de la fonction validfirst (firstname)
  validfirst(this);
});

const validfirst = function (firstname) {
  if (firstname.value.length < 4) {
    let myerreur = document.getElementsByClassName("error")[0];
    myerreur.innerHTML =
      "Veuillez entrer 4 caractères ou plus pour le champ prénom.";
    myerreur.classList.add("error-error");
    myerreur.classList.remove("error-validation");
    return false;
  } else {
    let myerreur = document.getElementsByClassName("error")[0];
    myerreur.innerHTML = "Prénom valide.";
    myerreur.classList.add("error-validation");
    myerreur.classList.remove("error-error");
    console.log(firstname.value);
    return true;
  }
};

// CHAMP NOM
form.last.addEventListener("change", function () {
  validlast(this);
});

const validlast = function (lastname) {
  if (lastname.value.length < 4) {
    let myerreur = document.getElementsByClassName("error")[1];
    myerreur.innerHTML =
      "Veuillez entrer 4 caractères ou plus pour le champ nom.";
    myerreur.classList.add("error-error");
    myerreur.classList.remove("error-validation");
    return false;
  } else {
    let myerreur = document.getElementsByClassName("error")[1];
    myerreur.innerHTML = "Nom valide.";
    myerreur.classList.add("error-validation");
    myerreur.classList.remove("error-error");
    console.log(lastname.value);
    return true;
  }
};

// CHAMP EMAIL
form.email.addEventListener("change", function () {
  validemail(this);
});

const validemail = function (email) {
  //création de la regex exp pour validation email
  let emailRegex = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );

  // test pour format email
  let testemail = emailRegex.test(email.value);

  if (testemail) {
    let myerreur = document.getElementsByClassName("error")[2];
    myerreur.innerHTML = "email valide";
    myerreur.classList.add("error-validation");
    myerreur.classList.remove("error-error");
    console.log(email.value);
    return true;
  } else {
    let myerreur = document.getElementsByClassName("error")[2];
    myerreur.innerHTML = "Veuillez entrer une adresse email valide";
    myerreur.classList.add("error-error");
    myerreur.classList.remove("error-validation");
    return false;
  }
};

// CHAMP textarea
form.texteMessage.addEventListener("change", function () {
  validMessage(this);
});

const validMessage = function (Message) {
  if (Message.value) {
    console.log(Message.value);
  }
}

// form submit
form.addEventListener("submit", function (event) {
  event.preventDefault();
});
