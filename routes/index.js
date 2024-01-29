const express = require('express')
const router = express.Router()

const productsRoutes = require('./Products.Routes')
const teachersRoutes = require('./Teachers.Routes')


router.use('/products', productsRoutes)
router.use('/teachers', teachersRoutes)



module.exports = router
