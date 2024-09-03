const mongoose = require("mongoose")

const ProductoSchema = new mongoose.Schema({
    nombre:{
        type:String,
        minlength:[5,"El nombre es demaciado corto"],
        maxlength:[30,"El nombre es muy largo"],
        required:true
    },
    descripcion:{
        type:String,
        minlength:[5,"La descripcion es demaciado corta"],
        maxlength:[30,"La descripcion es muy larga"],
        required:true
    },
    precio:{
        type:Number,
        min:[1,"El precio es muy bajo"],
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