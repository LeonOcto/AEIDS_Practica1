const express = require('express');
const router = express.Router();
const Alumno = require('../models/Alumno');

function isPhoneNumber(str){
  return /^\+?\d+$/.test(str);
}

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
    const { nombre, apellido_pat, apellido_mat, correo, telefono, idioma_nat, descuento, referencia, matricula } = req.body;

    // CHECK IF REFERENCIA IS PROVIDED & VALIDATE EXISTENCE
    if (referencia && referencia.trim() !== '') {
      
      const referenciaTrimmed = referencia.trim();
      
      let refExists = false;

      // Check if reference is a valid ObjectId, otherwise search by name
      if (referenciaTrimmed.match(/^[0-9a-fA-F]{24}$/)) {
        refExists = await Alumno.findById(referenciaTrimmed);
      } else {
        // Search by referencia
        refExists = await Alumno.findOne({matricula:referenciaTrimmed});
      }

      if (!refExists) {
        return res.status(400).json({ 
          error: `La referencia "${referencia}" no existe en la base de datos de Alumnos.` 
        });
      }
    }
    if (!isPhoneNumber(telefono)) {
      return res.status(400).json({ 
        error: `El número de teléfono "${telefono}" no es válido. Debe contener solo dígitos y opcionalmente un signo '+' al inicio.` 
      });
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
      referencia: referencia ? referencia.trim() : null,
      matricula
      });

    const guardado = await nuevoAlumno.save();
    res.status(201).json(guardado);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ⚠️ EL EXPORT VA HASTA EL FINAL (después de TODAS las rutas)
module.exports = router;