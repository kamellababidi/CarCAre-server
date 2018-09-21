/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('members', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		facebookId: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		username: {
			type: DataTypes.STRING(64),
			allowNull: false,
			unique: true
		},
		phone: {
			type: DataTypes.STRING(15),
			allowNull: true,
			unique: true
		},
		verified: {
			type: DataTypes.ENUM('0','1'),
			allowNull: false,
			defaultValue: '0'
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
		tableName: 'members'
	});
};
