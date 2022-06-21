let db = require("../models/dbc").get()
const Op = db.Sequelize.Op;

// exports.getAll =()=>{
//     return db.Member.findAll({ include:[
//         { model : db.Quartier, attributes:['quartier'] },
//         { model : db.Competence, attributes:['competence']  },
//         { model:db.Service, attributes:['service','description'] }
//     ]})
            
// }
exports.getAll =()=>{
    return db.Member.findAll({ include:[
        { model : db.Quartier, attributes:['quartier','codePostale','localite'] },
        { model : db.MemberCompetence, include:{model: db.Competence, 
            attributes:['competence']}  },
        { model:db.Service, include:{model:db.User}}
    ]})
            
}

exports.getOne=(id)=>{
    return db.Member.findByPk(id, { include:[
        { model : db.Quartier, attributes:['quartier','codePostale','localite'] },
        { model : db.MemberCompetence, include:{model: db.Competence, 
            attributes:['competence']}  },
        { model:db.Service, include:{model:db.User}}
    ]}) 
}

exports.create= (quartier)=>{
    return db.Member.create(quartier) 
}

exports.update= (id, member)=>{
    return db.Member.update(member, {where : {id: id}})
}
exports.delete = (id)=>{
    return db.Member.destroy({ where : {id : id}} )
}

exports.getOneByName=(label) => {
    return db.Member.findOne({
        where: {
          label: label 
        }
      })
}
exports.findOne=(label) => {
    return db.Member.findOne(label)
}
exports.getListMember=(members)=>{ 
    return db.Member.findAll({
        where: {
          name: {
            [Op.or]: members 
          }
        }
      })
}
