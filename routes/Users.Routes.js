const express = require('express')
const route = express.Router()
const {CreateUser, GetUsers, GetOneUser, DeleteUser, UpdateUser, LoginUser,GetComment} = require("../controllers/Users.Controllers")
const auth = require('../middlewars/auth')

route.post('/', CreateUser)
route.post('/login',LoginUser)
route.get ("/",GetUsers)
route.get ('/:id', GetOneUser)
route.get ('/comment/:id', GetComment)
route.delete ('/:id', DeleteUser)
route.put ('/:id', UpdateUser)

module.exports = route