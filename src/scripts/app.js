import Chart from 'chart.js/auto';

var positionName = ["Épaule", "Tronc supérieur", "Coude", "Avant bras", "Poignet", "Genoux", "Partie inférieure de la jambe", "Cheville", "Parties intimes", "Tête", "Visages", "Globe occulaire", "Tronc inférieur", "Partie supérieure du bras", "Partie supérieure de la jambe", "Main", "Pied", "Tout le corps", "Inconnus", "Bouche", "Cou", "Doigt", "Orteille", "Oreille"];

var Highcharts = require('highcharts');  
// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);  
// Create the chart
Highcharts.chart('container', { /*Highcharts options*/ });


const numberOfObjectIn = document.getElementById('numberOfObjectIn');  

var buttonsObject = document.querySelectorAll('.buttonsObject');


buttonsObject.forEach(button => {
  button.addEventListener('click', function() { 
    
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
        positionTable.push(positions[key]);
      }
      for (const key in positions) {
        // if (Object.hasOwnProperty.call(positions, key)) {
        //   const element = positions[key];
        //   console.log(element)
        //   console.log(key);
        // }
        positionNameTable.push(key);
      }
      console.log(positionTable);
      console.log(positionNameTable);

      positionNameTable.forEach(element => {
        var i = 0;
        console.log(element);
        positionNameTable[i] = positionName[i];
        console.log(positionNameTable[i]);
        i++;
      });

      const chart = Highcharts.chart(container, {
        chart: {
          type: 'column'
        },
        title: {
          text: "Nombre de fois que " + objet + " a été trouvé dans..."
        },
        xAxis: {
          categories: positionName // Utiliser les catégories récupérées depuis le fichier JSON
        },
        yAxis: {
          title: {
            text: "Quantité"
          }
        },
        series: [{
          name: "Quantité de " + objet + " trouvés",
          data: positionTable // Utiliser les données récupérées depuis le fichier JSON
        },
      ]
      });


    })
    .catch((error) => {
        console.log('Error: (' + error +')');
    });
  });
});