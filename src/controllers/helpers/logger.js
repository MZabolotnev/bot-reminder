const fs = require('fs');

const log = fs.createWriteStream('./../logs/errors.log', { flags: 'a' });

module.exports = (filename, text) => {
  log.write(`[${Date()}] [${filename.split(/[\\/]/).pop()}] ${text}`);
};
