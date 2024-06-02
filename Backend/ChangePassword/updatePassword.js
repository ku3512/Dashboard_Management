const { sequelize, QueryTypes } = require("../DBConnection");
var jwt = require('jsonwebtoken')

const decrypt= (changeData)=>{

  const token= changeData
  const decrypted_value = jwt.verify(token, 'simmi_privateKey')
  
  return decrypted_value.info;
  }

async function checkOldPassword(id, password) {
  const resultFound = await sequelize.query(
    `SELECT password FROM admin WHERE id= '${id}' limit 1`,

    { type: QueryTypes.SELECT }
  );
  console.log(resultFound[0].password);
  const oldPassword = password;
  console.log(oldPassword);
  if (oldPassword == resultFound[0].password) {
    console.log("matched");

    return true;
  } else {
    console.log("not matched");

    return false;
  }
}

async function resetPassword(userData, id) {
  const user = await sequelize.query(
    `UPDATE admin SET password='${userData.newPassword}',confirmPassword='${userData.confirmPassword}' WHERE id= '${id}' `,
    { type: QueryTypes.UPDATE }
  );
  console.log(user);
  return user[1];
}


exports.updatePassword = async function (req) {
  console.log(req.body);
  const changeData= req.body
  const decryptData= await decrypt(changeData.UserData)
  console.log(decryptData.id)
  const resultCheckOldPassword = await checkOldPassword(decryptData.id, changeData.oldPassword );
  if (resultCheckOldPassword == true) {
    console.log("true statement");
    const resultResetPassword = await resetPassword(changeData, decryptData.id);
    return resultResetPassword;
  } else {
    const NotMatched = "NotMatched";
    console.log("false statement");
    return NotMatched;
  }
};
