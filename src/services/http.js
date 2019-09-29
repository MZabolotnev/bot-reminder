const fetch = require('node-fetch');
const logger = require('../controllers/helpers/logger');

module.exports = (url, obj) => fetch(url, obj)
  .then(response => response.json())
  .catch((e) => {
    logger(__filename, e);
  });
