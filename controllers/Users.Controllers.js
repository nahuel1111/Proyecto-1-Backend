const UsersModel = require ("../models/Users.Schema")
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
          res.status(201).json({ msg: 'Producto creado con exito', SavedUser })
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
        const AllUsers = await UsersModell.find()
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

const DeleteUser = async (req,res)=>{
    try {
        const Delete= await UsersModel.findOne({ _id: req.params.id})

        if (!Delete) {
            res.status(400).json({ msg: 'El usuario que intentas borrar no existe en la base de datos' })
            return
          }
          await UsersModel.findByIdAndDelete({ _id: req.params.id })
          res.status(200).json({ msg: 'Usuario eliminado' })
    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
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


module.exports = { 
    CreateUser,
    GetUsers, 
    GetOneUser,
    DeleteUser, 
    UpdateUser, 
    LoginUser,
}