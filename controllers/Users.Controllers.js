const UsersModel = require ("../models/Users.Schema")
const ClassModel = require ("../models/Class.Schema")
const mongoose = require ('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


const CreateUser = async (req,res)=>{
    const {nombreUsuario, emailUsuario, contrasenia, role}= req.body
    try {
        if (!nombreUsuario || !emailUsuario || !contrasenia || !role) {
            res.status(400).json({ msg: 'Algun campo esta vacio' })
            return
          }

          const NewUser =  UsersModel({...req.body})

          const salt = bcryptjs.genSaltSync(10)
          NewUser.contrasenia = bcryptjs.hashSync(contrasenia, salt)
          const SavedUser = await NewUser.save();
          res.status(201).json({ msg: 'Usuario creado con exito', SavedUser })
    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
    
    
}


const LoginUser = async (req,res)=>{
    try {
        const {emailUsuario,contrasenia} = req.body
        const EmailExist = await UsersModel.findOne({emailUsuario})
        if(!EmailExist){
            return res.status(400).json({msg: 'Email y/o contraseña incorrecto'})
        }

        const passCheck = bcryptjs.compareSync(contrasenia, EmailExist.contrasenia)

        if(!passCheck){
            return res.status(400).json({msg: 'Email y/o contraseña incorrecto'})
        }


        const payload = {
            idUsuario: EmailExist._id,
            role: EmailExist.role
          }
      
          const token = jwt.sign(payload, "Grupo1")
          res.status(200).json({msg:'Logueado', token, role: EmailExist.role, idUsuario: EmailExist._id})
        
    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

const GetUsers = async (req,res)=>{
    try {
        const AllUsers = await UsersModel.find()
        res.status(200).json({ msg: 'Usuarios encontrados', AllUsers })
      } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
      }
}

const GetOneUser = async (req,res)=>{
    try {
        const OneUser = await UsersModel.findOne({_id:req.params.id})
        res.status(200).json({ msg: 'Usuario encontrado', OneUser })
      } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
      }
}


    const DeleteUser = async (req, res) => {
        try {
            const userId = req.params.id
            const idClass= await ClassModel.findOne({Usuarios:userId})
            const userToDelete = await UsersModel.findById(userId);
            if(idClass){
                if (!userToDelete) {
                    return res.status(400).json({ msg: 'El usuario que intentas borrar no existe en la base de datos' });
                }
                await UsersModel.findByIdAndDelete(userId)
                const updatedClase = await ClassModel.findByIdAndUpdate(
                    idClass._id,
                    { $pull: { Usuarios: userId } },
                    { new: true }
                )
                res.status(200).json({ msg: 'Usuario eliminado correctamente' });
            }else{
                if (!userToDelete) {
                    return res.status(400).json({ msg: 'El usuario que intentas borrar no existe en la base de datos' });
                }
                await UsersModel.findByIdAndDelete(userId)
                res.status(200).json({ msg: 'Usuario eliminado correctamente' });
            }
           
        } catch (error) {
            res.status(500).json({ msg: 'Falla en el server', error: error.message });
        }
    }
    

const UpdateUser = async (req,res)=>{
    try {
        const Update = await UsersModel.findByIdAndUpdate({ _id:req.params.id },req.body,{new:true})
        res.status(200).json({msg: 'Usuario Actualizado', Update })
    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

const GetComment = async (req,res)=>{
    try {
        const Comment = await UsersModel.findOne({_id:req.params.id})
        const comentario= Comment.Comentario
        res.status(200).json({ msg: 'Comentario encontrado', comentario})
    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

module.exports = { 
    CreateUser,
    GetUsers, 
    GetOneUser,
    DeleteUser, 
    UpdateUser, 
    LoginUser,
    GetComment,
}