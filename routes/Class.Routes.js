const express = require('express')
const route = express.Router()
const { createClass, GetClass, GetOneClass, UpdateClass, DeleteClass} = require('../controllers/Class.Controllers')



route.post('/', createClass)
route.get('/', GetClass)
route.get('/:id',GetOneClass)
route.put('/:id',UpdateClass)
route.delete('/:id',DeleteClass)


module.exports = route