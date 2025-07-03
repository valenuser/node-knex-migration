const knex = require('knex')
const config = require('../knexfile')

const db = knex(config.development)


db.raw('SELECT 1')
  .then(() => {
    console.log('Conectado a la base de datos MySQL correctamente');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err.message);
  });


module.exports = db