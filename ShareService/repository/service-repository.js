let db = require("../models/dbc").get()
const sequelize = require("sequelize")

exports.getAll =()=>{
    return db.Service.findAll(
            { include:
                [
                    { model : db.User, attributes:['username','email','image'] },
                    { model : db.ServiceDemande, include:{model: db.Member, 
                        attributes:['id','name', 'surname','email','phone']}  }
                ]
            }
        )
 
}

exports.getOne=(id)=>{
    return db.Service.findByPk(id, 
        { include:
            [
                { model : db.User, attributes:['username','email','image'] },
                { model : db.ServiceDemande, include:{model: db.Member, 
                    attributes:['id','name', 'surname','email','phone']}  }
            ]
        }
        )
}

exports.create= (service)=>{
    return db.Service.create(service) 
}

exports.update= (id, service)=>{
    return db.Service.update(service, {where : {id: id}})
}
exports.delete = (id)=>{
    return db.Service.destroy({ wherre : {id : id}} )
}

exports.getOneByName=(label) => {
    return db.Service.findOne({
        where: {
          service: label 
        }
      })
}
exports.findOne=(label) => {
    return db.Service.findOne(label)
}