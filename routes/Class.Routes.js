const express = require('express')
const route = express.Router()
const { createClass, GetClass, GetOneClass, UpdateClass, DeleteClass, addUsuarioToClase,DeleteUserToClass,addUsuarioToTeacher,DeleteTeacherToClass} = require('../controllers/Class.Controllers')
const multer = require('../middlewars/multer')


route.post('/', multer.single('imagen'), createClass)
route.get('/', GetClass)
route.get('/:id',GetOneClass)
route.put('/:id',UpdateClass)
route.put('/Add/:id',addUsuarioToClase)
route.put('/delete/:id',DeleteUserToClass)
route.put('/AddTeacher/:id',addUsuarioToTeacher)
route.put('/deleteTeacher/:id',DeleteTeacherToClass)
route.delete('/:id',DeleteClass)



module.exports = route