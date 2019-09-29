const Notifications = require('../../services/db');

module.exports = notificationId => Notifications.destroy({
  where: {
    notificationId,
  },
});
