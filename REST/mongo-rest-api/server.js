require('dotenv').config({ path: 'connection.env' });
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');

// Importamos nuestros archivos de GraphQL
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();
app.use(express.json());

// Servir archivos estáticos (para que tu index.html funcione)
app.use(express.static(path.join(__dirname, '..')));

// Ruta principal (envía index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ========================================
// RUTAS REST (TU CÓDIGO ORIGINAL)
// ========================================
app.use('/api/alumnos', require('./routes/alumnos')); 

// ========================================
// CONFIGURACIÓN DE GRAPHQL
// ========================================
async function startServer() {
  // 1. Conectar a MongoDB
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ MongoDB Connected');

  // 2. Crear el servidor de Apollo (GraphQL)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Necesario para que el Playground funcione
    playground: true, // Habilitar el Playground de GraphQL
  });

  // 3. Arrancar Apollo
  await server.start();

  // 4. Montar GraphQL en la ruta /graphql
  server.applyMiddleware({ app, path: '/graphql' });

  // 5. Arrancar el servidor HTTP
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`GOOD REST API: http://localhost:${PORT}/api/alumnos`);
    console.log(`GOOD GraphQL API: http://localhost:${PORT}/graphql`);
    console.log(`GOOD Frontend: http://localhost:${PORT}`);
  });
}

// Ejecutamos el servidor
startServer().catch(err => console.error(' Error al iniciar el servidor:', err));