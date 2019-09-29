const Notifications = require('../../services/db');

module.exports = (notificationId, newDate) => Notifications.update(
  {
    date: newDate,
  },
  {
    where: {
      notificationId,
    },
  },
);
