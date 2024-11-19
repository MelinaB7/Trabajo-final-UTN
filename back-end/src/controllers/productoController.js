const { default: mongoose } = require("mongoose");
const Producto = require("../models/productoModel");

console.log(Producto); // Asegúrate de que esto imprime la función del modelo


// Obtener todos 
const getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    //res.render("productos", { layout: "layouts/main", productos });
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Hubo un error al obtener los productos");
  }
};

// Crear un nuevo
const createProducto = async (req, res) => {
  const { nombre, descripcion, precio, cantidad  } = req.body;
  const imagenPath = req.file ? req.file.filename : ""; 

  // Validar que los datos sean válidos
  if (!nombre || isNaN(parseInt(cantidad)) || !descripcion || isNaN(parseInt(precio))  ) {
    return res.status(400).send("Todos los campos son obligatorios");
  }

  try {
    const nuevoProducto = new Producto({
      nombre,
      precio: parseInt(precio),
      descripcion,
      cantidad: parseInt(cantidad),
      //imagen : imagenPath,
    });
    await nuevoProducto.save();
    //res.status(303).redirect("/api/producto");
    res.status(200).send("ok");
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).send("Hubo un error al crear el producto");
  }
};


// Actualizar producto
const updateProducto = async (req, res) => {
  console.log("Datos recibidos: ", req.body); 

  const { nombre, descripcion, precio, cantidad } = req.body;
  console.log(nombre, descripcion, precio, cantidad); 
  const imagenPath = req.file ? req.file.filename: '';

  /* Validar que los datos sean válidos*/
  if (!nombre || isNaN(parseInt(precio)) || !descripcion || isNaN(parseInt(cantidad)) ) {
    return res.status(400).send("Todos los campos son obligatorios y el precio y cantidad deben ser números");
  }
  // Obtener y limpiar el ID producto
const productoId = req.params.id.trim(); //Eliminar espacios 
console.log("ID del producto", productoId);

// Validar que el ID sea valido
if (!mongoose.Types.ObjectId.isValid(productoId)) {
  return res.status(400).send("ID de producto no válido");
}
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(productoId, {
      nombre,
      precio: parseInt(precio),
      descripcion,
      cantidad: parseInt(cantidad),
     // imagen: imagenPath,
    }, { new: true });

    if (!productoActualizado) {
      return res.status(404).send("Producto no encontrado");
    }
    //res.status(303).redirect("/inventario");
    res.status(200).json(productoActualizado);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).send("Hubo un error al actualizar el producto");
  }
};

// Eliminar 
const deleteProducto = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).send("Producto no encontrado");
    }
    res.status(200).send("ok");
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).send("Hubo un error al eliminar el producto");
  }
};

module.exports = {
  getAllProductos,
  createProducto,
  updateProducto,
  deleteProducto,
};