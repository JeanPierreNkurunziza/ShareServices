let db = require("../models/dbc").get()
const Op = db.Sequelize.Op;



exports.update= (memberId, competenceId, memberCompetence)=>{
    
    return db.sequelize.model("MemberCompetence").update(memberCompetence, 
        { where : {[Op.and]: [{ MemberId: memberId}, { CompetenceId: competenceId}]} 
                
})}




