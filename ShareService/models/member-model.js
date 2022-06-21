const memberModel = (sequelize, DataTypes) => {
    const Member = sequelize.define("Member", {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        email : {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone : {
            type: DataTypes.STRING(100),
            allowNull: false,
           
        },
        rue : {
            type: DataTypes.STRING(100),
            allowNull: false,
            
        },
        numero : {
            type: DataTypes.STRING(100),
            allowNull: false,
            
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        timestamps: false
    })

    return Member
}
module.exports = memberModel 