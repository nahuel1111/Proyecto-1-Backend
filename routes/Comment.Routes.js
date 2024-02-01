const express = require('express')
const route = express.Router()
const { createComment} = require('../controllers/Comment.Controllers')


route.post('/', createComment)

module.exports = route