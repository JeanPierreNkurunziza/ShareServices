const serviceModel = (sequelize, DataTypes) => {
    const Service = sequelize.define("Service", {
        service: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        image: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        }
    },
    {
        timestamps: false
    })

    return Service
}
module.exports = serviceModel 