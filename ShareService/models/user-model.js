const userModel = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email : {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 6
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        timestamps: false
    })

    return User
}
module.exports = userModel 