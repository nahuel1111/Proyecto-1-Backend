const express = require('express')
const router = express.Router()

const productsRoutes = require('./Products.Routes')
const teachersRoutes = require('./Teachers.Routes')
const usersRoutes = require('./Users.Routes')

router.use('/products', productsRoutes)
router.use('/teachers', teachersRoutes)
router.use('/users', usersRoutes)


module.exports = router
