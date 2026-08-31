/**
 * =====================================================
 *  RESOLVERS GRAPHQL - ACADEMIA DE IDIOMAS
 * =====================================================
 * Este archivo contiene la lógica de negocio que se ejecuta
 * cuando un cliente hace una consulta GraphQL.
 * 
 * Los resolvers son funciones que toman los argumentos
 * del cliente y devuelven los datos reales desde MongoDB.
 * =====================================================
 */

const Alumno = require('../models/Alumno');

const resolvers = {
  Query: {
    alumnos: async (_, { filtro = {} }) => {
      try {
        // Construimos el query de Mongo dinámicamente según los filtros que lleguen
        const query = {};

        if (filtro.nombre) {
          query.nombre = { $regex: filtro.nombre, $options: 'i' };
        }
        if (filtro.apellido_pat) {
          query.apellido_pat = { $regex: filtro.apellido_pat, $options: 'i' };
        }
        if (filtro.apellido_mat) {
          query.apellido_mat = { $regex: filtro.apellido_mat, $options: 'i' };
        }
        if (filtro.correo) {
          query.correo = { $regex: filtro.correo, $options: 'i' };
        }
        if (filtro.idioma_nat) {
          query.idioma_nat = filtro.idioma_nat;
        }

        // Filtros por rango de descuento
        if (filtro.descuento_min || filtro.descuento_max) {
          query.descuento = {};
          if (filtro.descuento_min) query.descuento.$gte = filtro.descuento_min;
          if (filtro.descuento_max) query.descuento.$lte = filtro.descuento_max;
        }

        // Ejecutamos la búsqueda en la colección "Alumno"
        const alumnos = await Alumno.find(query);
        return alumnos;
      } catch (error) {
        throw new Error(`Error al buscar alumnos: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;