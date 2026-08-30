require('dotenv').config({ path: 'connection.env' });
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '..')));//regresar a la carpeta padre para servir index.html

app.get('/', (req, res) => { //enviar a index.html
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// 1. IMPORT & MOUNT ROUTE
app.use('/api/alumnos', require('./routes/alumnos')); 

// 2. HEALTH CHECK ROUTE (optional, tests root URL)
app.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}\nAccess the API at: http://localhost:${PORT}`));
    
  })
  .catch(err => console.error('Connection Error:', err));


