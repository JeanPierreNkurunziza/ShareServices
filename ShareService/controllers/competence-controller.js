const competenceRepository = require("../repository/competence-repository")
const { limitString } = require("./limitString-controller")
const fs = require("fs");
const uuid = require('uuid');

exports.getAll = (req, res, next)=>{
    competenceRepository.getAll()
        .then((data) => {
            
            res.json(data)

        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
}

exports.getOne = (req, res, next)=>{
    competenceRepository.getOne(req.params.id)
    .then((data)=>{
        res.json(data)
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });

}

exports.create= (req, res, next)=>{
    if(!req.body.competence ){
        return res.status(400).send({ message: "Competence not provided." });
      }

      if(req.body.image) {
        const imageName = 'assets/competences/' + uuid.v1(); 
        const base64 = req.body.image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
        fs.writeFile(imageName, base64, 'base64', err => {});
        req.body.image = imageName;
      }
     
      if (req.body.competence > limitString(req.body.competence, 20)){
        return res.status(404).send({ message: "You excedeed the number of the characters (20) required. " });
      }
    competenceRepository.create(req.body)
        .then((data)=>{
            res.json(data)
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
}

exports.findOne = (req, res, next)=>{
    competenceRepository.findOne(req.body.competence)
    .then((data)=>{
        res.json(data)
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}
exports.update= (req, res, next)=>{

    if (req.body.competence > limitString(req.body.competence, 20)){
      return res.status(404).send({ message: "You excedeed the number of the characters (100) required. " });
    }

    if(req.body.image) {
      const imageName = 'assets/competences/' + uuid.v1(); 
      const base64 = req.body.image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
      fs.writeFile(imageName, base64, 'base64', err => {});
      req.body.image = imageName;
    }
   
      competenceRepository.update(req.params.id, {
          competence: req.body.competence,
          image: req.body.image
               
        })
        .then((data)=>{     
              
              if (data) {  
                  return res.status(200).send({ message: "Competence updated successful." });
                } 
            })
        .catch(err => {
              res.status(500).send({ message: err.message });
            });
  }
  exports.delete = (req, res, next)=>{
    competenceRepository.delete(req.params.id)
    .then(()=>{
      res.status(200).send({message: "competence deleted successful"})
      res.json()
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
     
  }