require('dotenv').config({ path: 'connection.env' });
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

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
    
    /*// DEBUG: Print all collection names in the current DB
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections in DB:', collections.map(c => c.name));

    // more debug lol
    const rawDocs = await mongoose.connection.db.collection('Alumno').find({}).toArray();
    console.log('RAW DOCUMENTS IN ALUMNO:', rawDocs);*/

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Connection Error:', err));