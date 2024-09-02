const Ventas = require("../models/ventas")
const Producto = require("#")
const mongoose = require("mongoose")

// Función para obtener todas las ventas con paginación
const getVentas = async (req, res) => {
  try {
    // Configuración de la paginación
    const pagina = parseInt(req.query.pagina) || 1;
    const limite = parseInt(req.query.limite) || 10;
    const saltar = (pagina - 1) * limite;

    // Obtener el total de ventas y las ventas de la página actual
    const totalVentas = await Ventas.countDocuments();
    const venta = await Ventas.find()
      .skip(saltar)
      .limit(limite)

    // Enviar respuesta con las ventas y la información de paginación
    res.status(200).json({
      venta,
      paginaActual: pagina,
      paginasTotales: Math.ceil(totalVentas / limite),
      totalVentas
    });
  } catch (error) {
    console.error("error al obtener ventas: ", error)
    res.status(500).json({ message: error.message })
  }
}

// Función para obtener una venta específica por su ID
const getVentaPorId = async (req, res) => {
  try {
    const { id } = req.params
    const venta = await Ventas.findOne({ _id: id })
    
    // Si no se encuentra la venta, enviar un error 404
    if (!venta) {
      return res.status(404).json({ message: "venta no encontrada" })
    }
    
    // Si se encuentra, enviar la venta
    res.status(200).json(venta)
    console.log(venta)
  } catch (error) {
    res.status(500).json({ message: error.message })
    console.log("error interno")
  }
}

// Función para crear una nueva venta
const postVenta = async (req, res) => {
  // Iniciar una sesión de transacción
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    // Crear una nueva venta con los datos recibidos
    const venta = new Ventas(req.body)
    const ventaGuardada = await venta.save({ session })

    // Actualizar el stock de los productos vendidos
    const actualizacionesStock = ventaGuardada.productos_servicios.map(item => 
      Producto.findByIdAndUpdate(
        item.producto_servicio_id,
        { $inc: { stock: -item.cantidad } },
        { session, new: true }
      )
    );
    await Promise.all(actualizacionesStock);

    // Confirmar la transacción y enviar la respuesta
    await session.commitTransaction();
    res.status(201).json(ventaGuardada);
  } catch (error) {
    // Si hay un error, deshacer la transacción
    await session.abortTransaction();
    console.error("Error creando la venta: ", error)
    res.status(500).json({ message: "Error al crear la venta" })
  } finally {
    // Cerrar la sesión de transacción
    session.endSession()
  }
}

// Estados válidos para una venta
const VALID_ESTADOS = ["pendiente", "completado", "cancelado"]

// Función para modificar el estado de una venta
const modificarEstadoVenta = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  // Verificar si el estado es válido
  if (!VALID_ESTADOS.includes(estado)) {
    return res.status(400).json({ message: "Estado invalido" })
  }

  // Iniciar una sesión de transacción
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Buscar la venta por ID
    const venta = await Ventas.findById({ _id: id }).session(session)
    if (!venta) {
      res.status(404).json({ message: "Venta no encontrada" })
    }

    // Verificar si la venta ya está completada o cancelada
    if (["completado", "cancelado"].includes(venta.estado)) {
      res.status(400).json({ message: "No se puede modificar una venta completada o cancelada" })
    }

    // Actualizar el estado de la venta
    venta.estado = estado

    // Si se cancela la venta, restaurar el stock de los productos
    if (estado === 'cancelado') {
      await Promise.all(venta.productos_servicios.map(item =>
        Producto.findByIdAndUpdate(
          item.producto_servicio_id,
          { $inc: { stock: +item.cantidad } },
          { session }
        )
      ))
    }

    // Guardar los cambios y confirmar la transacción
    await venta.save({ session });
    await session.commitTransaction()
    res.status(200).json(venta)
  } catch (error) {
    // Si hay un error, deshacer la transacción
    await session.abortTransaction();
    res.status(error.message.includes("no encontrada") ? 404 : 400).json({ message: error.message })
  } finally {
    // Cerrar la sesión de transacción
    session.endSession()
  }
}