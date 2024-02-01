const mongoose = require('mongoose')
const CommentModel = require("../models/Comment.Schema")



const createComment = async(req,res)=>{
try {
    
    const newComment =  CommentModel({...req.body})
    const savedComment = await newComment.save();
    res.status(201).json({ msg: 'Comentario creado con exito', savedComment })

} catch (error) {
    res.status(500).json({ msg: 'Falla en el server', error })
}
}












module.exports={
    createComment,
}