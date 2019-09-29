const sendMessage = require('./messenger/output-message');
const scheduler = require('./scheduler/scheduler');

module.exports = () => {
  scheduler.reminder();
  sendMessage.getStarted();
  sendMessage.persistentMenu();
};
