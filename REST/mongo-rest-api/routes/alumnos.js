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
    const { nombre, apellido_pat, apellido_mat, correo, telefono, idioma_nat, descuento, referencia } = req.body;

    // CHECK IF REFERENCIA IS PROVIDED & VALIDATE EXISTENCE
    if (referencia && referencia.trim() !== '') {
      // Searches by exact full name (e.g. "Juan Pérez Gómez") or by MongoDB _id
      const referenciaTrimmed = referencia.trim();
      
      let refExists = false;

      // Check if reference is a valid ObjectId, otherwise search by name
      if (referenciaTrimmed.match(/^[0-9a-fA-F]{24}$/)) {
        refExists = await Alumno.findById(referenciaTrimmed);
      } else {
        // Search by concatenated full name or individual name fields
        refExists = await Alumno.findOne({
          $expr: {
            $eq: [
              { $concat: ["$nombre", " ", "$apellido_pat", " ", "$apellido_mat"] },
              referenciaTrimmed
            ]
          }
        });
      }

      if (!refExists) {
        return res.status(400).json({ 
          error: `La referencia "${referencia}" no existe en la base de datos de Alumnos.` 
        });
      }
    }

    // CREATE NEW ALUMNO IF VALIDATION PASSES
    const nuevoAlumno = new Alumno({
      nombre,
      apellido_pat,
      apellido_mat,
      correo,
      telefono,
      idioma_nat,
      descuento: descuento || 0,
      referencia: referencia ? referencia.trim() : null
    });

    const guardado = await nuevoAlumno.save();
    res.status(201).json(guardado);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ⚠️ EL EXPORT VA HASTA EL FINAL (después de TODAS las rutas)
module.exports = router;