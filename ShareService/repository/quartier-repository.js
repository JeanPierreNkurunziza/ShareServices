
let db = require("../models/dbc").get()
const Op = db.Sequelize.Op;

exports.getAll =()=>{
    return db.Quartier.findAll()
            
}

exports.getOne=(id)=>{
    return db.Quartier.findByPk(id)
}

exports.create= (quartier)=>{
    return db.Quartier.create(quartier) 
}

exports.update= (id, quartier)=>{
    return db.Quartier.update(quartier, {where : {id: id}})
}
exports.delete = (id)=>{
    return db.Quartier.destroy({ wherre : {id : id}} ) 
}

exports.getOneByName=(quartier) => {
    return db.Quartier.findOne({
        where: {
          quartier: quartier 
        }
      })
}
exports.findOne=(label) => {
    return db.Quartier.findOne(label) 
}
exports.getOneByQuartier=(quartier)=>{ 
    return db.Quartier.findOne({
        where: {
            quartier: {
              [Op.or]: quartier 
            }
          }
        })
}
exports.getQuartierId=(quartier) => {
    return db.Quartier.findOne({
        where: {
          quartier: quartier
        }});
    // return quar.id
}
exports.getListQuartier=(quartier)=>{ 
    return db.Quartier.findAll({
        where: {
          quartier: {
            [Op.or]: quartier 
          }
        }
      })
}

