const mongoose = require("mongoose")

const ClienteSchema = new mongoose.Schema({
    
    nombre:{
        type:String,
        minlength:[3,"El nombre es muy corto"],
        maxlength:[20,"El nombre es muy largo"],
        require:true
    },
    apellido:{
        type:String,
        minlength:[3,"El apellido es muy corto"],
        maxlength:[20,"El apellido es muy largo"],
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
    ventas:[]
})

const Clientes = mongoose.model("Clientes",ClienteSchema)

module.exports = Clientes