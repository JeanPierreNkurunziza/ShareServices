const quartierModel = (sequelize, DataTypes) => {
    const Quartier = sequelize.define("Quartier", {
        quartier: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        codePostale: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        localite: {
            type: DataTypes.STRING(50),
            allowNull: true
        }
    },
    {
        timestamps: false
    })

    return Quartier
}
module.exports = quartierModel 