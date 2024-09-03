const Clientes = require("../models/clientes")

const postCliente = async(req,res) =>{
    try{
        const cliente = new Clientes(req.body)
        await cliente.save()
        res.status(200).json({message:"Cliente creado correctamente"},cliente)
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

const getAllClientes = async(req,res) =>{
    try{
        const cliente = await Clientes.find()
        res.status(200).json(cliente)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const getClienteId = async(req,res)=>{
    try{
        const {id} = req.params
        const cliente = await Clientes.findById(id)
        if(!cliente){
            return res.status(404).json({message:"Cliente no encontrado"})
        }
        res.status(200).json(cliente)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const patchCliente = async(req,res)=>{
    try{
        const {id} = req.params
        const cliente = await Clientes.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true
        });
        if(!cliente){
            return res.json(404).json({message:"Cliente no encontrado"}
            )
        }
        res.status(200).json(cliente)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const deleteCliente = async(req,res)=>{
    try{
        const {id} = req.params
        const cliente = await Clientes.findByIdAndDelete(id)

        if(!cliente){
            return res.status(404).json({message:"Cliente no eliminado"})
        }
        res.status(200).json({message:"Cliente eliminado con exito"})
    }catch(error) {res.status(500).json({message:error.message})}
}


module.exports = {
    postCliente,
    getAllClientes,
    getClienteId,
    patchCliente,
    deleteCliente
}