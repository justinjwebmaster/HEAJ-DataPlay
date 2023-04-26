import Chart from 'chart.js/auto';

const numberOfObjectIn = document.getElementById('numberOfObjectIn');     

fetch('/assets/datas/dataset.json')
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // console.log(json);
    //traitement

    var datas = json; 

    datas.forEach(data => {
      var objet = data.Objet;
      var positions = data.positions;
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

       
      var countArray = [];
      positionTable.forEach(element => countArray.push(element[1]),
      console.log(countArray));
      
      var positionArray = [];
      positionTable.forEach(element => positionArray.push(element[0]),
      console.log(positionArray));

      new Chart(
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
      


      // positions.forEach(position => {
      //   var positionName = position[0];
      //   var positionCount = position[1];
      //   console.log(positionName);
      //   console.log(positionCount);
      // });


    });

    // var name = datas.id;

    // console.log(datas.id);

    // var positions = datas.positions;
    // var positionsName;
    // var positionsCount;
    // console.log(positions);

    // positions.forEach(element => {
    //   positionName = element[0];
    //   console.log(positionName);
    //   positionCount = element[1];
    // });

    

    // datas.positions.forEach(element => {
    //   name = element.Objet;
    //   positionsCount = element.positions;
    //   positionsName = keys.element.positionName;
    //   });

      
    })
  .catch((error) => {
    console.log('Error: (' + error +')');
  });

  


  

  









// import Chart from 'chart.js/auto';


// const numberOfObjectIn = document.getElementById('numberOfObjectIn');

// fetch('/assets/datas/dataset.json')
//   .then((response) => {
//     return response.json();
//   })
//   .then((json) => {
//     console.log(json);
//     //traitement

//     var datas = json;  

  
//     var data = [
//       { position: "Doigt", count: 0 },
//       { position: "Visage", count: 2 },
//       { position: "Pieds", count: 7 },
//       { position: "Mains", count: 4 },
//       { position: "Nez", count: 4 },
//       { position: "Doigt", count: 25 },
//       { position: "Visage", count: 2 },
//       { position: "Pieds", count: 7 },
//       { position: "Mains", count: 4 },
//       { position: "Nez", count: 4 },

//     ]
//     new Chart(
//       document.getElementById('numberOfObjectIn'),
//       {
//         type: 'radar',
//         options: {
//           animation: true,
//           responsive: true,
//           plugins: {
//             legend: {
//               display: true
//             },
//             tooltip: {
//               enabled: true
//             }
//           }
//         },
//         data: {
//           labels: data.map(row => row.position),
//           datasets: [
//             {
//               label: "Nombre de fois que " + "Machines à coudre" + " a été trouvé",
//               data: data.map(row => row.count)
//             }
//           ]
//         }
//       }
//     );

//     // var container = document.querySelector('.content');
//     // var content = "<h2>" + datas.name + "</h2>" + "<p>" + datas.sections[0] + "</p>";
//     // container.innerHTML = content;
//   })
//   .catch((error) => {
//     console.log('Error: (' + error +')');
//   });


  

  