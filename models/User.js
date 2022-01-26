const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');
class User extends Model {}
User.init(
	{
		username: {
			type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
            }
		},
		email: {
			type: DataTypes.STRING,
            // Adding a validation
            unique: true,
            vaildate: {
                isEmail: true,
            }
		},
		password: {
			type: DataTypes.STRING,
            validate: {
                notNull: true,
                min: 8
            }
		},
	},
	{
		sequelize,
		timestamps: false,
		modelName: 'User',
	}
);
module.exports = User;
