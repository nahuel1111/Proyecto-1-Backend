const express = require('express')
const route = express.Router()
const { createTeacher,GetTeachers, GetOneTeacher, DeleteTeacher, UpdateTeacher} = require('../controllers/Teachers.Controllers')


route.post('/', auth("admin"), createTeacher)
route.get('/', auth("admin"), GetTeachers)
route.get('/:id', GetOneTeacher)
route.put('/:id', auth("admin"), UpdateTeacher)
route.delete('/:id' ,auth("admin"), DeleteTeacher)


module.exports = route