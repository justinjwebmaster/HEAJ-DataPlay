'use strict';

var position = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10"];

var positionName = ["Bras", "Main", "Tête", "Tronc supérieur", "Parties intimes", "Jambes", "Pieds", "Oreilles", "Bouches", "Oeil"];

var objectName = ["Couvert", "Cure-dents", "Bougies", "Matériel d'art", "Statues et vases", "Batteries", "Savons", "Bouteilles", "Sextoys", "Bijoux", "Fournitures de bureau", "Clous - Vis"];

// déclaration variables
var filAriane = document.querySelector('.filAriane');
var titleExplo = document.querySelector('.titleExplo');


// modification du filAriane et title par la partie du corps sélectionnée
var buttonPart = document.querySelectorAll('.buttonsBulles');

buttonPart.forEach(function(button) {
    button.addEventListener('click', changeArianePartTitle);
});

function changeArianePartTitle() {
  var idPart = this.getAttribute('data-id');
  console.log(idPart);
  var partSelected = positionName[idPart-1];

  filAriane.textContent = partSelected;
  titleExplo.textContent = partSelected;

  // Etat actif
  buttonPart.forEach(element => {
    element.classList.remove('active');
  });
  this.classList.add('active');
  
}

// modification du filAriane et title par l'objet sélectionné
var buttonPart = document.querySelectorAll('.buttonsObject');

buttonPart.forEach(function(button) {
    button.addEventListener('click', changeArianeObjectTitle);
});

function changeArianeObjectTitle() {
  var idObject = this.getAttribute('data-id');
  console.log(idObject);
  var objectSelected = objectName[idObject-1];

  filAriane.textContent = objectSelected;
  titleExplo.textContent = objectSelected;
}