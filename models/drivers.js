/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('drivers', {
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
		phone: {
			type: DataTypes.STRING(64),
			allowNull: false,
			unique: true
		},
		car: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		companyId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'companies',
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
		tableName: 'drivers'
	});
};
