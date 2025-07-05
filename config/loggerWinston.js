const winston = require('winston');
require('winston-daily-rotate-file');

const isDevelopment = process.env.NODE_ENV !== 'production';

// Configurando objeto info con los datos para el log
const addTraceInfo = winston.format((info) => {
  
  const error = new Error();
  const stack = error.stack?.split('\n');
  
  if (stack && stack.length >= 4) {
    const traceLine = stack[4];
    
    const match = traceLine.match(/\((.*):(\d+):(\d+)\)/);
    
    if (match) {
      info.file = match[1].split('/').slice(-2).join('/'); // muestra solo carpeta/archivo
      info.line = match[2];
      info.column = match[3];
    }
    
    const functionMatch = traceLine.trim().split(' ')[1];
    info.function = functionMatch?.split('.')[1] || 'anonymous';
  }
  
  return info;
});

//  logs de archivo
const fileFormat = isDevelopment
  ? winston.format.combine(
    addTraceInfo(),
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    winston.format.printf(
      (info) =>
        `${info.timestamp} ${info.level.toUpperCase()}: ${info.message} [${info.file}:${info.line}:${info.column} -> ${info.function}]`,
    ),
  )
  : winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    winston.format.printf(
      (info) =>
        `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`,
    ),
  );


// formato para logs de consola
const consoleFormat = winston.format.combine(
  addTraceInfo(),
  winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
  winston.format.printf(
    (info) => {
      return `${info.timestamp}-${info.level.toUpperCase()}: ${info.message} [${info.file}:${info.line}:${info.column} -> ${info.function}]`
    },
  ),
);

// Configuracion de logs error y de la aplicacion (rotatorios)
const logger = winston.createLogger({
    level: isDevelopment ? 'debug' : 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'user-service'},
    transports: [
      
      new winston.transports.DailyRotateFile({
        filename: 'logs/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '10m',
        maxFiles: '7d',
        level: 'error',
        format: fileFormat,
      }),
      
      new winston.transports.DailyRotateFile({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        level: 'info',
        format: fileFormat,
      }),
    ],
  })
;

/**
 * Adicionamos transporte de log en consola si estamos en desarrollo
 */
if (isDevelopment) {
  logger.add(new winston.transports.Console({
    format: consoleFormat,
  }));
}


/*
* Ejemplo de uso
*
* logger.error("Fallo en la base de datos");
* logger.warn("Token expirado, solicitando renovación");
* logger.info("Usuario autenticado correctamente");
* logger.debug("Respuesta de API externa:", respuesta);
*
 */


module.exports = logger;
