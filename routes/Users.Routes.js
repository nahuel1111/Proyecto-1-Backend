const express = require('express')
const route = express.Router()
const {CreateUser, GetUsers, GetOneUser, DeleteUser, UpdateUser} = require("../controllers/Users.Controllers")

route.post('/', CreateUser)
route.get ("/", GetUsers)
route.get ('/:id', GetOneUser)
route.delete ('/:id' , DeleteUser)
route.put ('/:id' , UpdateUser)

module.exports = route