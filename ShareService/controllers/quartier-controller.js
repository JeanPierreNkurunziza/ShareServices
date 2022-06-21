const quartierRepository = require("../repository/quartier-repository");
const { limitString } = require("./limitString-controller");


exports.getAll = (req, res, next)=>{
    quartierRepository.getAll()
        .then((data) => {
            res.json(data)
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
}

exports.getOne = (req, res, next)=>{
    quartierRepository.getOne(req.params.id)
    .then((data)=>{
        res.json(data)
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });

}
exports.findOne = (req, res, next)=>{
    quartierRepository.findOne(req.body.quartier)
    .then((data)=>{
        res.json(data)
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}
exports.findByName = (req, res, next)=>{
  quartierRepository.getOneByName(req.body.quartier)
  .then((data)=>{
      res.json(data)
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}
exports.getQuartierIdentifiant=(req, res, next)=>{
  if(!req.body.quartier){
    return res.status(404).send({ message: "quartier not provided." });
  }
  if(isNaN(req.body.codePostale)){
    return res.status(404).send({ message:"the number required not string"})
  }
  quartierRepository.getQuartierId(req.body.quartier)
  .then((data)=>{
    if (!data) {
      return res.status(404).send({ message: "quartier Not found." });
    }
    res.json(data.id) 
   })  
   .catch(err => {
    res.status(500).send({ message: err.message });
  }); 
}

exports.create= (req, res, next)=>{
  if(!req.body.quartier ){
    return res.status(404).send({ message: "quartier not provided." });
  }
  if (req.body.quartier > limitString(req.body.quartier, 50)){
    return res.status(404).send({ message: "You excedeed the number of the characters (50) required. " });
  }
  if(isNaN(req.body.codePostale)){
    return res.status(404).send({ message:"Code Postale should be a number!!! Not a string"})
  }
  if (req.body.localite > limitString(req.body.localite, 50)){
    return res.status(404).send({ message: "You excedeed the number of the characters (50) required. " });
  }
    quartierRepository.create(
        {
            quartier: req.body.quartier,
            codePostale: req.body.codePostale,
            localite: req.body.localite
          })
        .then((data)=>{
            res.json(data)
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
}

exports.update= (req, res, next)=>{
 
  if (req.body.quartier > limitString(req.body.quartier, 50)){
    return res.status(404).send({ message: "You excedeed the number of the characters (50) required. " });
  }
  if(isNaN(req.body.codePostale)){
    return res.status(404).send({ message:"Code Postale should be a number!!! Not a string"})
  }
  if (req.body.localite > limitString(req.body.localite, 50)){
    return res.status(404).send({ message: "You excedeed the number of the characters (50) required. " });
  }
    
    quartierRepository.update(req.params.id, {
        quartier: req.body.quartier,
        codePostale: req.body.codePostale,
        localite: req.body.localite
      })
      .then((data)=>{
              if (data) {
                return res.status(200).send({ message: "quartier upadated successful." });
              }
          })
      .catch(err => {
            res.status(500).send({ message: err.message });
          });
}
exports.delete = (req, res, next)=>{
  quartierRepository.delete(req.params.id)
  .then(()=>{
    res.status(200).send({message: "quartier deleted successful"})
    res.json()
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
   
}

exports.getQuartierId=(req, res, next)=>{
  quartierRepository.getQuartierId(req.body.quartier)
  .then((data)=>{
    res.json(data.id)
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}