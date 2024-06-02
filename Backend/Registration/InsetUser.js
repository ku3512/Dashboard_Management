const { sequelize, QueryTypes } = require("../DBConnection");

//Check to All field in databse that is user exist or not
async function checkExistUser(req) {
  const isUser = await sequelize.query(
    `SELECT companyName, companyEmail FROM admin WHERE companyName= '${req.body.companyName}' AND companyEmail= '${req.body.companyEmail}' limit 1`,
    { type: QueryTypes.SELECT }
  );
  console.log(isUser);
  return isUser;
}


// If user not exit then userdata will insert in database 
async function insertData(req) {
  const user = await sequelize.query(
    `INSERT INTO admin(companyName, companyEmail, password, confirmPassword) VALUES ('${req.body.companyName}', '${req.body.companyEmail}', '${req.body.password}', '${req.body.confirmPassword}')`,
    { type: QueryTypes.INSERT }
  );
  console.log(user);
  return user[0];
}


// for output
exports.insertUser = async function (req) {
  const resultExistUser = await checkExistUser(req);
  if (resultExistUser.length == 0) {
    const resultInsertData = await insertData(req);
    return resultInsertData;
  } else {
    const exists = "exists";
    return exists;
  }
};
