const Mongoose = require('mongoose')


Mongoose.connect('mongodb+srv://cesarhermidacordaro:XsrSbZhOIBzYXJWs@cluster0.zz8zbdc.mongodb.net/')
.then(()=>console.log("base de datos conectadaaaaa"))
.catch(()=> console.log("error no se pudo conectar"))