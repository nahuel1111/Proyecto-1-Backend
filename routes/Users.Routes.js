const express = require('express')
const route = express.Router()
const {CreateUser, GetUsers, GetOneUser, DeleteUser, UpdateUser, LoginUser} = require("../controllers/Users.Controllers")
const auth = require('../middlewars/auth')

route.post('/', auth('admin'),CreateUser)
route.post('/login',LoginUser)
route.get ("/", auth('admin') ,GetUsers)
route.get ('/:id', GetOneUser)
route.delete ('/:id', auth('admin'), DeleteUser)
route.put ('/:id',auth('admin'),UpdateUser)

module.exports = route