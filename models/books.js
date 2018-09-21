/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('books', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		memberId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'members',
				key: 'id'
			}
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		status: {
			type: DataTypes.ENUM('open','accepted','done','canceled'),
			allowNull: false,
			defaultValue: 'open'
		},
		url: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		driverId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'drivers',
				key: 'id'
			}
		},
		latitude: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		longitude: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		locationName: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'books'
	});
};
