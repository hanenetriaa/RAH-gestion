/** @format */

// Création de mon tableau de produit à vide
let produitArray = [];

//***********************HANENE */
/***************************************
 * hanenen
 ************************************/

/** creation de mes constante (hanene pour mon popupform) */
const btnPlusItem = document.querySelector("#btnPlusItem");
const modal = document.querySelector(".form-modal");
const close = document.querySelector(".close");
/*
Montre le Degre
 */
function montreDegre() {
  let InputDegre = document.querySelector(`#degre`);

  let typeProduit = document.querySelector(`#typeProduit`);
  let valueType = typeProduit.value;

  console.log(valueType);

  if (valueType == `BA`) {
    InputDegre.classList.remove(`hidden`);
  } else {
    InputDegre.classList.add(`hidden`);
  }
}

btnPlusItem.addEventListener("click", () => {
  modal.style.display = "flex";

  close.addEventListener("click", () => {
    modal.style.display = "none";
  });
});

// Création de l'objet produit vide
function ajouterProduit() {
  let formQuery = document.querySelector(".formulaire-produit");
  // Récupération de ma liste

  // Création de l'addEventListener du formulaire
  // Récupération des données du formulaires
  let data = new FormData(formQuery);
  // variable de mon formulaire

  let dataQuery = {
    produit: data.get("titre"),
    selectProduit: data.get("ref"),
    quantiteProduit: data.get("qte"),
    achatHtProduit: data.get("achatHT"),
    venteHtProduit: data.get("venteHT"),
    degrechoix: data.get("degrechoix"),
  };

  let addProduit;

  if (1 != 1) {
    alert("Veuillez remplir tout les champs");
  } else {
    if (dataQuery.selectProduit == "BA") {
      addProduit = new ProtoProduitBa(
        dataQuery.produit,
        dataQuery.selectProduit,
        dataQuery.quantiteProduit,
        dataQuery.achatHtProduit,
        dataQuery.venteHtProduit,
        dataQuery.degrechoix
      );

      console.log(addProduit);
    } else {
      addProduit = new ProtoProduitBna(
        dataQuery.produit,
        dataQuery.selectProduit,
        dataQuery.quantiteProduit,
        dataQuery.achatHtProduit,
        dataQuery.venteHtProduit
      );
    }
    produitArray = JSON.parse(localStorage.getItem(`@produit`));

    if (produitArray == null) {
      produitArray = [];
    } else {
      false;
    }
    // On envoie l'objet produit dans le tableau produitArray
    produitArray.push(addProduit);

    // Créer un localStorage avec la valeur de contactArray
    localStorage.setItem("@produit", JSON.stringify(produitArray));

    showNewProduit(addProduit, produitArray);
  }
}

// Show Produit

function showNewProduit(addProduit, produitArray) {
  let gestionDivQuery = document.querySelector("#myUL");

  let li = document.createElement(`li`);

  let marge = Number(
    addProduit.venteHtProduit - addProduit.achatHtProduit
  ).toFixed(2);
  let prixTTC = Number(addProduit.venteHtProduit * 1.2).toFixed(2);
  let content = ` 
      <li class="myLI"> <div id="confirmList" class="editList"><button class="edit btn btn-warning btn-xs">Edit</button></div>
      <div class="nomList">${addProduit.produit}</div>
      <div class="qteList"><input  style="width: 100%;" type="number" name="qte" id="qteList" class="quantiteLis" min="0" max="100" onchange="gestionStock()" value="${
        addProduit.quantiteProduit
      }" /> </div>
      <div class="selectList"> ${
        addProduit.selectProduit == `BA`
          ? `${addProduit.selectProduit} (${addProduit.degreChoix})`
          : `${addProduit.selectProduit}`
      }</div>
      <div class="achatHTList">${addProduit.achatHtProduit} €</div>
      <div class="venteHTList">${addProduit.venteHtProduit} €</div>
      <div class="margeList">${marge} €</div>
      <div class="prixTTCList">${prixTTC} €</div>
      <div class ="deleteButton"><button class="delete btn btn-danger btn-xs" title="Delete"><span class="glyphicon glyphicon-remove">×</span></button></div>      </li>`;

  li.innerHTML = content;
  gestionDivQuery.appendChild(li);

  console.log(produitArray);

  modal.style.display = "none";

  deleteProduit();
  editProduit(produitArray);
  verifyQte();
}

function editProduit() {
  let produitArray = JSON.parse(localStorage.getItem(`@produit`));
  let edit = document.querySelectorAll(`.editList`);

  edit.forEach((element, index) => {
    element.addEventListener(`click`, function () {
      // criação do input

      let myLI = document.querySelectorAll(`.myLI`);

      let marge = Number(
        produitArray[index].venteHtProduit - produitArray[index].achatHtProduit
      ).toFixed(2);
      let prixTTC = Number(produitArray[index].venteHtProduit * 1.2).toFixed(2);

      myLI[
        index
      ].innerHTML = `<div id="confirmList" class="editList"><button onclick="confirmerAlteration()" class="save btn btn-primary btn-xs">Save</button></div>
      <div class="nomList"><input style="width: 100%;" id="nomList" value="${
        produitArray[index].produit
      }"></div>
      <div class="qteList"><input style="width: 100%;" type="number" name="qte" id="qteList" class="quantiteLis" min="0" max="100" onchange="gestionStock()" value="${
        produitArray[index].quantiteProduit
      }" /> </div>
      <div class="selectList"> ${
        produitArray[index].selectProduit == `BA`
          ? `${produitArray[index].selectProduit} (${produitArray[index].degreChoix})`
          : `${produitArray[index].selectProduit} `
      }</div>
      <div class="achatHTList"><input style="width: 100%;" id="achatHtList" value="${
        produitArray[index].achatHtProduit
      }"></div>
      <div class="venteHTList"><input style="width: 100%;" id="venteHtList" value="${
        produitArray[index].venteHtProduit
      }"></div>
      <div class="margeList">${marge} €</div>
      <div class="prixTTCList">${prixTTC} €</div>
      <div class ="deleteButton"><button class="delete btn btn-danger btn-xs" title="Delete"><span class="glyphicon glyphicon-remove">×</span></button></div>`;
    });
  });
}

/**
 * Confirmer alteration
 */

function confirmerAlteration() {
  let produitArray = JSON.parse(localStorage.getItem(`@produit`));
  let checkIcon = document.querySelectorAll(`#confirmList`);

  checkIcon.forEach((element, index) => {
    element.addEventListener(`click`, function () {
      let myLI = document.querySelectorAll(`.myLI`);

      let nomList = document.querySelector(`#nomList`);
      let qteList = document.querySelector(`#qteList`);
      let achatHTList = document.querySelector(`#achatHtList`);
      let venteHTList = document.querySelector(`#venteHtList`);

      let marge = Number(venteHTList.value - achatHTList.value).toFixed(2);
      let prixTTC = Number(venteHTList.value * 1.2).toFixed(2);

      myLI[
        index
      ].innerHTML = `<div class="editList"><button class="edit btn btn-warning btn-xs">Edit</button></div>
        <div class="nomList">${nomList.value}</div>
        <div class="qteList"><input type="number" name="qte" id="qteList"  style="width: 100%;" onchange="gestionStock()" min="0" max="100" class="quantiteLis" value="${
          qteList.value
        }" /> </div>
        <div class="selectList"> ${
          produitArray[index].selectProduit == `BA`
            ? `${produitArray[index].selectProduit} (${produitArray[index].degreChoix})`
            : `${produitArray[index].selectProduit} `
        }</div>
        <div class="achatHTList">${achatHTList.value} €</div>
        <div class="venteHTList">${venteHTList.value} €</div>
        <div class="margeList">${marge} €</div>
        <div class="prixTTCList">${prixTTC} €</div>
        <div class ="deleteButton"><button class="delete btn btn-danger btn-xs" title="Delete"><span class="glyphicon glyphicon-remove">×</span></button></div>`;

      // Alteration sur le localStorage

      produitArray[index].quantiteProduit = qteList.value;
      produitArray[index].produit = nomList.value;
      produitArray[index].achatHtProduit = achatHTList.value;
      produitArray[index].venteHtProduit = venteHTList.value;

      console.log(produitArray[index]);

      localStorage.setItem(`@produit`, JSON.stringify(produitArray));

      editProduit(produitArray);
      verifyQte();
    });
  });
}

// Suppression de mon paragraphe
function deleteProduit() {
  let deleteButtonQuery = document.querySelectorAll(".deleteButton");
  // Création de l'add event listener qui va supprimer mon paragraphe

  // Pour chaque element de mon tableau je déclenche la fonction anonyme
  deleteButtonQuery.forEach(function (buttonDeletes, index) {
    buttonDeletes.addEventListener("click", function () {
      let li = deleteButtonQuery[index].parentElement;
      li.remove();

      // Suprimer sur le localStorage

      produitArray = JSON.parse(localStorage.getItem(`@produit`));

      produitArray.splice(index, 1);
      localStorage.setItem(`@produit`, JSON.stringify(produitArray));
    });
  });
}

// Gestion Stock (input Number)

function gestionStock() {
  let li = document.querySelectorAll(".myLI");
  li.forEach((element, index) => {
    let arrayLS = JSON.parse(localStorage.getItem(`@produit`));
    let qteLS = arrayLS[index].quantiteProduit;
    let input = li[index].querySelector(`.quantiteLis`);

    if (qteLS != input.value) {
      arrayLS[index].quantiteProduit = input.value;
      localStorage.setItem(`@produit`, JSON.stringify(arrayLS));

      verifyQte();
    } else {
      false;
    }
  });
}

/**************************************************************************
 * VERIFICATION DU STOCK
 */

function verifyQte() {
  let li = document.querySelectorAll(".myLI");

  li.forEach((element, index) => {
    let arrayLS = JSON.parse(localStorage.getItem(`@produit`));
    if (arrayLS[index].quantiteProduit <= 5) {
      let inputQte = li[index].querySelector(`#qteList`);

      inputQte.setAttribute(`style`, `width: 100%; background-color: red;`);
    } else {
      let inputQte = li[index].querySelector(`#qteList`);

      inputQte.setAttribute(`style`, `width: 100%;`);
    }
  });
}

/**************************************************************************
 * LOCALSTORAGE
 */

function showLSProduit() {
  let arrayLS = JSON.parse(localStorage.getItem(`@produit`));

  if (arrayLS == null) {
    arrayLS = [];
  } else {
    false;
  }

  arrayLS.forEach((element, index) => {
    let gestionDivQuery = document.querySelector("#myUL");

    let li = document.createElement(`li`);

    let marge = Number(
      arrayLS[index].venteHtProduit - arrayLS[index].achatHtProduit
    ).toFixed(2);
    let prixTTC = Number(arrayLS[index].venteHtProduit * 1.2).toFixed(2);

    let content = ` 
      <li class="myLI"> <div id="confirmList" class="editList"><button class="edit btn btn-warning btn-xs">Edit</button></div>
      <div class="nomList">${arrayLS[index].produit}</div>
      <div class="qteList"><input type="number" name="qte" id="qteList" style="width: 100%;" min="0" max="100" class="quantiteLis" onchange="gestionStock()" value="${
        arrayLS[index].quantiteProduit
      }" /> </div>
      <div class="selectList"> ${
        arrayLS[index].selectProduit == `BA`
          ? `${arrayLS[index].selectProduit} (${arrayLS[index].degreChoix})`
          : `${arrayLS[index].selectProduit}`
      }</div>
      <div class="achatHTList">${arrayLS[index].achatHtProduit} €</div>
      <div class="venteHTList">${arrayLS[index].venteHtProduit} €</div>
      <div class="margeList">${marge} €</div>
      <div class="prixTTCList">${prixTTC} €</div>
      <div class ="deleteButton"><button class="delete btn btn-danger btn-xs" title="Delete"><span class="glyphicon glyphicon-remove">×</span></button></div>      </li>`;

    li.innerHTML = content;

    gestionDivQuery.appendChild(li);

    deleteProduit();
    editProduit(produitArray);
    verifyQte();
  });
}

showLSProduit();
/********************************************************************************
 * CREATION DE MES FONCTIONS CONSTRUCTRICE
 ********************************************************************************/
// Prototype général

class ProtoProduit {
  constructor(
    produit,
    selectProduit,
    quantiteProduit,
    achatHtProduit,
    venteHtProduit
  ) {
    this.produit = produit;
    this.selectProduit = selectProduit;
    this.quantiteProduit = quantiteProduit;
    this.achatHtProduit = achatHtProduit;
    this.venteHtProduit = venteHtProduit;
  }
}

// // Prototype Professionnel

class ProtoProduitBa extends ProtoProduit {
  constructor(
    produit,
    selectProduit,
    quantiteProduit,
    prixHtProduit,
    prixTtcProduit,
    degrechoix
  ) {
    // Appel de notre prototype général ProtoContact
    super(
      produit,
      selectProduit,
      quantiteProduit,
      prixHtProduit,
      prixTtcProduit
    );
    this.degreChoix = degrechoix;
  }
}

// // Prototype Personnel
class ProtoProduitBna extends ProtoProduit {
  constructor(
    produit,
    selectProduit,
    quantiteProduit,
    prixHtProduit,
    prixTtcProduit
  ) {
    // Appel de notre prototype général ProtoContact
    super(
      produit,
      selectProduit,
      quantiteProduit,
      prixHtProduit,
      prixTtcProduit
    );
  }
}

/**
 * Functions sur notifications
 */

let btnNotify = document.querySelector(`#btnNotice`);

btnNotify.addEventListener(`click`, function () {
  console.log(`on est la`);
  let formNewItem = document.querySelector(`#notice`);
  formNewItem.classList.toggle(`hidden`);
});

function newItemNotify() {
  let content = "";
  let boxNotify = document.querySelector(`#notification`);
  let notifyListNew = [];

  notifyList.forEach((element, index) => {
    console.log(`new item notify entry`);
    content += `
          <li class="newNotice"> Une quantité de ${notifyListNew[index].quantite} de ${notifyListNew[index].produit} est entré sur le stock </li>
          `;

    boxNotify.innerHTML = content;
  });
}

function stockNotify() {
  let content = "";
  let boxNotify = document.querySelector(`#notification`);
  let notifyListStock = [];

  notifyList.forEach((element, index) => {
    console.log(`stock notify entry`);
    git;
    content += `
         <li class="newNotice"> ATENTION ! Reste juste ${notifyListStock[index].quantite} de ${notifyListStock[index].produit} dans le stock.</li>
         `;

    boxNotify.innerHTML = content;
  });
}

function deleteNotify() {
  let btnDeleteNotify = document.querySelector(`#btnNotice`)`:before`;
  console.log(btnDeleteNotify);
}

function verifyNotify() {
  let arrayNotify = [];

  let newNotice = prompt(`Nos conte uma novidade`);
  arrayNotify.push(newNotice);
  localStorage.setItem(`@notify`, arrayNotify);

  if (arrayNotify.length > 0) {
    let notify = document.querySelector(`#btnNotice`);

    notify.classList.add(`notify`);
  } else {
    notify.classList.remove(`notify`);
  }
}

function showQRCode() {
  let produitArray = JSON.parse(localStorage.getItem(`@produit`));
  let titreProduit = document.querySelectorAll(`.nomList`);
  const modal = document.querySelector(".qrcode-modal");

  console.log(titreProduit);
  titreProduit.forEach((element, index) => {
    element.addEventListener(`dblclick`, function () {
      console.log(`on est la`);

      modal.style.display = "flex";

      const qrcodeBox = modal.querySelector(`.content-wrapper-qrcode`);

      var produitQr = document.querySelector("titre");
      var qrcode =
        "https://chart.googleapis.com/chart?cht=qr&chl=" +
        encodeURIComponent(produitQr) +
        "&chs=200x200&choe=UTF-8&chld=L|0";

      qrcodeBox.innerHTML = `
      <img src="${qrcode}" id="qrcode"/>

      <button class="closeQR">fermer qrcode</button>
      `;
      const close = document.querySelector(".closeQR");
      close.addEventListener("click", () => {
        modal.style.display = "none";
      });
    });
  });
}

showQRCode();
/*
function creerQRC() {
  var produitQr = document.querySelector("titre").value;
  var qrcode =
    "https://chart.googleapis.com/chart?cht=qr&chl=" +
    encodeURIComponent(produitQr) +
    "&chs=200x200&choe=UTF-8&chld=L|0";
  document.getElementById("qrcode").src = qrcode;
}

creerQRC();
*/
