const { sequelize, QueryTypes } = require('../DBConnection')

async function getFlagStatus(req) {
  const users = await sequelize.query(
    `SELECT flagStatus FROM admin WHERE id='${req.body.id}' limit 1`,
    {
      type: QueryTypes.SELECT,
    },
  )

  console.log(users[0].flagStatus)

  return users[0]
}

exports.updateFlagStatus = async function (req) {
  const getFlagStatusResult = await getFlagStatus(req)
  var status = getFlagStatusResult.flagStatus
  status = status - 1
  const user = await sequelize.query(
    `UPDATE admin SET flagStatus='${status}' WHERE id= '${req.body.id}' `,
    { type: QueryTypes.UPDATE },
  )
  console.log(user)
  return user[1]
}
