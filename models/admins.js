/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('admins', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		first_name: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		last_name: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		username: {
			type: DataTypes.STRING(64),
			allowNull: false,
			unique: true
		},
		email: {
			type: DataTypes.STRING(128),
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING(128),
			allowNull: false
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
		}
	}, {
		tableName: 'admins'
	});
};
