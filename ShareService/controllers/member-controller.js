const memberRepository = require("../repository/member-repository")
const quartierRepository= require("../repository/quartier-repository")
const quartierController=require("./quartier-controller")
const competenceRepository= require("../repository/competence-repository")
const memberCompetenceRepository= require("../repository/memberCompetence-repository")
const { limitString } = require("./limitString-controller")
const fs = require("fs");
const uuid = require('uuid');
let emailValidator= require("email-validator");
exports.create = (req, res) => {
  if(!req.body.name ){
    return res.status(400).send({ message: "name not provided." });
  }
  if (req.body.name > limitString(req.body.name, 50)){
    return res.status(404).send({ message: "You excedeed the number of the characters (50) required. " });
  }
  if (req.body.surname > limitString(req.body.surname, 50)){
    return res.status(404).send({ message: "You excedeed the number of the characters (50) required. " });
  }
  if(!req.body.email){
    return res.status(404).send({ message:"email not provided"})
  }
  if (req.body.email > limitString(req.body.email, 100)){
    return res.status(404).send({ message: "You excedeed the number of the characters (100) required. " });
  }
  if(!emailValidator.validate(req.body.email)){
    return res.status(400).send({message: 'Invalid email'});
}
if (req.body.phone > limitString(req.body.phone, 100)){
  return res.status(404).send({ message: "You excedeed the number of the characters (100) required. " });
}
if (req.body.rue > limitString(req.body.rue, 100)){
  return res.status(404).send({ message: "You excedeed the number of the characters (100) required. " });
}
if(req.body.numero > limitString(req.body.numero, 10)){
  return res.status(404).send({ message:"You excedeed the number of 10 charcters"})
}
if(req.body.image) {
  const imageName = 'assets/members/' + uuid.v1(); 
  const base64 = req.body.image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  fs.writeFile(imageName, base64, 'base64', err => {});
  req.body.image = imageName;
}
  // Save User to Database
  memberRepository.create({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    phone: req.body.phone,
    rue: req.body.rue,
    numero: req.body.numero,
    image:req.body.image
    
   
  })
  .then(member =>{
    
    if (req.body.QuartierId) {
        //get the list of roles from the quartier
        quartierRepository.getOneByName(req.body.QuartierId)
        .then(quartier => {
          member.setQuartier(quartier)
        });
      } else  {
        // set quartier par defaut = 5 , undefined
        member.setQuartier([5])
      }  
    if (req.body.Competences) {
        //get the list of roles from the competence
        competenceRepository.getListCompetence(req.body.Competences)
        .then(competences => {
          
          member.setCompetences(competences).then(() => {
            res.send({ message: "Member was registered successfully!" });
          });
        });
      } else {
        // user role = 2
        member.setCompetences([1]).then(() => {
          res.send({ message: "Member was registered successfully!" });
        });
      }
    
     })
        
     .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAll = (req, res, next)=>{
    memberRepository.getAll()
        .then((data) => {
            res.json(data)
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
}

exports.getOne = (req, res, next)=>{
    memberRepository.getOne(req.params.id)
    .then((data)=>{
        res.json(data)
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });

}
exports.findOne = (req, res, next)=>{
    memberRepository.findOne(req.body.name)
    .then((data)=>{
        res.json(data)
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}
exports.findByName = (req, res, next)=>{
  memberRepository.findByName(req.body.name)
  .then((data)=>{
      res.json(data)
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}
exports.getUserId=(req, res, next)=>{
  if(!req.body.name){
    return res.status(404).send({ message: "name not provided." });
  }
  memberRepository.findOne(req.body.name)
  .then((data)=>{
    if (!data) {
      return res.status(404).send({ message: "member Not found." });
    }
    res.json(data.id)
   })
   .catch(err => {
    res.status(500).send({ message: err.message });
  });
  
}

exports.insert= (req, res, next)=>{
    memberRepository.create(
        {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            phone: req.body.phone,
            rue: req.body.rue,
            numero: req.body.numero,
            QuartierId: req.body.QuartierId
          })
        .then((data)=>{
            res.json(data)
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
}

exports.update= (req, res, next)=>{
 
  if (req.body.name > limitString(req.body.name, 50)){
    return res.status(404).send({ message: "You excedeed the number of the characters (50) required. " });
  }
  if (req.body.surname > limitString(req.body.surname, 50)){
    return res.status(404).send({ message: "You excedeed the number of the characters (50) required. " });
  }
 
  if (req.body.email > limitString(req.body.email, 100)){
    return res.status(404).send({ message: "You excedeed the number of the characters (100) required. " });
  }
  if(!emailValidator.validate(req.body.email)){
    return res.status(400).send({message: 'Invalid email'});
}
if (req.body.phone > limitString(req.body.phone, 100)){
  return res.status(404).send({ message: "You excedeed the number of the characters (100) required. " });
}
if (req.body.rue > limitString(req.body.rue, 100)){
  return res.status(404).send({ message: "You excedeed the number of the characters (100) required. " });
}
if(req.body.numero > limitString(req.body.numero, 10)){
  return res.status(404).send({ message:"You excedeed the number of the characters (10) required. "})
}
if(req.body.image) {
  const imageName = 'assets/members/' + uuid.v1(); 
  const base64 = req.body.image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  fs.writeFile(imageName, base64, 'base64', err => {});
  req.body.image = imageName;
}

    memberRepository.update(req.params.id, {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phone: req.body.phone,
        rue: req.body.rue,
        numero: req.body.numero,
        image:req.body.image,
        QuartierId:req.body.QuartierId
       
        
      })
      .then((data)=>{     
      
        if(data){
          return res.status(200).send({ message: "Member updated successful." });
        }
      })
      .catch(err => {
            res.status(500).send({ message: err.message });
          });
}
exports.delete = (req, res, next)=>{
  memberRepository.delete(req.params.id)
  .then(()=>{
    res.status(200).send({message: "member deleted successful"})
    res.json()
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
    
}

exports.removeCompetence= (req, res, next)=>{
  memberRepository.findOne({
    where: {
      name: req.body.name
    } 
  }) 
    .then(member => {   

      if (req.body.Competences) {
        //get the list of roles from the roles to be removed
        competenceRepository.getListCompetence(req.body.Competences)
        .then(competences => {
          member.removeCompetences(competences).then(() => {
            res.send({ message: "Competence was removed successfully!" });
          });
        });
      } else {
          res.send({ message: "Competence was not found !" });
      
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.addCompetence= (req, res, next)=>{
  memberRepository.findOne({
    where: {
      name: req.body.name
    }
  })
    .then(member => {  

      if (req.body.Competences) {
        //get the list of roles from the roles to be removed
        competenceRepository.getListCompetence(req.body.Competences)
        .then(competences => {
          //the setRoles function replace the whole list, while addRoles just add to the list
          member.addCompetences(competences).then(() => {
            res.send({ message: "Competence was added to member successfully!" });
          });
        });
      } else {
          res.send({ message: "Competence was not found !" });
      
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.addCompetenceDetails= (req, res, next)=>{
   
  memberCompetenceRepository.update(req.body.MemberId, req.body.CompetenceId,  {
      jour: req.body.jour,
      heureDebut: req.body.heureDebut,
      heureFin: req.body.heureFin,
      niveauCompetence: req.body.niveauCompetence  
    })
    .then((data)=>{     
          
          if (data) {  
              return res.status(200).send({ message: "detail competence updated successful." });
            } 
        })
    .catch(err => {
          res.status(500).send({ message: err.message });
        });
}
;
