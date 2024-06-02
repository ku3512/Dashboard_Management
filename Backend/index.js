const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const { insertUser } = require('./Registration/InsetUser')
const { updatePassword } = require('./ChangePassword/updatePassword')
const { getUsers } = require('./Dashboard/getusers')
const { addUser } = require('./AddUser/insertuser')
const { deleteUser } = require('./DeleteUser/DeleteUser')
// const {EditUser} =require('./EditUser/EditUser')
// const {EditUser} = require('./EditUser/EditUser')
const { editUser } = require('./EditUser/editUser')
const {isLoggedIn} = require('./CheckLogin/checkLogin')
const {updateFlagStatus}= require('./LogOut/updateFlagStatus')

const app = express()
const port = 8080
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//get function
app.get('/users', async (req, res) => {
  const user = await getUsers()
  console.log(user)

  res.send(user)
})

// post function
app.post('/adduser', async (req, res) => {
  try {
    const users = await addUser(req)
    if (users) res.send(`${users}`)
  } catch (e) {
    res.send(e.message)
  }
})

//registration
app.post('/registration', async (req, res) => {
  try {
    const status = await insertUser(req)
    if (status) res.send(`${status}`)
  } catch (e) {
    res.send(e.message)
  }
})

//change password
app.post('/changepassword', async (req, res) => {
  try {
    const status = await updatePassword(req)
    if (status) res.send(`${status}`)
  } catch (e) {
    res.send(e.message)
  }
})

//delete user

app.delete('/delete/:id', async (req, res) => {
  try {
    const deleteuser = await deleteUser(req)
    if (deleteuser) res.send('user successfully deleted')
  } catch (e) {
    res.send(e.message)
  }
})

//edit user
app.post('/edituser', async (req, res) => {
  try {
    const status = await editUser(req)
    if (status) res.send(`${status}`)
  } catch (e) {
    res.send(e.message)
  }
})

//login
app.post('/login', async (req, res) => {
  try {
    const status = await isLoggedIn(req)

    if (status) res.send(status)
  } catch (e) {
    res.send(e.mesaage)
  }
})

//logout
app.post('/logout', async (req, res) => {
  try {
    const status = await updateFlagStatus(req)

    if (status) res.send(`${status}`)
  } catch (e) {
    res.send(e.mesaage)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
