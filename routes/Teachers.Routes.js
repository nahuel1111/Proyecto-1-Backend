const express = require('express')
const route = express.Router()
const { createTeacher,GetTeachers, GetOneTeacher, DeleteTeacher, UpdateTeacher} = require('../controllers/Teachers.Controllers')


route.post('/', createTeacher)
route.get('/', GetTeachers)
route.get('/:id', GetOneTeacher)
route.put('/:id', UpdateTeacher)
route.delete('/:id', DeleteTeacher)


module.exports = route