const competenceModel = (sequelize, DataTypes) => {
    const Competence = sequelize.define("Competence", {
        competence: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        timestamps: false
    })

    return Competence
}
module.exports = competenceModel 