const memberCompetenceModel = require("../models/memberCompetence-model");

let db = require("../models/dbc").get()
const Op = db.Sequelize.Op;


exports.getAll =()=>{
    return db.Competence.findAll({ 
      include: {
        model: db.MemberCompetence,
        include: { model : db.Member, attributes:['name','image']}
      }      
        })         
}
// exports.getAll =()=>{
//     return db.Competence.findAll({ include:[
//         { model : db.Member, include:{model: db.Competence, 
//             attributes:['competence']}  }
//     ]})
            
// }

exports.getOne=(id)=>{
    return db.Competence.findByPk(id)
}

exports.create= (competence)=>{
    return db.Competence.create(competence) 
}

exports.update= (id, competence)=>{
    return db.Competence.update(competence, {where : {id: id}})
}
exports.delete = (id)=>{
    return db.Competence.destroy({ where : {id : id}} )
}

exports.getOneByName=(label) => {
    return db.Competence.findOne({
        where: {
          label: label 
        }
      })
}
exports.getListCompetence=(competences)=>{ 
    return db.Competence.findAll({
        where: {
          competence: {
            [Op.or]: competences 
          }
        }
      })
}