const { sequelize, QueryTypes } = require("../DBConnection");

exports.deleteUser = async function (req) {
    let id = req.params.id;
    const deleteUser = await sequelize.query(
      `UPDATE users SET flagStatus='1' WHERE id ='${id}'`,
    { type: QueryTypes.UPDATE }
      // `DELETE from users WHERE id ='${id}'`,id,{
      // type: QueryTypes.DELETE,
    )

  return deleteUser;
};