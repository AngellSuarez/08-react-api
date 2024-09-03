const Ventas = require("../models/ventas")
const Producto = require("../models/productos")
const mongoose = require("mongoose");
const Clientes = require("../models/clientes");

// Función para obtener todas las ventas con paginación
const getVentas = async (req, res) => {
  try {
    const { estado, cliente } = req.query;  // Obtener el estado y el cliente de los parámetros de consulta
    const pagina = parseInt(req.query.pagina) || 1;
    const limite = parseInt(req.query.limite) || 10;
    const saltar = (pagina - 1) * limite;

    // Construir el filtro basado en los parámetros recibidos
    let filtro = {};

    if (estado && estado !== 'todos') {
      filtro.estado = estado;
    }

    if (cliente && cliente !== '') {
      filtro.cliente_id = cliente;  
    }

    // Contar el número total de documentos que coinciden con el filtro
    const totalVentas = await Ventas.countDocuments(filtro);
    
    // Buscar las ventas que coinciden con el filtro y aplicar la paginación
    const venta = await Ventas.find(filtro)
      .skip(saltar)
      .limit(limite);

    // Enviar respuesta con las ventas y la información de paginación
    res.status(200).json({
      venta,
      paginaActual: pagina,
      paginasTotales: Math.ceil(totalVentas / limite),
      totalVentas
    });
  } catch (error) {
    console.error("Error al obtener ventas: ", error);
    res.status(500).json({ message: error.message });
  }
};

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
  try {
    // Crear una nueva venta con los datos recibidos
    const venta = new Ventas(req.body);

    // Guardar la venta en la base de datos
    await venta.save();

    // Actualizar el stock de los productos vendidos
    const actualizacionesStock = venta.productos_servicios.map(item =>
      Producto.findByIdAndUpdate(
        item.producto_servicio_id,
        { $inc: { stock: -item.cantidad } },
        { new: true }
      )
    );
    await Promise.all(actualizacionesStock);

    const cliente = await Clientes.findById(venta.cliente_id);
    if(!cliente){
      return res.status(400).json({message:"Cliente no encontrado"})
    };

    const infoVenta = {
      venta_id: venta._id,
      fecha: venta.fecha,
      total: venta.total,
      productos_servicios: venta.productos_servicios
    };

    cliente.ventas.push(infoVenta)
    await cliente.save()

    // Enviar la respuesta
    res.status(201).json(venta);
  } catch (error) {
    // Manejar el error
    console.error("Error creating the sale: ", error);
    res.status(500).json({ message: "Error al crear la venta" });
  }
};

// Estados válidos para una venta

const VALID_ESTADOS = ["pendiente", "completado", "cancelado"];

const modificarEstadoVenta = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  // Verificar si el estado es válido
  if (!VALID_ESTADOS.includes(estado)) {
    return res.status(400).json({ message: "Estado inválido" });
  }

  try {
    // Buscar la venta por ID
    const venta = await Ventas.findById(id);
    if (!venta) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    // Verificar si la venta ya está completada o cancelada
    if (["completado", "cancelado"].includes(venta.estado)) {
      return res.status(400).json({ message: "No se puede modificar una venta completada o cancelada" });
    }

    // Actualizar el estado de la venta
    venta.estado = estado;

    // Si se cancela la venta, restaurar el stock de los productos
    if (estado === 'cancelado') {
      await Promise.all(venta.productos_servicios.map(item =>
        Producto.findByIdAndUpdate(
          item.producto_servicio_id,
          { $inc: { stock: +item.cantidad } },
          { new: true }
        )
      ));
    }

    // Guardar los cambios
    await venta.save();
    res.status(200).json(venta);
  } catch (error) {
    // Manejar errores
    console.error("Error modifying the sale: ", error);
    res.status(error.message.includes("no encontrada") ? 404 : 400).json({ message: error.message });
  }
};

module.exports = {
  getVentas,
  getVentaPorId,
  postVenta,
  modificarEstadoVenta
}
