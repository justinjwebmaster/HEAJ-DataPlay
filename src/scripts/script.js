'use strict';

var position = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10"];
var positionName = ["Bras", "Main", "Tête", "Tronc supérieur", "Parties intimes", "Jambes", "Pieds", "Oreilles", "Bouches", "Oeil"];
var objectName = ["Couvert", "Cure-dents", "Bougies", "Matériel d'art", "Statues et vases", "Batteries", "Savons", "Bouteilles", "Sextoys", "Bijoux", "Fournitures de bureau", "Clous - Vis"];
var totalObject = [{id: "p1", value:13},{id: "p2", value:649},{id: "p3", value:729},{id: "p4", value:28},{id: "p5", value:207},{id: "p6", value:30},{id: "p7", value:134},{id: "p8", value:1549},{id: "p9", value:83},{id: "p10", value:40}];

var dataset = '/assets/datas/dataset.json';
var datasetExplo = '/assets/datas/datasetExplo.json';

// déclaration variables
var filAriane = document.querySelector('.filAriane');
var titleExplo = document.querySelector('.titleExplo');


// modification du filAriane et title par la partie du corps sélectionnée
var buttonPart = document.querySelectorAll('.buttonsBulles');

buttonPart.forEach(function(button) {
    button.addEventListener('click', changeArianePartTitle);
    button.addEventListener('click', objectIn);
});

function changeArianePartTitle() {
  var idPart = this.getAttribute('data-id');
  console.log(idPart);
  var partSelected = positionName[idPart-1];

  filAriane.textContent = partSelected;

  // Etat actif
  var active = document.querySelectorAll('.active');
 active.forEach(function(active) {
    active.classList.remove('active');
  });

  this.classList.add('active');
}

// modification du filAriane et title par l'objet sélectionné
var buttonObject = document.querySelectorAll('.buttonsObject');

buttonObject.forEach(function(button) {
    button.addEventListener('click', changeArianeObjectTitle);
});

function changeArianeObjectTitle() {
  var idObject = this.getAttribute('data-id');
  console.log(idObject);
  var objectSelected = objectName[idObject-1];

  filAriane.textContent = objectSelected;
  titleExplo.textContent = objectSelected;
}

// Affichage du nombre d'objet trouvé dans le top de l'explo en fonction de la partie selected
// xx {objets} retrouvés
var positionTable = [];
var positionNameTable = [];
function objectIn(){
  fetch(datasetExplo)
    .then((response) => {

      return response.json();
    })
    .then((json) => {
      // console.log(json);
      //traitement

      var datas = json; 
      // fait la recherche de id: tot dans le json
      var tot = datas.find(el => el.id == "tot");

      // récupere l'id de la partie cliqué
      var getPartId = this.getAttribute('data-id');
      var idPart = "p"+getPartId;


      var totPart = totalObject.find(el => el.id == idPart);
      var totPartValue = totPart.value;

      titleExplo.textContent = totPartValue + " objets retrouvés";
      

      

    })
    .catch((error) => {
        console.log('Error: (' + error +')');
    });
}
