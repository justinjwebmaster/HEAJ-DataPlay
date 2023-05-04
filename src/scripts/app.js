import Chart from 'chart.js/auto';


var positionName = ["Épaule", "Tronc supérieur", "Coude", "Avant bras", "Poignet", "Genoux", "Partie inférieure de la jambe", "Cheville", "Parties intimes", "Tête", "Visages", "Globe occulaire", "Tronc inférieur", "Partie supérieure du bras", "Partie supérieure de la jambe", "Main", "Pied", "Tout le corps", "Inconnus", "Bouche", "Cou", "Doigt", "Orteille", "Oreille"];

var positionNameDet = ["l'épaule", "le tronc supérieur", "le coude", "l'avant bras", "le poignet", "le genoux", "la partie inférieure de la jambe", "la cheville", "les parties intimes", "la tête", "le visages", "le globe occulaire", "le tronc inférieur", "la partie supérieure du bras", "la partie supérieure de la jambe", "la main", "le pied", "Tout le corps", "Inconnus", "la bouche", "le cou", "le doigt", "l'orteille", "l'oreille"];

//var Highcharts = require('highcharts');
// Load module after Highcharts is loaded
//require('highcharts/modules/exporting')(Highcharts);
//require('highcharts/es5/highcharts-more')
// // Create the chart
// Highcharts.chart('container', { /*Highcharts options*/ });


var buttonsObject = document.querySelectorAll('.buttonsObject');
var buttonsPart = document.querySelectorAll('.buttonsPart');
var buttonsBubble = document.querySelectorAll('.buttonsBubble');


buttonsObject.forEach(button => {
  button.addEventListener('click', nbObjectIn)
});

buttonsPart.forEach(button => {
  button.addEventListener('click', inPartObject)
});

buttonsBubble.forEach(button => {
  button.addEventListener('click', bubbleChart)
});


function nbObjectIn(){
  fetch('/assets/datas/dataset.json')
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
          type: 'column'
        },
        title: {
          text: "Nombre de fois que " + objet + " a été trouvé dans..."
        },
        xAxis: {
          categories: axisLabel // Utiliser les catégories récupérées depuis le fichier JSON
        },
        yAxis: {
          title: {
            text: "Quantité"
          }
        },
        series: [{
          name: "Quantité de " + objet + " trouvés",
          data: positionTable // Utiliser les données récupérées depuis le fichier JSON
        }]
      });
    })
    .catch((error) => {
        console.log('Error: (' + error +')');
    });
}

function inPartObject(){
  fetch('/assets/datas/dataset.json')
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
          console.log("Nombre d'objets : " + object.position[idPart])

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

function bubbleChart(){
  fetch('/assets/datas/dataset.json')
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
          console.log("Nombre d'objets : " + object.position[idPart])

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
        },
        title: {
            text: 'Objets dans ' + namePartDet
        },
        tooltip: {
          useHTML: false,
          pointFormat: '<b>{point.name}:</b> {point.y} objets'
        },

        series: [{
            name: "",
          data: objectsTable,
          color: "#00FFFF"
        }]
    });
    })
    .catch((error) => {
        console.log('Error: (' + error +')');
    });
}