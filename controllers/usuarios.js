const Usuarios = require("../models/usuarios")

const registerUsuario = async(req,res) =>{
    const {password, confirmPassword, ...rest} = req.body

    if(password !== confirmPassword){
        return res.status(400).json({message:"Las contraseñas no coinciden"})
    }
    const usuarios = new Usuarios({
        ...rest,
        password: password,
    });

    try{
        await usuarios.save()
        res.status(200).json({message:"Usuario creado"})
        console.log(usuarios)
    }catch(error){
        res.status(500).json({message:error.message,error})
        console.log(error)
    }
}

const loginUsuario = async(req,res)=>{
    const {correo,password} = req.body;

    try{
        const usuario = await Usuarios.findOne({correo:correo})

        if(!usuario){
            return res.status(404).json({message:"Correo no encontrado registate gay"})
        }

        if(usuario.password !== password){
            return res.status(400).json({message:"La constraseña es incorrecta"})
        }

        res.status(200).json({message:"Bienvenido: ",usuario})
    } catch(error){
        res.status(500).json({message:error.message})
    }
}

const getAllUsuarios = async(req,res)=>{
    try{
        const usuario = await Usuarios.find()
        res.status(200).json(usuario)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const getUsuarioId = async(req,res)=>{
    try{
        const {id} = req.params
        const usuario = await Usuarios.findById(id)
        if(!usuario){
            return res.status(404).json({message:"Usuario no encontrado"})
        }
        res.status(200).json(usuario)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const deleteUsuario = async(req,res)=>{
    try{
        const {id} = req.params
        const usuario = await Usuarios.findByIdAndDelete(id)
        if(!usuario){
            return res.status(404).json({message:"Usuario no eliminado"})
        }
        res.status(200).json({message:"Usuario eliminado correctamente"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    registerUsuario,
    loginUsuario,
    getAllUsuarios,
    getUsuarioId,
    deleteUsuario
}