const mongoose = require("mongoose")

const VentasSchema = new mongoose.Schema({
   cliente_id:{
    type:String,
    required:true,
   },
   fecha:{
    type:Date,
    default:Date.now,
   },
   total:{
    type:Number,
    required:true,
   },
   productos_servicios:[
    {
        producto_servicio_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        nombre:{
            type:String,
            required:true,
        },
        cantidad:{
            type:Number,
            default:0   
        },
        precio:{
            type:Number,
            required:true
        }
    }
   ],
   estado:{
    type:String,
    enum:["pendiente","completado","cancelado"],
    default:"pendiente"
   }
})

const Ventas = mongoose.model("Ventas",VentasSchema)

module.exports = Ventas