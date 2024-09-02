const mongoose = require("mongoose")

const ProductoSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        requried:true
    },
    stock:{
        type:Number,
        required:true,
        default: 0,
    }
})

const Productos = mongoose.model("Productos",ProductoSchema)

module.exports = Productos