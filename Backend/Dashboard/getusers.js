const { sequelize, QueryTypes } = require("../DBConnection");

exports.getUsers = async function () {
    const users = await sequelize.query("select id,name,username,role from users WHERE flagStatus='0'", {
      type: QueryTypes.SELECT,
    });
  
    console.log(users);
  
    return users;
  };
  