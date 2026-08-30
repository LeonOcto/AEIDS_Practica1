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
    required: true 
  }
}, { timestamps: false });


// Explicitly binding to the exact collection name "Alumno"
module.exports = mongoose.model('Alumno', AlumnoSchema, 'Alumno');