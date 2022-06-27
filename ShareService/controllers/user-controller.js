
const userRepository = require("../repository/user-repository")
const roleRepository= require("../repository/role-repository")
const config = require("../config/auth.config");
const { limitString } = require("./limitString-controller")
const fs = require("fs");
const uuid = require('uuid');
let passwordValidator = require("password-validator");
let schema = new passwordValidator();
let emailValidator= require("email-validator");

schema
  .is().min(8, 'Minimun 8 characters')
  .is().max(20 ,'Maximun 20 characters')
  .has().uppercase(1,'Minimun 1 characters UpperCase')
  .has().lowercase(1,'Minimun 1 characters lowerCase')
  .has().digits(2, 'Mininum 2 numbers')                                // Must have at least 2 digits
  .has().not().spaces(0,'Password should have no space')                           // Should not have spaces
  .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
  if(!req.body.username ){
    return res.status(400).send({ message: "Username not provided." });
  }
  if (req.body.username > limitString(req.body.username, 50)){
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
  if(!schema.validate(req.body.password)){
    
       return res.status(400).send({ message : schema.validate(req.body.password,{details:true})});
   } 
  if(req.body.image) {
    const imageName = 'assets/users/' + uuid.v1(); 
    const base64 = req.body.image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    fs.writeFile(imageName, base64, 'base64', err => {});
    req.body.image = imageName;
  }
  
  // Save User to Database
  userRepository.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    image:req.body.image
  })
    .then(user => {
      if (req.body.Roles) {
        //get the list of roles from the roles
        roleRepository.getListRole(req.body.Roles)
        .then(roles => { 
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 2
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.signin = (req, res) => {
  userRepository.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].role.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          image:user.image,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.getAll = (req, res, next)=>{
    userRepository.getAll()
        .then((data) => {
            res.json(data)
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
}

exports.getOne = (req, res, next)=>{
    userRepository.getOne(req.params.id)
    .then((data)=>{
        res.json(data)
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });

}
exports.findOne = (req, res, next)=>{
    userRepository.findOne(req.body.username)
    .then((data)=>{
        res.json(data)
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}
exports.findByName = (req, res, next)=>{
  userRepository.findByName(req.body.username)
  .then((data)=>{
      res.json(data)
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}
exports.getUserId=(req, res, next)=>{
  if(!req.body.username){
    return res.status(404).send({ message: "name not provided." });
  }
  userRepository.findOne(req.body.username)
  .then((data)=>{
    if (!data) {
      return res.status(404).send({ message: "User Not found." });
    }
    res.json(data.id)
   })
   .catch(err => {
    res.status(500).send({ message: err.message });
  });
  
}

exports.insert= (req, res, next)=>{
    userRepository.create(
        {
            name: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            image:req.body.image
          })
        .then((data)=>{
            res.json(data)
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
}

exports.update= (req, res, next)=>{
 
  if (req.body.username > limitString(req.body.username, 50)){
    return res.status(404).send({ message: "You excedeed the number of the characters (50) required. " });
  }
  if (req.body.email > limitString(req.body.email, 100)){
    return res.status(404).send({ message: "You excedeed the number of the characters (100) required. " });
  }
  
  if(!emailValidator.validate(req.body.email)){
        return res.status(400).send({message: 'Invalid email'});
   }
  if(!schema.validate(req.body.password)){
    
       return res.status(400).send({ message : schema.validate(req.body.password,{details:true})});
   }
   
   if(req.body.image) {
    const imageName = 'assets/users/' + uuid.v1(); 
    const base64 = req.body.image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    fs.writeFile(imageName, base64, 'base64', err => {});
    req.body.image = imageName;
  } 
    userRepository.update(req.params.id, {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        image:req.body.image,
         Roles:req.body.Roles
      })
      .then((data)=>{ 
      
        if(data){
          return res.status(200).send({ message: "User updated successful." });
        }
      })
      .catch(err => {
     
            res.status(600).send({ message: err.message });
      });
}
exports.delete = (req, res, next)=>{
  userRepository.delete(req.params.id)
  .then(()=>{
    res.status(200).send({message: "User deleted successful"})
    res.json()
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
   
}

exports.removeRole= (req, res, next)=>{
  userRepository.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {  

      if (req.body.Roles) {
        //get the list of roles from the roles to be removed
        roleRepository.getListRole(req.body.Roles)
        .then(roles => {
          user.removeRoles(roles).then(() => {
            res.send({ message: "Role was removed successfully!" });
          });
        });
      } else {
          res.send({ message: "Role was not found !" });
      
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.addRole= (req, res, next)=>{
  userRepository.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {  

      if (req.body.Roles) {
        //get the list of roles from the roles to be removed
        roleRepository.getListRole(req.body.Roles)
        .then(roles => {
          //the setRoles function replace the whole list, while addRoles just add to the list
          user.addRoles(roles).then(() => {
            res.send({ message: "Role was added successfully!" });
          });
        });
      } else {
          res.send({ message: "Role was not found !" });
      
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

