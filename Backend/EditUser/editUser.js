const { sequelize, QueryTypes } = require("../DBConnection");

// const updateUser = async function (req) {
//   const updateUser = await sequelize.query(
//     `UPDATE users SET name = '${req.params.name}' WHERE id = '${req.params.id}'`,
//     {
//       type: QueryTypes.UPDATE,
//     },
//   )

//   console.log(updateUser)

//   return updateUser
// }


// exports.EditUser= async function (req) {
//   const isUser = await sequelize.query(
//     `SELECT id,name,username,role FROM users WHERE id= '${req.body.id}' `,
//     { type: QueryTypes.SELECT }
//   );
//   console.log(isUser);
//   return isUser;



    // const users = await sequelize.query(
    //   // "select id,name,username,role from users WHERE id='${req.body.name}'", {
    //   // type: QueryTypes.SELECT,
    // });
  
    // console.log(users);
  
    // return users;
  // };

  exports.editUser =async function (req) {
    const user = await sequelize.query(
      `UPDATE users SET name='${req.body.name}',username='${req.body.username}', role= '${req.body.role}' WHERE id= '${req.body.id}' `,
      { type: QueryTypes.UPDATE }
    );
    console.log(user);
    return user[1];
  }