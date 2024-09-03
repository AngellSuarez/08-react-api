const mongoose = require("mongoose")

const UsuarioSchema = new mongoose.Schema({
    nombre:{
        type:String,
        minlength:[3,"El nombre es muy corto"],
        maxlength:[20,"El nombre es muy largo"],
        require:true
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
        minlength:[9,"El telefono es muy corto"],
        maxlength:[13,"El telefono es muy largo"],
        required:true
    },
    password:{
        type:String,
        minlength:[4,"la contraseña es muy corta"],
        maxlength:[20,"La contraseña es muy larga mamaguevo"],
        required:true
    }
})

const Usuarios = mongoose.model("Usuarios",UsuarioSchema)

module.exports = Usuarios