const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  nombreUsuario: {
    type: String,
    required: true,
  },
  emailUsuario: {
    type: String,
    required: true,
    unique: true,
  },
  contrasenia: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  Clase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clases',
  },
  Comentario: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comentarios'
  }],

})

UsersSchema.methods.toJSON = function () {
  const { __v, contrasenia, ...usuario } = this.toObject();
  return usuario;
}

const UsersModel = mongoose.model('users', UsersSchema);
module.exports = UsersModel
