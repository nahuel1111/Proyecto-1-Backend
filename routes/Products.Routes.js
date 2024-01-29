const express = require('express')
const route = express.Router()
const { createProduct} = require('../controllers/Products.Controllers')


route.post('/', createProduct)


module.exports = route