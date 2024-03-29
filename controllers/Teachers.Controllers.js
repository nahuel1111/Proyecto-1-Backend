const TeachersModel=require('../models/Teachers.Schema')
const cloudinary = require('../helpers/cloudinary')
const ClassModel = require ("../models/Class.Schema")

const createTeacher = async (req,res)=>{
    try{
        const {NombyAp,Telefono} = req.body
        if (!NombyAp || !Telefono ) {
            res.status(400).json({ msg: 'Algun campo esta vacio' })
            return
          }
          const results = await cloudinary.uploader.upload(req.file.path);
          const newTeacher =  TeachersModel({...req.body, imagen: results.secure_url})
          const savedTeacher = await newTeacher.save();
          res.status(201).json({ msg: 'Producto creado con exito', savedTeacher })

    }
    catch (error){
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

const GetTeachers = async (req,res)=>{
    try {
        const GetAllTeachers = await TeachersModel.find()
        res.status(200).json({ msg: 'Profesores encontrados', GetAllTeachers })
      } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
      }
}
const GetOneTeacher = async (req,res)=>{
    try {
        const GetTeacher= await TeachersModel.findOne({ _id: req.params.id})
        res.status(200).json({msg: 'Profesor encontrado', GetTeacher })
    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}

const UpdateTeacher = async (req,res)=>{
    try {
    if(!req.file){
        const Update = await TeachersModel.findByIdAndUpdate({ _id:req.params.id }, req.body,{new:true})
        res.status(200).json({msg: 'Profesor Actualizado', Update })   
     return
    }
        const results = await cloudinary.uploader.upload(req.file.path);
        const Update = await TeachersModel.findByIdAndUpdate({ _id:req.params.id },{...req.body, imagen: results.secure_url},{new:true})
        res.status(200).json({msg: 'Profesor Actualizado', Update })
    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}


const DeleteTeacher = async (req,res)=>{
    try {
        const teacherId = req.params.id
        const idTeacher= await ClassModel.findOne({IDProfesor:teacherId})
        const Delete= await TeachersModel.findOne({ _id: req.params.id})
        if (idTeacher){
            if (!Delete) {
                return res.status(400).json({ msg: 'El profesor que intentas borrar no existe en la base de datos' });
            }
            await TeachersModel.findByIdAndDelete(idTeacher)
            const updatedClase = await ClassModel.findByIdAndUpdate(
                idTeacher._id,
                { $pull: { IDProfesor: teacherId } },
                { new: true }
            )
            res.status(200).json({ msg: 'Profesor eliminado correctamente' });
        }
     
          await TeachersModel.findByIdAndDelete({ _id: req.params.id })
          res.status(200).json({ msg: 'Profesor eliminado' })
    } catch (error) {
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}


module.exports = {
    createTeacher,
    GetTeachers,
    GetOneTeacher,
    UpdateTeacher,
    DeleteTeacher,
  }