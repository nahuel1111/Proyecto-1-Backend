const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
    titulo: {
      type: String,
      required: true
    },
    precio: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: true
    },
  })
  
  const ProductsModel = mongoose.model('products', ProductsSchema)
  module.exports = ProductsModel
  