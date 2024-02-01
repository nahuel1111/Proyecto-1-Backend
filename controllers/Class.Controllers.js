const ClassModel = require('../models/Class.Schema')


const createClass = async (req, res) => {
    try {  
      const newClass = new ClassModel({ ...req.body})
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





module.exports = {
    createClass,
    GetClass,
    GetOneClass,
    UpdateClass,
    DeleteClass,


  }