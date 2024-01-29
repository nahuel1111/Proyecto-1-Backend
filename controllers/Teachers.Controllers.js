const TeachersModel=require('../models/Teachers.Schema')


const createTeacher = async (req,res)=>{
    try{
        const {NombyAp,Telefono} = req.body
        if (!NombyAp || !Telefono ) {
            res.status(400).json({ msg: 'Algun campo esta vacio' })
            return
          }

          const newTeacher =  TeachersModel({...req.body})
          const savedTeacher = await newTeacher.save();
          res.status(201).json({ msg: 'Producto creado con exito', savedTeacher })

    }
    catch (error){
        res.status(500).json({ msg: 'Falla en el server', error })
    }
}


module.exports = {
    createTeacher, 
  }