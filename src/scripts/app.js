import Chart from 'chart.js/auto';


var positionName = ["Épaule", "Tronc supérieur", "Coude", "Avant bras", "Poignet", "Genoux", "Partie inférieure de la jambe", "Cheville", "Parties intimes", "Tête", "Visages", "Globe occulaire", "Tronc inférieur", "Partie supérieure du bras", "Partie supérieure de la jambe", "Main", "Pied", "Tout le corps", "Inconnus", "Bouche", "Cou", "Doigt", "Orteille", "Oreille"];

var Highcharts = require('highcharts');  
// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);  
// // Create the chart
// Highcharts.chart('container', { /*Highcharts options*/ });


var buttonsObject = document.querySelectorAll('.buttonsObject');
var buttonsPart = document.querySelectorAll('.buttonsPart');


buttonsObject.forEach(button => {
  button.addEventListener('click', nbObjectIn)
});

buttonsPart.forEach(button => {
  button.addEventListener('click', inPartObject)
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
          console.log("Nombre d'objet : " + object.position[idPart])
          
          objectTable.push(object.position[idPart]);
          objectNameTable.push(object.objet);
          
          console.log("objectTable : "+objectTable);
          console.log("objectNameTable : "+ objectNameTable)
        }
      });

      const chart = Highcharts.chart(container, {
        chart: {
          type: 'column'
        },
        title: {
          text: "Nombre d'objet qui ont été trouvés dans " + idPart
        },
        xAxis: {
          categories: objectNameTable // Utiliser les catégories récupérées depuis le fichier JSON
        },
        yAxis: {
          title: {
            text: "Quantité"
          }
        },
        series: [{
          name: "Quantité d'objet trouvés",
          data: objectTable // Utiliser les données récupérées depuis le fichier JSON
        }]
      });
    })
    .catch((error) => {
        console.log('Error: (' + error +')');
    });
}
  