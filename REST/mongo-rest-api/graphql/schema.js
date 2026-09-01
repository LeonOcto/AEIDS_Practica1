/**
 * =====================================================
 *  ESQUEMA GRAPHQL - ACADEMIA DE IDIOMAS
 * =====================================================
 * Este archivo define el "contrato" de la API GraphQL.
 * Especifica qué datos se pueden consultar, con qué
 * filtros y qué estructura tienen las respuestas.
 * 
 * NOTA: Debe coincidir EXACTAMENTE con el modelo
 * de Mongoose (Alumno.js) para que los resolvers
 * puedan mapear los datos de MongoDB sin errores.
 * =====================================================
 */

const { gql } = require('apollo-server-express');
// La función gql convierte un string en un AST (Abstract Syntax Tree)
// que Apollo Server puede interpretar.


const typeDefs = gql`
  # Definimos el tipo Alumno (basado en Mongoose)
  type Alumno {
    id: ID!
    nombre: String
    apellido_pat: String
    apellido_mat: String
    correo: String
    descuento: Float
    idioma_nat: String
    referencia: String
    telefono: String
  }

  # Definimos los filtros que acepta la consulta (todos opcionales)
  input FiltroAlumno {
    nombre: String
    apellido_pat: String
    apellido_mat: String
    correo: String
    idioma_nat: String
    descuento_min: Float
    descuento_max: Float
  }

  # La consulta principal
  type Query {
    alumnos(filtro: FiltroAlumno): [Alumno!]!
  }
`;

module.exports = typeDefs;