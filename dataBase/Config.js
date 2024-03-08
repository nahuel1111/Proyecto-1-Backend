const Mongoose = require('mongoose')


Mongoose.connect(process.env.MONGO_CONNECT)
.then(()=>console.log("base de datos conectadaaaaa"))
.catch(()=> console.log("error no se pudo conectar"))