const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const multer = require("multer");
const path = require("path");

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", productoController.getAllProductos);
router.post("/", upload.single("imagen"), productoController.createProducto);
router.put("/:id", upload.single("imagen"), productoController.updateProducto);
router.delete("/:id", productoController.deleteProducto);

module.exports = router;
