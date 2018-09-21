/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('city', {
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
		active: {
			type: DataTypes.ENUM('active','disabled'),
			allowNull: false,
			defaultValue: 'active'
		},
		addedBy: {
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
		}
	}, {
		tableName: 'city'
	});
};
