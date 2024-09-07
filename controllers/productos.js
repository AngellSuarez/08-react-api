const Productos = require('../models/productos')

const getAllProductos = async(req,res) =>{
    try{
        const producto = await Productos.find()
        res.status(200).json(producto)
    }catch(error){res.status(500).json({message:error.message})}
}

module.exports ={getAllProductos}