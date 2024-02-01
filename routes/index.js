const express = require('express')
const router = express.Router()

const productsRoutes = require('./Products.Routes')
const teachersRoutes = require('./Teachers.Routes')
const usersRoutes = require('./Users.Routes')
const ClassRoutes = require('../routes/Class.Routes')
const CommentRoutes = require('../routes/Comment.Routes')

router.use('/products', productsRoutes)
router.use('/teachers', teachersRoutes)
router.use('/users', usersRoutes)
router.use('/Class', ClassRoutes)
router.use('/Comment', CommentRoutes)


module.exports = router
