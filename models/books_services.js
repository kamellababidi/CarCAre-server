/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('books_services', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		bookId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'books',
				key: 'id'
			}
		},
		companiesServiceId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'companies_services',
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
		tableName: 'books_services'
	});
};
