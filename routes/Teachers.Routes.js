const express = require('express')
const route = express.Router()
const { createTeacher,GetTeachers, GetOneTeacher, DeleteTeacher, UpdateTeacher} = require('../controllers/Teachers.Controllers')
const auth = require('../middlewars/auth')
const multer = require('../middlewars/multer')

route.post('/', multer.single('imagen'), createTeacher)
route.get('/', GetTeachers)
route.get('/:id', GetOneTeacher)
route.put('/:id', multer.single('imagen'), UpdateTeacher)
route.delete('/:id', DeleteTeacher)


module.exports = route