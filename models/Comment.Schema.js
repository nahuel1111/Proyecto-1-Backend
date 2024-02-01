const mongoose = require("mongoose")


const commentSchema =  new mongoose.Schema({
    comentario:{
        type:String,
        require:true
    }

})


const CommentModel = mongoose.model('Comentarios', commentSchema)
module.exports = CommentModel