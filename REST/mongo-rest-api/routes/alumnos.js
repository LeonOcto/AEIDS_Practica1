const express = require('express');
const router = express.Router();
const Alumno = require('../models/Alumno');

// GET all Alumnos
router.get('/', async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    res.json(alumnos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

// POST create a new Alumno
router.post('/', async (req, res) => {
  try {
    const nuevoAlumno = new Alumno({
      nombre: req.body.nombre,
      apellido_pat: req.body.apellido_pat,
      apellido_mat: req.body.apellido_mat
    });

    const guardado = await nuevoAlumno.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;