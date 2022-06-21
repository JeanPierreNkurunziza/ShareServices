const memberRepository = require("../repository/member-repository")
const userRepository= require("../repository/user-repository")
const serviceRepository=require("../repository/service-repository") 
const serviceDemandeRepository=require("../repository/serviceDemande-repository")
const { limitString } = require("./limitString-controller")
const fs = require("fs");
const uuid = require('uuid');

exports.create = (req, res) => {
  if(!req.body.service ){
    return res.status(400).send({ message: "Service not provided." });
  }
  if(!req.body.description ){
    return res.status(400).send({ message: "Description not provided." });
  }
  if (req.body.service > limitString(req.body.service, 100)){
    return res.status(404).send({ message: "You excedeed the number of the characters (100) required. " });
  }
  if (req.body.description > limitString(req.body.description, 250)){
    return res.status(404).send({ message: "You excedeed the number of the characters (250) required. " });
  }
  if(req.body.image) {
    const imageName = 'assets/services/' + uuid.v1(); 
    const base64 = req.body.image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    fs.writeFile(imageName, base64, 'base64', err => {});
    req.body.image = imageName;
  }
  // Save User to Database
  serviceRepository.create({
    service: req.body.service,
    description: req.body.description,
    image:req.body.image
    
  })
  .then(service =>{
    
    if (req.body.UserId) {
        //get the list of roles from the quartier
        userRepository.findByName(req.body.UserId)
        .then(user => {
          service.setUser(user)
        });
      } else  {
        // set quartier par defaut = 1
        user.setUser([1])
      }  
    if (req.body.Members) {
        //get the list of roles from the competence
        memberRepository.getListMember(req.body.Members)
        .then(members => {
          service.setMembers(members).then(() => {
            res.send({ message: "Service registered successfully!" });
          });
        });
      } else {
        // user role = 2
        service.setMembers([1]).then(() => {
          res.send({ message: "Member was registered successfully!" });
        });
      }
     
    })
        
     .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAll = (req, res, next)=>{
    serviceRepository.getAll()
        .then((data) => {
            res.json(data)
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
}

exports.getOne = (req, res, next)=>{
    serviceRepository.getOne(req.params.id)
    .then((data)=>{
        res.json(data)
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });

}
exports.findOne = (req, res, next)=>{
    serviceRepository.findOne(req.body.service)
    .then((data)=>{
        res.json(data)
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}
exports.findByName = (req, res, next)=>{
  serviceRepository.findByName(req.body.service)
  .then((data)=>{
      res.json(data)
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}
exports.getMemberId=(req, res, next)=>{
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

exports.update= (req, res, next)=>{
 
  if (req.body.service > limitString(req.body.service, 100)){
    return res.status(404).send({ message: "You excedeed the number of the characters (100) required. " });
  }
  if (req.body.description > limitString(req.body.description, 250)){
    return res.status(404).send({ message: "You excedeed the number of the characters (250) required. " });
  }
  if(req.body.image) {
    const imageName = 'assets/services/' + uuid.v1(); 
    const base64 = req.body.image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    fs.writeFile(imageName, base64, 'base64', err => {});
    req.body.image = imageName;
  }
    serviceRepository.update(req.params.id, {
        service: req.body.service,
        description: req.body.description,
        image: req.body.image,
        UserId: req.body.UserId
        
      })
      .then((data)=>{     
            
            if (data) {  
                return res.status(200).send({ message: "Service updated successful." });
              } 
          })
      .catch(err => {
            res.status(500).send({ message: err.message });
          });
}
exports.delete = (req, res, next)=>{
  serviceRepository.delete(req.params.id)
  .then(()=>{
    res.status(200).send({message: "service deleted successful"})
    res.json()
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
    
}

exports.removeMember= (req, res, next)=>{
  serviceRepository.findOne({
    where: {
      service: req.body.service
    } 
  }) 
    .then(service => {   

      if (req.body.Members) {
        //get the list of roles from the roles to be removed
        memberRepository.getListMember(req.body.Members)
        .then(members => {
          service.removeMembers(members).then(() => {
            res.send({ message: "Member was removed successfully!" });
          });
        });
      } else {
          res.send({ message: "Member was not found !" });
      
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.addMember= (req, res, next)=>{
 
  serviceRepository.getOne(req.body.id)
    .then(service => {  

      if (req.body.Members) {
        //get the list of roles from the roles to be removed
        memberRepository.getListMember(req.body.Members)
        .then(members => {
          //the setRoles function replace the whole list, while addRoles just add to the list
          service.addMembers(members).then(() => {
            res.send({ message: "Members was added to member successfully!" });
          });
        });
      } else {
          res.send({ message: "Members was not found !" });
      
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.addServiceDemandeDetails= (req, res, next)=>{
   
  serviceDemandeRepository.update(req.body.id, req.body.MemberId, req.body.ServiceId,  {
      jourHeurePropose: req.body.jourHeurePropose
      
    })
    .then((data)=>{     
          
          if (data) {  
              return res.status(200).send({ message: "detail service updated successful." });
            } 
        })
    .catch(err => {
          res.status(500).send({ message: err.message });
        });
}

;
