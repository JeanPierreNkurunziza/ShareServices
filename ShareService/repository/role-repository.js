let db = require("../models/dbc").get()
const Op = db.Sequelize.Op;

exports.getAll =()=>{
    return db.Role.findAll()
            
}
exports.getListRole=(roles)=>{ 
    return db.Role.findAll({
        where: {
          role: {
            [Op.or]: roles 
          }
        }
      })
}

exports.getOne=(id)=>{
    return db.Role.findByPk(id)
}

exports.create= (role)=>{
    return db.Role.create(role) 
}

exports.update= (id, role)=>{
    return db.Role.update(role, {where : {id: id}})
}
exports.delete = (id)=>{
    return db.Role.destroy({ where : {id : id}} )
}

exports.findOne=(label) => {
    return db.Role.findOne({
        where: {
          role: label 
        }
      })
}