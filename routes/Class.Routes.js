const express = require('express')
const route = express.Router()
const { createClass, GetClass, GetOneClass, UpdateClass, DeleteClass, addUsuarioToClase,DeleteUserToClass} = require('../controllers/Class.Controllers')



route.post('/', createClass)
route.get('/', GetClass)
route.get('/:id',GetOneClass)
route.put('/:id',UpdateClass)
route.put('/Add/:id',addUsuarioToClase)
route.put('/delete/:id',DeleteUserToClass)
route.delete('/:id',DeleteClass)



module.exports = route