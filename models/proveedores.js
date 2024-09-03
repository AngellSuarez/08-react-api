const mongoose = require("mongoose")

const ProveedorSchema = new mongoose.Schema({
    nombre:{
        type:String,
        minlength:[3,"El nombre es muy corto"],
        maxlength:[40,"El nombre es muy largo"],
        required:true
    },
    apellido:{
        type:String,
        minlength:[3,"El apellido es muy corto"],
        maxlength:[30,"El apellido es muy largo"],
        required:true
    },
    correo:{
        type:String,
        required:true,
        validate:{
            validator: function(v){
                return /\S+@\S+\.\S+/.test(v)
            },
            message: props => `${props.value} no es un correo valido`
        }
    },
    telefono:{
        type:String,
        required:true,
        minlength:[10,"El telefono es muy corto"]
    },
    direccion:{
        type:String,
        required:true,
        minlength:[10,"La direccion es muy corta"],
        maxlenght:[25,"La direccion es demaciado larga"]
    }
})

const Proveedores = mongoose.model("Proveedores",ProveedorSchema)
module.exports = Proveedores