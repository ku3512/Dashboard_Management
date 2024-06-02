const { sequelize, QueryTypes } = require('../DBConnection')
var jwt = require('jsonwebtoken')

async function checkLogin(req) {
  const users = await sequelize.query(
    `SELECT id, companyName, flagStatus FROM admin WHERE companyEmail='${req.body.Email}' AND password='${req.body.Password}' limit 1`,
    {
      type: QueryTypes.SELECT,
    },
  )

  console.log(users[0].id)
  console.log(users[0].companyName)
  return users[0]
}

async function changeStatus(id, status) {
  const user = await sequelize.query(
    `UPDATE admin SET flagStatus='${status}' WHERE id= '${id}' `,
    { type: QueryTypes.UPDATE },
  )
  console.log(user)
  return user[1]
}


const encrypt= (info)=>{
  const token = jwt.sign({ info: info }, 'simmi_privateKey', { expiresIn: '1d' })
  
  console.log(token)
  return token
  }
  

exports.isLoggedIn = async function (req) {
  const checkLoginResult = await checkLogin(req)
  console.log(checkLoginResult.id)
  const id = checkLoginResult.id
  if (checkLoginResult.flagStatus < 3) {
    var status = checkLoginResult.flagStatus
    status = status + 1
    console.log(status)
    await changeStatus(id, status)
    const encryptData= encrypt(checkLoginResult)
    return encryptData
  } else {
    // const alreadyLoggedin = 'alreadyLoggedin'
    return false
  }
}
