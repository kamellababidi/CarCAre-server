/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('companies', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(64),
			allowNull: false,
			unique: true
		},
		name_arabic: {
			type: DataTypes.STRING(64),
			allowNull: false,
			unique: true
		},
		phone: {
			type: DataTypes.STRING(15),
			allowNull: false,
			unique: true
		},
		email: {
			type: DataTypes.STRING(128),
			allowNull: false,
			unique: true
		},
		cityId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'city',
				key: 'id'
			}
		},
		picture: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		description_arabic: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		averageRating: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		added_by: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'admins',
				key: 'id'
			}
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		active: {
			type: DataTypes.ENUM('0','1'),
			allowNull: false,
			defaultValue: '1'
		}
	}, {
		tableName: 'companies'
	});
};
