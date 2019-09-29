const Notifications = require('../../services/db');

module.exports = notification => Notifications.create({
  userId: notification.userId,
  date: notification.date,
  text: notification.text,
  repeat: notification.repeat,
});

// Notifications.sync({ force: true }).then(() => {
// });
