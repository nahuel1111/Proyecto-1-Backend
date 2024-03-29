const ClassModel = require('../models/Class.Schema')
const UsersModel = require('../models/Users.Schema')
const TeachersModel = require('../models/Teachers.Schema')
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
    if(!req.file){
        const Update = await ClassModel.findByIdAndUpdate({ _id:req.params.id }, req.body,{new:true})
        res.status(200).json({msg: 'Clase Actualizada', Update })    
    return
    }
        const results = await cloudinary.uploader.upload(req.file.path);
        const Update = await ClassModel.findByIdAndUpdate({ _id:req.params.id },{ ...req.body, imagen: results.secure_url},{new:true})
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
        if(!userExist){
         return   res.status(400).json({ msg: 'el id de usuario que intentas agregar no existe en la base de datos' })
        }
  
            const clase = await ClassModel.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { Usuarios: req.body.Usuarios } },
                { new: true }
            )
    
        
            const fecha = await UsersModel.findByIdAndUpdate(
                req.body.Usuarios,
                { $addToSet: { fechainicio: req.body.fechainicio, fechafinal: req.body.fechafinal } },
           
                { new: true }
            )
            return    res.status(200).json({ msg: 'Usuario agregado correctamente', clase });


      






       
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
        )
        const user = await UsersModel.findByIdAndUpdate(
            req.body.Usuarios,
            { 
                $unset: { fechainicio: "", fechafinal: "" }
            },
            { new: true }
        )


       

  res.status(200).json({ msg: 'Usuario eliminado correctamente', clase });
    } catch (error) {
            res.status(500).json({ msg: 'Falla en el server', error: error.message });
        
    }
}

const addUsuarioToTeacher = async (req,res)=>{
    try {
        if (!mongoose.Types.ObjectId.isValid(req.body.IDProfesor)) {
            return res.status(400).json({ msg: 'El ID del profesor proporcionado no es válido' });
        }
        const teacherExist = await TeachersModel.findOne({_id:req.body.IDProfesor})
       
        if(!teacherExist){
         return   res.status(400).json({ msg: 'el id de usuario que intentas agregar no existe en la base de datos' })
        }
        const teacher = await ClassModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { IDProfesor: req.body.IDProfesor } },
            { new: true }
        )






        res.status(200).json({ msg: 'profesor agregado correctamente', teacher });
    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error: error.message });
    }
}

const DeleteTeacherToClass = async (req,res)=>{
    try {
        if (!mongoose.Types.ObjectId.isValid(req.body.IDProfesor)) {
            return res.status(400).json({ msg: 'El ID del profesor proporcionado no es válido' });
        }
        const teacherExist = await TeachersModel.findOne({_id:req.body.IDProfesor})
        if(!teacherExist){
          return  res.status(400).json({ msg: 'el id de profesor que intentas eliminar no existe en la base de datos' })
        }
        const teacher = await ClassModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { IDProfesor: req.body.IDProfesor } },
            { new: true }
        );

  res.status(200).json({ msg: 'profesor eliminado correctamente', teacher });
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
    addUsuarioToTeacher,
    DeleteTeacherToClass,

  }