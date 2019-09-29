const fs = require('fs');

const log = fs.createWriteStream('./../.log', { flags: 'a' });

module.exports = (filename, text) => {
  log.write(`[${Date()}] [${filename.split(/[\\/]/).pop()}] ${text}`);
};
