const mongoose = require('mongoose');

const ClaseSchema = new mongoose.Schema({
  
  Horario: {
    type: String,
    required: true
  },
  Fecha: {
    type: String,
    required: true
  },
 
  Lista1: {
    type: String, 
    required: true
  },
  Lista2: {
    type: String,
    required: true
  },
  Lista3: {
    type: String,
    required: true
  },
  Lista4: {
    type: String,
    required: true
  },
  Lista5: {
    type: String,
    required: true
  },
  Descripcion: {
    type: String,
    required: true
  },
  Titulo: {
    type: String,
    required: true
  },
  Precio: {
    type: Number,
    required: true
  },
  Usuarios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }],
  IDProfesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teachers'
  },
});

const ClaseModel = mongoose.model('clases', ClaseSchema);
module.exports = ClaseModel;
