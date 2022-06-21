let db = require("../models/dbc").get()


exports.getAll =()=>{
    return db.User.findAll({
        attributes :{
            exclude : ['createdAt', 'updatedAt']
        },
        include:[{
            model : db.Role, 
            attributes:['role'],
            through: {
              attributes: []
            }
         },{ model: db.Service, attributes:['service','description'] }]
        })
            
}

exports.getOne=(id)=>{
    return db.User.findByPk(id, {
        attributes :{
            exclude : ['createdAt', 'updatedAt']
        },
        include:[{
            model : db.Role, 
            attributes:['role'],
            through: {
              attributes: []
            }
         }]
        })
}

exports.create= (user)=>{
    return db.User.create(user) 
}

exports.update= (id, user)=>{
    
    return db.User.update(user, {where : {id: id}})
}
exports.delete = (id)=>{
    return db.User.destroy({ where : {id : id}} )
}

exports.findOne=(label) => {
    return db.User.findOne(label)
}

exports.findByName=(username)=>{
    return db.User.findOne({
        where : {
            username : username
        }
    })
}
exports.addRole=(idUser, idRole)=>{

    const user= db.User.findByPk(idUser);
    const role=db.Role.findByPk(idRole);
      
    user.addRole(role);

}
exports.removeRole = (userId, roleId)=>{
    //const Op = Sequelize.Op
    const data= db.User.findByPk(userId)
    const role= db.Role.findByPk(roleId)

    data.removeRoles(role)
   
}