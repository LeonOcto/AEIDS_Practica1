const mongoose = require('mongoose');


const AlumnoSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true 
  },
  apellido_pat: { 
    type: String, 
    required: true 
  },
  apellido_mat: { 
    type: String, 
    required: false 
  },
  correo: { 
    type: String, 
    required: true 
  },
  descuento: { 
    type: Number, 
    required: true,
    default: 0
  },
  idioma_nat: { 
    type: String, 
    required: true 
  },
  referencia: { 
    type: String, 
    required: false 
  },
  telefono: { 
    type: String, 
    required: true 
  },
  matricula: { 
    type: String, 
    required: true 
  }
}, { timestamps: false });


// Explicitly binding to the exact collection name "Alumno"
module.exports = mongoose.model('Alumno', AlumnoSchema, 'Alumno');