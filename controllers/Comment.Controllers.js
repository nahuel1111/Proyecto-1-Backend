
const CommentModel = require("../models/Comment.Schema")
const UsersModel = require('../models/Users.Schema')



const createComment = async(req,res)=>{
try {
    const userExist = await UsersModel.findOne({_id:req.params.id})
    if(!userExist){
       return res.status(400).json({ msg: 'el usuario ese no existe' })  
    }
    const newComment =  CommentModel({comentario:req.body.comentario,idUser:req.params.id,})
    const savedComment = await newComment.save()
    await UsersModel.findByIdAndUpdate(
        req.params.id,
            { $addToSet: { Comentario: req.body.comentario } },
            { new: true }
    )
    

    res.status(201).json({ msg: 'Comentario creado con exito', savedComment })


} catch (error) {
    res.status(500).json({ msg: 'Falla en el server', error })
}
}


const getComment = async (req,res)=>{
    try {
        const commentUser = await CommentModel.find({idUser:req.params.id})
        res.status(200).json({ msg: 'Comentario encontrado', commentUser})


    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

const updateComment = async (req,res)=>{
    try {
        const UpdateComment = await CommentModel.findByIdAndUpdate( req.params.id ,req.body, { new: true })
        res.status(200).json({ msg: 'Comentario destacado', UpdateComment})

    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}




module.exports={
    createComment,
    getComment,
    updateComment,

}