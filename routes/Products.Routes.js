const express = require('express')
const route = express.Router()
const { createProduct, getProducts, getOneProduct, updateProduct, deleteProduct} = require('../controllers/Products.Controllers')


route.post('/', createProduct)
route.get('/', getProducts)
route.get('/:id', getOneProduct)
route.put('/:id', updateProduct)
route.delete('/:id', deleteProduct)

module.exports = route