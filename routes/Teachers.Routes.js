const express = require('express')
const route = express.Router()
const { createTeacher} = require('../controllers/Teachers.Controllers')


route.post('/', createTeacher)


module.exports = route