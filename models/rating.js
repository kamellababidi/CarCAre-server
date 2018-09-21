/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('rating', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		companyId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'companies',
				key: 'id'
			}
		},
		memberId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'members',
				key: 'id'
			}
		},
		rating: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		comment: {
			type: DataTypes.TEXT,
			allowNull: true
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
		tableName: 'rating'
	});
};
