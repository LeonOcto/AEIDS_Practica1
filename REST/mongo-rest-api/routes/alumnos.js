const express = require('express');
const router = express.Router();
const Alumno = require('../models/Alumno');

// GET - Obtener todos los alumnos
router.get('/', async (req, res) => {
  try {
    const alumnos = await Alumno.find({});
    res.json(alumnos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Crear un nuevo alumno
router.post('/', async (req, res) => {
  try {
    const nuevoAlumno = new Alumno({
      nombre: req.body.nombre,
      apellido_pat: req.body.apellido_pat,
      apellido_mat: req.body.apellido_mat,
      correo: req.body.correo,
      descuento: req.body.descuento,
      idioma_nat: req.body.idioma_nat,
      referencia: req.body.referencia,
      telefono: req.body.telefono
    });

    const guardado = await nuevoAlumno.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ⚠️ EL EXPORT VA HASTA EL FINAL (después de TODAS las rutas)
module.exports = router;