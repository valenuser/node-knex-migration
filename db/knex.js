const knex = require('knex')
const config = require('../knexfile')
const logger=require('../config/loggerWinston')

const db = knex(config.development)


db.raw('SELECT 1')
  .then(() => {
    logger.info('Conectado a la base de datos MySQL correctamente');
  })
  .catch((err) => {
    logger.error('Error al conectar a la base de datos:', err.message);
  });


module.exports = db