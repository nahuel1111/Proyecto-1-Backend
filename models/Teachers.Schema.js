const mongoose = require('mongoose')

const TeachersSchema = new mongoose.Schema({
    NombyAp: {
      type: String,
      required: true
    },
    Telefono: {
      type: String,
      required: true
    },
  })
  
  const TeachersModel = mongoose.model('teachers', TeachersSchema)
  module.exports = TeachersModel
  