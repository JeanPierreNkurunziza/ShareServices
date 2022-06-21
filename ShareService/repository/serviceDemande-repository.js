let db = require("../models/dbc").get()
const Op = db.Sequelize.Op;



exports.update= (memberId, serviceId, serviceDemande)=>{
    
    return db.sequelize.model("ServiceDemande").update(serviceDemande, 
        { where : {[Op.and]: [{ MemberId: memberId}, { ServiceId: serviceId}]} 
                
})}

exports.update= (id, memberId, serviceId, serviceDemande)=>{
    return db.sequelize.model("ServiceDemande").update(serviceDemande, 
        { where : {[Op.and]: [{id:id},{ MemberId: memberId}, { ServiceId: serviceId}]} 
               
})}
