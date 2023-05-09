'use strict';

var position = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10"];

var positionName = ["Bras", "Main", "Tête", "Tronc supérieur", "Parties intimes", "Jambes", "Pieds", "Oreilles", "Bouches", "Oeil"];

var positionNameDet = ["le bras", "la main", "la tête", "le tronc supérieur", "les parties intimes", "la jambes", "les pieds", "les oreilles", "la bouches", "l'oeil"];


var dataset = '/assets/datas/dataset.json';
var datasetExplo = '/assets/datas/datasetExplo.json';

//var Highcharts = require('highcharts');  
// Load module after Highcharts is loaded
//require('highcharts/modules/exporting')(Highcharts);  
//require('highcharts/es5/highcharts-more')
// // Create the chart
// Highcharts.chart('container', { /*Highcharts options*/ });


var buttonsObject = document.querySelectorAll('.buttonsObject');
var buttonsPart = document.querySelectorAll('.buttonsPart');
var buttonsBulles = document.querySelectorAll('.buttonsBulles');


buttonsObject.forEach(button => {
  button.addEventListener('click', nbObjectIn)
});

buttonsPart.forEach(button => {
  button.addEventListener('click', inPartObject)
});

buttonsBulles.forEach(button => {
  button.addEventListener('click', bubbleChart)
});

// graphique nombre de fois que objet à été retrouvé dans les différentes parties du corps
function nbObjectIn(){
  fetch(datasetExplo)
    .then((response) => {

      return response.json();
    })
    .then((json) => {
      // console.log(json);
      //traitement

      var datas = json; 

      var idObject = this.getAttribute('data-id');
      console.log(idObject);
  
      // fait la recherche de l'objet xx dans le json
      var item = datas.find(el => el.id == idObject);
      console.log(item);

      var objet = item.objet;
      var positions = item.position;
      console.log(objet);
      console.log(positions);

      var positionTable = [];
      var positionNameTable = [];
      console.log(positionTable);

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
  
      console.log(positionTable);
      console.log(positionNameTable);
      let axisLabel = [];
      positionNameTable.forEach(element => {
        console.log(element);
        let index = Number(element.slice(1))
        index--;
        axisLabel.push(positionName[index]);

      });

      const chart = Highcharts.chart(container, {
        chart: {
          polar: true
        },
        title: {
          text: "Nombre de fois que " + objet + " a été trouvé dans..."
        },
        xAxis: {
          crosshair: true,
          categories: axisLabel // Utiliser les catégories récupérées depuis le fichier JSON
        },
        yAxis: {
          crosshair: true,
          title: {
            text: "Quantité"
          }
        },
        tooltip: {
          useHTML: true,
          pointFormat: '<b>' + objet + '</b> à été retrouvé <b>{point.y}</b> fois.'
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        legend:{ enabled:false },
        series: [{
          name: "",
          data: positionTable, // Utiliser les données récupérées depuis le fichier JSON
          color: "rgba(27, 244, 231, .55)",
          type: 'area'
        }]
      });

      // --------------- Création stat 1
      // Déclaration des variables stat1
      var totalAllObject = 0;
      var totalSelectedObject = 0;
      var stat1 = 0;

      // Calcul du total de objectSelected retrouvé
      positionTable.forEach(element => {
        totalAllObject += element;
      });
      console.log("Total de tous les objets : " + totalAllObject);

      // Trouvé partie la plus touchée et son id
      var max = 0;
      var idMax;
      positionTable.forEach(element => {
        if (element > max) {
          max = element;
          idMax = positionTable.indexOf(element);
        }
      });
      var partie = position.indexOf(positionNameTable[idMax]);
      console.log("Nombre max de fois que l'objet a été retrouvé : " + max + " dans la partie : " + positionName[partie]);
      

      // Calcul du pourcentage de l'objet sélectionné
      totalSelectedObject = positionTable[idMax];
      stat1 = (totalSelectedObject / totalAllObject) * 100;
      console.log("Pourcentage de l'objet sélectionné : " + stat1 + "%");

      // Affichage des stats
      // xx% des {Object} sont retrouvé dans {partie}
      var valueStat1 = document.querySelector('.stat1__value');
      stat1 = Math.round(stat1 * 100) / 100;
      valueStat1.textContent = stat1 + "%";
      // des {Object} sont retrouvé dans {partie}
      var objectStat1 = document.querySelector('.stat1__object');
      objectStat1.textContent = objet;
      // sont retrouvé dans {partie}
      var partStat1 = document.querySelector('.stat1__part');
      partStat1.textContent = positionName[partie];

      // --------------- Création stat 2
      // Déclaration des variables stat2
      var stat2 = 0;

      // recherche total de tout les objets
      // fait la recherche de l'objet xx dans le json
      var tot = datas.find(el => el.id == "tot");
      console.log("total = "+tot.objet);
      var totalOfAll = tot.position;
      console.log(totalOfAll);

      // Calcul du nombre total de objets retrouvé
      var totalOfAllObject = 3462;
      console.log("Total de tous les objets : x" + totalOfAllObject);
      
      // calcul de la stat2
      var stat2 = (totalSelectedObject / totalOfAllObject) * 100;
      stat2 = Math.round(stat2 * 100) / 100;
      console.log(totalOfAllObject);
      
      // Affichage des stats
      // xx% de tout les objets retrouvés sont des {Object}
      var valueStat2 = document.querySelector('.stat2__value');
      valueStat2.textContent = stat2.toFixed(2) + "%";
      // sont des {Object}
      var objectStat2 = document.querySelector('.stat2__object');
      objectStat2.textContent = objet;
      
    })
    .catch((error) => {
        console.log('Error: (' + error +')');
    });
}

function inPartObject(){
  fetch(dataset)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // console.log(json);
      //traitement

      var datas = json; 

      var idPart = this.getAttribute('data-id');
      console.log("partie : "+ idPart);

      var objectTable = [];
      var objectNameTable = [];

      datas.forEach(object => {
        if (object.position[idPart] > 0 && object.id != "tot") {
          console.log("Objet qui a été retrouvé dans " + idPart + " : "+ object.objet);
          console.log("Nombre d'objet : " + object.position[idPart])
          
          objectTable.push(object.position[idPart]);
          objectNameTable.push(object.objet);
          
          console.log("objectTable : "+objectTable);
          console.log("objectNameTable : "+ objectNameTable)
        }
      });

      Highcharts.chart('container', {

        chart: {
          type: 'radar',
          polar: true
        },
    
        title: {
            text: 'Objets dans ' + idPart 
        },
    
        xAxis: {
          categories: objectNameTable
        },
    
        yAxis: {
          min: 0
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        legend:{ enabled:false },
    
        series: [{
            type: 'area',
            name: 'Quantité',
            data: objectTable
        }]
    });
    })
    .catch((error) => {
        console.log('Error: (' + error +')');
    });
}

// graphique bulles objets retrouvés dans parties du corps
function bubbleChart(){
  fetch(datasetExplo)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // console.log(json);
      //traitement

      var datas = json; 

      var getIdPart = this.getAttribute('data-id');
      var idPart = "p"+getIdPart;
      console.log("partie : "+ idPart);

      var namePart = positionName[getIdPart-1]
      var namePartDet = positionNameDet[getIdPart-1]

      var objectTable = [];
      var objectNameTable = [];
      var objectsTable = [];

      datas.forEach(object => {
        if (object.position[idPart] > 0 && object.id != "tot") {
          console.log("Objet qui a été retrouvé dans " + idPart + " : "+ object.objet);
          console.log("Nombre d'objet : " + object.position[idPart])
          
          objectTable.push(object.position[idPart]);
          objectNameTable.push(object.objet);
          objectsTable.push({
            name: object.objet, 
            value: object.position[idPart]
          });

          
          console.log("objectTable : "+objectTable);
          console.log("objectNameTable : "+ objectNameTable);
          console.log(objectsTable);
        }
      });

      Highcharts.chart('container', {

        chart: {
          type: 'packedbubble',
          styledMode: true
        },
        title: {
            text: 'Objets dans ' + namePartDet 
        },
        plotOptions: {
          packedbubble: {
            layoutAlgorithm: {
              gravitationalConstant: 0.02,
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}',
              filter: {
                property: 'y',
                operator: '>',
                value: 10
              },
              style: {
                background: 'rgba(255,255,255,0.5)',
                color: 'black',
                textOutline: 'none',
                fontWeight: 'normal',
                fontSize: '14px',
              }
            },
          }
        },
        tooltip: {
          useHTML: true,
          formatter: function() {
            return '<b>' + this.point.name + ' :</b> ' + this.point.value;
          }
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        legend:{ enabled:false },
    
        series: [{
          name: "",
          data: objectsTable,
          color: "rgba(27, 244, 231, .55)"
        }]
    });
    })
    .catch((error) => {
        console.log('Error: (' + error +')');
    });
}
