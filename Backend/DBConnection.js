const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize("agtech_portel", "root", "", {
  host: "localhost",

  dialect: "mysql",
});

exports.sequelize = sequelize;
exports.QueryTypes = QueryTypes;