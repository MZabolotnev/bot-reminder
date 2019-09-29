const messageHandler = require('./message-handler');

module.exports = (req, res) => {
  if (req.body.object === 'page') {
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        messageHandler(event);
      });
    });

    res.status(200).end();
  }
};
