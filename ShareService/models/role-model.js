const roleModel = (sequelize, DataTypes) => {
    const Role = sequelize.define("Role", {
        role: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    },
    {
        timestamps: false
    })

    return Role
}
module.exports = roleModel 