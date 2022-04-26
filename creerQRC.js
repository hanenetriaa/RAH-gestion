/** @format */
function creerQRC() {
  var produitQr = document.querySelector("titre").value;
  var qrcode =
    "https://chart.googleapis.com/chart?cht=qr&chl=" +
    encodeURIComponent(produitQr) +
    "&chs=200x200&choe=UTF-8&chld=L|0";
  document.getElementById("qrcode").src = qrcode;
}

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
creerQRC();
