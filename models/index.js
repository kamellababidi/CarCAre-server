'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

db.city.associate = (models) => {
    models.city.hasMany(models.companies);
};

db.companies.associate = (models) => {
    models.companies.hasMany(models.companies_services);
    models.companies.hasMany(models.drivers);
    models.companies.hasMany(models.rating);
    models.companies.belongsTo(models.city);
};


db.companies_services.associate = (models) => {
    models.companies_services.belongsTo(models.companies);
    models.companies_services.belongsTo(models.services);
    models.companies_services.hasMany(models.books_services);
};

db.services.associate = (models) => {
    models.services.hasMany(models.companies_services);
};

db.members.associate = (models) => {
    models.members.hasMany(models.books);
    models.members.hasMany(models.rating);
};

db.rating.associate = (models) => {
    models.rating.belongsTo(models.companies);
    models.rating.belongsTo(models.members);
};

db.books.associate = (models) => {
    models.books.belongsTo(models.members);
    models.books.hasMany(models.books_services);
    models.books.belongsTo(models.drivers);
};

db.books_services.associate = (models) => {
    models.books_services.belongsTo(models.books);
    models.books_services.belongsTo(models.companies_services);
    // models.books_services.belongsTo(models.services);
};

db.drivers.associate = (models) => {
    models.drivers.belongsTo(models.companies);
    models.drivers.hasMany(models.books);
};


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
