const mongoose = require("mongoose")

const ServicioSchema = new mongoose.Schema({
    nombre:{
        type: String,
        minlength:[4,"El nombre es muy corto"],
        maxlength:[30,"El nombre es muy largo"],
        required:true
    },
    descripcion:{
        type:String,
        minlength:[5,"La descripcion es muy corta"],
        maxlenght:[80,"La descripcion es demasiado larga"],
        required:true
    },
    precio:{
        type:Number,
        min:[1,"El precio es muy pequeño"],
        required:true
    }
})

const Servicios = mongoose.model("Servicios",ServicioSchema)
module.exports = Servicios