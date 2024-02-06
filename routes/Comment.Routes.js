const express = require('express')
const route = express.Router()
const { createComment,getComment,updateComment} = require('../controllers/Comment.Controllers')


route.post('/:id', createComment)
route.get('/:id' , getComment)
route.put('/:id', updateComment)




module.exports = route