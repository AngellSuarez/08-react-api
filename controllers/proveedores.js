const Proveedor = require("../models/proveedores")

const postProveedor = async(req,res)=>{
    try{
        const proveedor = new Proveedor(req.body)
        await proveedor.save()
        res.status(201).json(proveedor)
    }catch(error){
        res.status(400).json({message:error.message})
    }
};

const getAllProveedores = async(req,res)=>{
    try{
        const proveedores = await Proveedor.find()
        res.status(200).json(proveedores);
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const getProveedorById = async(req,res)=>{
    try{
        const {id} = req.params
        const proveedor = await Proveedor.findById(id)
        if(!proveedor){
            return res.status(404).json({message:"Proveedor no encontrado"})
        }
        res.status(200).json(proveedor)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const patchProveedorById = async(req,res)=>{
    try{
        const {id} = req.params
        const proveedor = await Proveedor.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true
        });
        if(!proveedor){
            return res.json(404).json({message:"Proveedor no encontrado"})
        }
        res.status(200).json(proveedor)
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

const deleteProveedor = async(req,res)=>{
    try{
        const {id} = req.params
        const proveedor = await Proveedor.findByIdAndDelete(id)
        if(!proveedor){
            return res.status(404).json({message:"Proveedor no encontrado"}
            )
        }
        res.status(200).json({message:"Proveedor eliminado con exito"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    getAllProveedores,
    getProveedorById,
    postProveedor,
    patchProveedorById,
    deleteProveedor
}