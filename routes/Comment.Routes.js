const express = require('express')
const route = express.Router()
const { createComment} = require('../controllers/Comment.Controllers')


route.post('/:id', createComment)



module.exports = route