const mongoose = require("mongoose")


const commentSchema =  new mongoose.Schema({
    comentario:{
        type:String,
        require:true
    },
    
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    Destacado:{
        type:Boolean,
        default:false
    },
})


const CommentModel = mongoose.model('Comentarios', commentSchema)
module.exports = CommentModel