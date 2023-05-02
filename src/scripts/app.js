console.info('Hello world');

import Chart from 'chart.js/auto';



const numberOfObjectIn = document.getElementById('numberOfObjectIn');

fetch('/assets/datas/dataset.json')
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    //traitement

    var datas = json;  

  
    var data = [
      { position: "Doigt", count: 0 },
      { position: "Visage", count: 2 },
      { position: "Pieds", count: 7 },
      { position: "Mains", count: 4 },
      { position: "Nez", count: 4 },
      { position: "Doigt", count: 25 },
      { position: "Visage", count: 2 },
      { position: "Pieds", count: 7 },
      { position: "Mains", count: 4 },
      { position: "Nez", count: 4 },

    ]
    new Chart(
      document.getElementById('numberOfObjectIn'),
      {
        type: 'radar',
        options: {
          maintainAspectRatio: false,
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
          labels: data.map(row => row.position),
          datasets: [
            {
              label: "Nombre de fois que " + "Machines à coudre" + " a été trouvé",
              data: data.map(row => row.count)
            }
          ]
        }
      }
    );

    // var container = document.querySelector('.content');
    // var content = "<h2>" + datas.name + "</h2>" + "<p>" + datas.sections[0] + "</p>";
    // container.innerHTML = content;
  })
  .catch((error) => {
    console.log('Error: (' + error +')');
  });


  

  