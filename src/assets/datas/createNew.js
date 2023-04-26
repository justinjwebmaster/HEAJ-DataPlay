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
          "p1": element.p1,
          "p2": element.p2,
          "p3": element.p3,
          "p4": element.p4,
          "p5": element.p5,
          "p6": element.p6,
          "p7": element.p7,
          "p8": element.p8,
          "p9": element.p9,
          "p10": element.p10,
          "p11": element.p11,
          "p12": element.p12,
          "p13": element.p13,
          "p14": element.p14,
          "p15": element.p15,
          "p16": element.p16,
          "p17": element.p17,
          "p18": element.p18,
          "p19": element.p19,
          "p20": element.p20,
          "p21": element.p21,
          "p22": element.p22,
          "p23": element.p23,
          "p24": element.p24
        }
      };;

      newDatas.push(newObject);

    });

    console.log(newDatas);


  })
  .catch((error) => {
    console.log('Error: (' + error +')');
  });