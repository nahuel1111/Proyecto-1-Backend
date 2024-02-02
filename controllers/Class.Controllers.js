const ClassModel = require('../models/Class.Schema')
const UsersModel = require('../models/Users.Schema')
const mongoose = require('mongoose');
const cloudinary = require('../helpers/cloudinary')

const createClass = async (req, res) => {
    try {  
        const results = await cloudinary.uploader.upload(req.file.path);
      const newClass = new ClassModel({ ...req.body, imagen: results.secure_url})
      await newClass.save()
      res.status(201).json({ msg: 'Clase creada con exito', newClass })
    } catch (error) {
      res.status(500).json({ msg: 'Falla en el server', error })
    }   
  }
  
  

const GetClass = async (req,res)=>{
    try {
        const GetAllClass = await ClassModel.find()
        res.status(200).json({ msg: 'Clases encontradas', GetAllClass })
      } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
      }
}


const GetOneClass = async (req,res)=>{
    try {
        const GetClass= await ClassModel.findOne({ _id: req.params.id})
        res.status(200).json({msg: 'Clase encontrada', GetClass })
    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

const UpdateClass = async (req,res)=>{
    try {
        const Update = await ClassModel.findByIdAndUpdate({ _id:req.params.id },req.body,{new:true})
        res.status(200).json({msg: 'Clase Actualizada', Update })
    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

const DeleteClass = async (req,res)=>{
    try {
        const Delete= await ClassModel.findOne({ _id: req.params.id})

        if (!Delete) {
            res.status(400).json({ msg: 'La clase que intentas borrar no existe en la base de datos' })
            return
          }
          await ClassModel.findByIdAndDelete({ _id: req.params.id })
          res.status(200).json({ msg: 'Clase eliminada' })
    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

const addUsuarioToClase = async (req, res) => {
    try {
        
        if (!mongoose.Types.ObjectId.isValid(req.body.Usuarios)) {
            return res.status(400).json({ msg: 'El ID del usuario proporcionado no es válido' });
        }
        const userExist = await UsersModel.findOne({_id:req.body.Usuarios})
        console.log(userExist)
        if(!userExist){
         return   res.status(400).json({ msg: 'el id de usuario que intentas agregar no existe en la base de datos' })
        }
        const clase = await ClassModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { Usuarios: req.body.Usuarios } },
            { new: true }
        )






        res.status(200).json({ msg: 'Usuario agregado correctamente', clase });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Falla en el server', error: error.message });
    }
}

const DeleteUserToClass = async (req,res)=>{
    try {
        if (!mongoose.Types.ObjectId.isValid(req.body.Usuarios)) {
            return res.status(400).json({ msg: 'El ID del usuario proporcionado no es válido' });
        }
        const userExist = await UsersModel.findOne({_id:req.body.Usuarios})
        if(!userExist){
          return  res.status(400).json({ msg: 'el id de usuario que intentas eliminar no existe en la base de datos' })
        }
        const clase = await ClassModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { Usuarios: req.body.Usuarios } },
            { new: true }
        );

  res.status(200).json({ msg: 'Usuario eliminado correctamente', clase });
    } catch (error) {
            res.status(500).json({ msg: 'Falla en el server', error: error.message });
        
    }
}



module.exports = {
    createClass,
    GetClass,
    GetOneClass,
    UpdateClass,
    DeleteClass,
    addUsuarioToClase,
    DeleteUserToClass,

  }