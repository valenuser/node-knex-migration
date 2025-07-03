const fs = require('node:fs');
const path = require('node:path');

const morgan = require('morgan');


const logDirectory = path.resolve(__dirname, '..', 'logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}


const accessLogStream = fs.createWriteStream(
    path.join(logDirectory, 'access.log'),
    { flags: 'a' }
);


const loggerMiddleware = () => {
    return [
        morgan('dev'),
        morgan('combined', { stream: accessLogStream })
    ];
};

module.exports = loggerMiddleware;
