const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

// Initialize the app
const app = express();
const port = process.env.PORT || 3000;

// Import routes
const VentasRouter = require("./routes/ventas");
const ServicioRouter = require("./routes/servicios");
const ProveedorRouter = require("./routes/proveedores")
const ClientesRouter = require("./routes/clientes")
const UsuariosRouter = require("./routes/usuarios")
const ProductosRouter = require("./routes/productos")

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Basic route for health check or welcome
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// API routes
app.use("/api", VentasRouter);
app.use("/api", ServicioRouter);
app.use("/api", ProveedorRouter);
app.use("/api", ClientesRouter);
app.use("/api", UsuariosRouter);
app.use("/api", ProductosRouter)

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to the DB"))
  .catch((error) => console.error("Error connecting to the DB:", error));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
