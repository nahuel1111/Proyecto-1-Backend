const ProductsModel = require("../models/Products.Schema")

const createProduct = async (req, res) => {
  try {


    const newProduct = new ProductsModel(req.body)

    console.log(newProduct)
  } catch (error) {
  console.log(error)
  }
}

module.exports = {
    createProduct, 
  }