fetch('/assets/datas/dataset.json')
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // console.log(json);
    //traitement

    var datas = json;
    
    
    var newDatas = [];

    datas.forEach(element => {

      var newObject = {
        "id": element.id,
        "objet": element.Objet,
        "url": element.url,
        "position": {
          "Épaule": element.,
          "Tronc supérieur": element.,
          "Coude": element.,
          "Avant bras": element.,
          "Poignet": element.,
          "Genou": element.,
          "Partie inférieure de la jambe": element.,
          "Cheville": element.,
          "Parties intimes": element.,
          "Tête": element.,
          "Visage": element.,
          "Globe oculaire": element.,
          "Tronc inférieur": element.,
          "Partie supérieure du bras": element.,
          "Partie supérieure de la jambe": element.,
          "Main": element.,
          "Pied":element.,
          "Tout le corps": element.,
          "Inconnue": element.,
          "Bouche": element.,
          "Cou": element.,
          "Doigt": element.,
          "Orteille": element.,
          "Oreille": element.,
        },
      };;

      newDatas.push(newObject);

    });

    console.log(newDatas);


  })
  .catch((error) => {
    console.log('Error: (' + error +')');
  });