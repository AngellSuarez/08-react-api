const Servicio = require("../models/servicios")

const postServicio = async (req,res) =>{
    try{
        const servicio = new Servicio(req.body);
        await servicio.save()
        res.status(201).json(servicio)
    }catch(error){
        res.status(400).json({message:error.message})
    }
};

const getAllServicios = async(req,res) =>{
    try{
        const servicios = await Servicio.find();
        res.status(200).json(servicios)
    }catch(error){
        res.status(500).json({message:error.message})
    }
};

const getServicioById = async(req,res) =>{
    try{
        const {id} = req.params
        const servicio = await Servicio.find({_id:id})

        if(!servicio){return res.status(404).json({message:"Servicio no encontrado"})}

        res.status(200).json(servicio)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const patchServicioById = async(req,res)=>{
    try{
        const {id} = req.params
        const servicio = await Servicio.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators: true,
        });

        if(!servicio){
            return res.status(404).json({message:"Servicio no encontrado"})
        }
        res.status(200).json(servicio)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const deleteServicio = async(req,res)=>{
    try{
        const {id} = req.params
        const servicio = await Servicio.findByIdAndDelete(id)
        if(!servicio){return res.status(404).json({message:"Servicio no encontrado"})}
        res.status(200).json({message:"Servicio eliminado correctamente"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    getAllServicios,
    getServicioById,
    postServicio,
    patchServicioById,
    deleteServicio
}