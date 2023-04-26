import Chart from 'chart.js/auto';

var graph = new Chart(
  document.getElementById('numberOfObjectIn'),
  {
    type: 'radar',
    options: {
      animation: true,
      responsive: true,
      plugins: {
        legend: {
          display: true
        },
        tooltip: {
          enabled: true
        }
      }
    }
  });

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

        for (const key in positions) {
          // if (Object.hasOwnProperty.call(positions, key)) {
          //   const element = positions[key];
          //   console.log(element)
          //   console.log(key);
          // }
          positionTable.push([key, positions[key]]);
        }
        console.log(positionTable);

        
        // Nombre de fois que l'objet a été trouvé dans ...
        var countArray = [];
        positionTable.forEach(element => countArray.push(element[1]),
        console.log(countArray));
        
        var positionArray = [];
        positionTable.forEach(element => positionArray.push(element[0]),
        console.log(positionArray));



        graph.destroy();
        graph = new Chart(
          document.getElementById('numberOfObjectIn'),
          {
            type: 'bar',
            options: {
              animation: true,
              responsive: true,
              plugins: {
                legend: {
                  display: true
                },
                tooltip: {
                  enabled: true
                }
              }
            },
            data: {
              labels: positionArray,
              datasets: [
                {
                  label: "Nombre de fois que " + objet + " a été trouvé",
                  data: countArray
                }
              ]
            }
          });
          graph;
        })
        .catch((error) => {
          console.log('Error: (' + error +')');
        });
      })
      
    });

  

  