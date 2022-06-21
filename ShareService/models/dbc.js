const { Sequelize, DataTypes} = require("sequelize")
const userModel = require("./user-model")
const roleModel = require("./role-model")
const competenceModel = require("./competence-model")
const memberModel = require("./member-model")
const serviceDemandeModel = require("./serviceDemande-model")
const quartierModel=require("./quartier-model")
const memberCompetenceModel=require("./memberCompetence-model")
const serviceModel = require("./service-model")



let dbConnector

module.exports = {  
    
    connect : () => {
        if(!dbConnector)
        {
            let sequelize = new Sequelize("sharingservices", "root", "", { 
                host: "localhost",
                dialect:"mysql",
                logging : false //pour enlever les requettes dans la console 
                
            })
            
            dbConnector = {
                Sequelize: Sequelize,
                sequelize: sequelize,
                User: userModel(sequelize, DataTypes),  
                Role: roleModel(sequelize, DataTypes),
                Member: memberModel(sequelize, DataTypes),
                Competence: competenceModel(sequelize, DataTypes),
                Quartier: quartierModel(sequelize, DataTypes), 
                Service: serviceModel(sequelize, DataTypes),  
                MemberCompetence: memberCompetenceModel(sequelize, DataTypes),   
                ServiceDemande: serviceDemandeModel(sequelize, DataTypes) 
                
            }
            // the Super Many-to-Many relationship member et competence
            // Setup a One-to-Many relationship between Member and membercompetence
            dbConnector.Member.hasMany(dbConnector.MemberCompetence);
            dbConnector.MemberCompetence.belongsTo(dbConnector.Member);

            // Also setup a One-to-Many relationship between competence and memebercompetence
            dbConnector.Competence.hasMany(dbConnector.MemberCompetence);
            dbConnector.MemberCompetence.belongsTo(dbConnector.Competence);  

            dbConnector.Competence.belongsToMany(dbConnector.Member, {through : 'MemberCompetence'}) 
            dbConnector.Member.belongsToMany(dbConnector.Competence, {through: 'MemberCompetence'})
            
            //  Many-to-Many relationship User and Role
            dbConnector.User.belongsToMany(dbConnector.Role, {through: 'UserRole'},{ timestamps: false})
            dbConnector.Role.belongsToMany(dbConnector.User, {through : 'UserRole'},{ timestamps: false})
            
            // using sequelize the Super Many-to-Many relationship service et member
             // Setup a One-to-Many relationship between Member and ServiceDemande
             dbConnector.Member.hasMany(dbConnector.ServiceDemande);
             dbConnector.ServiceDemande.belongsTo(dbConnector.Member);
 
             // Also setup a One-to-Many relationship between service and ServiceDemande
             dbConnector.Service.hasMany(dbConnector.ServiceDemande);
             dbConnector.ServiceDemande.belongsTo(dbConnector.Service);
          
            //ajouter les relations suivantes pour beneficier super many to many
            dbConnector.Member.belongsToMany(dbConnector.Service, {through: 'ServiceDemande'})
            dbConnector.Service.belongsToMany(dbConnector.Member, {through : 'ServiceDemande'}) 
            

            dbConnector.User.hasMany(dbConnector.Service, { allowNull: false  })
            dbConnector.Service.belongsTo(dbConnector.User)
            
            dbConnector.Quartier.hasMany(dbConnector.Member, {allowNull:false})
            dbConnector.Member.belongsTo(dbConnector.Quartier)
        

        }
    },
    
    get : () => {
        if(!dbConnector)
            this.connect
        else{
            return dbConnector
        }
    }
}