const { sequelize, QueryTypes } = require("../DBConnection");

exports.addUser = async function (req) {
  const user = await sequelize.query(`insert into users( name, username, role, flagStatus) 
  values('${req.body.name}','${req.body.username}','${req.body.role}', '${req.body.flagStatus}')`,{
    type: QueryTypes.INSERT,
  });

  console.log(user);

  return user[0];
};