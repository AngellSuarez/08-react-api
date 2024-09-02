//requires base
const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config();
const cors = require("cors")
const morgan = require("morgan")


const app = express()
const port = process.env.PORT || 3000

//insertar el require de las rutas


//const VentaRutas = require("./routes/ventas")

//middlware
app.use(cors())
app.use(express.json());
app.use(morgan("dev"))


//importe de rutas
app.use("/",(req,res)=>{
    res.send("que onda negro soy una api")
})
//get de rutas

//mongo
mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=> console.log("conected to the db"))
    .catch((error) => console.error(error))

//nombre del puerto
app.listen(port,()=>console.log("server in the port",port))