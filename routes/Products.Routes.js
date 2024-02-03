const express = require('express')
const route = express.Router()
const { createProduct, getProducts, getOneProduct, updateProduct, deleteProduct} = require('../controllers/Products.Controllers')
const multer = require('../middlewars/multer')

route.post('/', multer.single('imagen'), createProduct)
route.get('/', getProducts)
route.get('/:id', getOneProduct)
route.put('/:id', multer.single('imagen'), updateProduct)
route.delete('/:id', deleteProduct)

module.exports = route