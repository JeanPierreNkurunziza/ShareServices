const serviceDemandeModel = (sequelize, DataTypes) => {
    const ServiceDemande = sequelize.define("ServiceDemande", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        jourHeurePropose: {
            type: DataTypes.DATE,
            allowNull: true
        }
        
    },
    {
        timestamps: true,
        createdAt: true, // don't add createdAt attribute
        updatedAt: false,
    })

    return ServiceDemande
}
module.exports = serviceDemandeModel 