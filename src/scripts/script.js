'use strict';

var position = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10"];
var positionName = ["Bras", "Main", "Tête", "Tronc supérieur", "Parties intimes", "Jambes", "Pieds", "Oreilles", "Bouches", "Oeil"];
var positionName = ["Bras", "Main", "Tête", "Tronc supérieur", "Parties intimes", "Jambes", "Pieds", "Oreilles", "Bouches", "Oeil"];
var objectName = ["Couvert", "Cure-dents", "Bougies", "Matériel d'art", "Statues et vases", "Batteries", "Savons", "Bouteilles", "Sextoys", "Bijoux", "Fournitures de bureau", "Clous - Vis"];
var totalObject = [{id: "p1", value:13},{id: "p2", value:649},{id: "p3", value:729},{id: "p4", value:28},{id: "p5", value:207},{id: "p6", value:30},{id: "p7", value:134},{id: "p8", value:1549},{id: "p9", value:83},{id: "p10", value:40}];

var dataset = '/assets/datas/dataset.json';
var datasetExplo = '/assets/datas/datasetExplo.json';

// déclaration variables
var filAriane = document.querySelector('.filAriane');
var titleExplo = document.querySelector('.titleExplo');
var textCorpsParent = document.querySelector('.text__corps--parent');
var statContainer = document.querySelector('.stat__ontainer');


// modification du filAriane et title par la partie du corps sélectionnée
var buttonPart = document.querySelectorAll('.buttonsBulles');

buttonPart.forEach(function(button) {
    button.addEventListener('click', changeArianePartTitle);
    button.addEventListener('click', objectInPart);
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
  textCorpsParent.classList.add('hidden');

  if(statContainer.classList.contains('hidden')){
    statContainer.classList.remove('hidden');
  }
}

// Affichage du nombre d'objet trouvé dans le top de l'explo en fonction de la partie selected
// xx objets retrouvés
function objectInPart(){
  fetch(datasetExplo)
    .then((response) => {

      return response.json();
    })
    .then((json) => {
      // console.log(json);
      //traitement

      // var datas = json; 
      // // fait la recherche de id: tot dans le json
      // var tot = datas.find(el => el.id == "tot");

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

// modification du filAriane et title par l'objet sélectionné
var buttonObject = document.querySelectorAll('.buttonsObject');

buttonObject.forEach(function(button) {
    button.addEventListener('click', changeArianeObjectTitle);
    button.addEventListener('click', objectIn);
});

function changeArianeObjectTitle() {
  var idObject = this.getAttribute('data-id');
  console.log(idObject);
  var objectSelected = objectName[idObject-1];

  filAriane.textContent = objectSelected;
}

// Affichage du nombre d'{objet} identifié dans le top de l'explo en fonction de l'objet selected
// xx {objets} identifiés
function objectIn(){
  fetch(datasetExplo)
    .then((response) => {

      return response.json();
    })
    .then((json) => {
      // console.log(json);
      //traitement

      var datas = json; 

      // récupere l'id de la partie cliqué
      var objectId = this.getAttribute('data-id');

      // fait la recherche de id: tot dans le json
      var objectJson = datas.find(el => el.id == objectId);

      var object = objectJson.objet;
      var positions = objectJson.position;
      console.log("test objet : "+object);
      console.log("test position : "+positions);

      var positionTable = [];
      var positionNameTable = [];

      for (const key in positions) {
        // if (Object.hasOwnProperty.call(positions, key)) {
        //   const element = positions[key];
        //   console.log(element)
        //   console.log(key);
        // }
        if (!Object.hasOwnProperty.call(positions, key)) {
          continue;
        }

        if(positions[key] > 0){
          positionTable.push(positions[key]);
          positionNameTable.push(key);
        }
        
      }
      console.log("Hoho : "+positionTable);
      var totObject = 0;
      positionTable.forEach(element => {
        console.log(element)
        totObject += element;
      });
      console.log("totObject : "+totObject);

      titleExplo.textContent = totObject + " " + object + " identifiés";

      // Etat actif
      var active = document.querySelectorAll('.active');
      active.forEach(function(active) {
        active.classList.remove('active');
      });

      var bigObject = document.querySelectorAll('.bigObject');
      bigObject.forEach(function(bigObject) {
        if(bigObject.getAttribute('data-id') == objectId){
          bigObject.classList.add('active');
        }
      });
      this.classList.add('active');

    })
    .catch((error) => {
        console.log('Error: (' + error +')');
    });
}




// heatmap
var svgCorps = document.querySelector(".corps__hm");

var svgTete = document.getElementById("tete");
var svgBrasG = document.getElementById("brasg");
var svgBrasD = document.getElementById("brasd");
var svgBassin = document.getElementById("bassin");
var svgJambes = document.getElementById("jambes");
var svgTorse = document.getElementById("torse");

var detailCadre = document.getElementById("detail-tete");
var detailCadreBG = document.getElementById("detail-brasg");
var detailCadreBD = document.getElementById("detail-brasd");
var detailCadreB = document.getElementById("detail-bassin");
var detailCadreJ = document.getElementById("detail-jambes");
var detailCadreT = document.getElementById("detail-torse");
if (svgCorps == true) {
svgCorps.addEventListener("mousemove", function(event) {
	var x = event.pageX;
	var y = event.pageY;
 

  if (x, y) {
    svgTete.addEventListener("mouseover", function() {
      detailCadre.style.left = x + "px";
      detailCadre.style.top = y + "px";
      detailCadre.style.display = "block";
    })
    svgTete.addEventListener("mouseout", function() {
      detailCadre.style.display = "none";
  })
  }
  if (x, y) {
    svgBrasG.addEventListener("mouseover", function() {
      detailCadreBG.style.left = x + "px";
      detailCadreBG.style.top = y + "px";
      detailCadreBG.style.display = "block";
    })
    svgBrasG.addEventListener("mouseout", function() {
      detailCadreBG.style.display = "none";
  })
  }
  if (x, y) {
    svgBrasD.addEventListener("mouseover", function() {
      detailCadreBD.style.left = x + "px";
      detailCadreBD.style.top = y + "px";
      detailCadreBD.style.display = "block";
    })
    svgBrasD.addEventListener("mouseout", function() {
      detailCadreBD.style.display = "none";
  })
  }
  if (x, y) {
    svgBassin.addEventListener("mouseover", function() {
      detailCadreB.style.left = x + "px";
      detailCadreB.style.top = y + "px";
      detailCadreB.style.display = "block";
    })
    svgBassin.addEventListener("mouseout", function() {
      detailCadreB.style.display = "none";
  })
  }
  if (x, y) {
    svgJambes.addEventListener("mouseover", function() {
      detailCadreJ.style.left = x + "px";
      detailCadreJ.style.top = y + "px";
      detailCadreJ.style.display = "block";
    })
    svgJambes.addEventListener("mouseout", function() {
      detailCadreJ.style.display = "none";
  })
  }
  if (x, y) {
    svgTorse.addEventListener("mouseover", function() {
      detailCadreT.style.left = x + "px";
      detailCadreT.style.top = y + "px";
      detailCadreT.style.display = "block";
    })
    svgTorse.addEventListener("mouseout", function() {
      detailCadreT.style.display = "none";
  })
  }

});
}



