const express = require('express')

class Server{
    constructor(){
        this.app=express()
        this.routes()
        
    }
    routes(){
        this.app.post("/",(req,res)=>{
            res.json("hola")
        })
    }

    listen(){
        this.app.listen(3001,()=>
console.log("el servidor se esta ejecutando en el puerto:",3001)
)
    }
}

module.exports=Server