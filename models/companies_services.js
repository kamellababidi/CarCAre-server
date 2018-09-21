/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('companies_services', {
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
		serviceId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'services',
				key: 'id'
			}
		},
		price: {
			type: DataTypes.INTEGER(11),
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
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		active: {
			type: DataTypes.ENUM('0','1'),
			allowNull: false,
			defaultValue: '1'
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'companies_services'
	});
};
