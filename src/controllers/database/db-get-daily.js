const moment = require('moment');
const Notifications = require('../../services/db');
const config = require('./../../assets/config.json');


module.exports = (userId) => {
  const now = Date.now();
  return Notifications.findAll({
    limit: config.dbDailyLimit,
    where: {
      userId,
      date: {
        [Notifications.operator.between]: [
          moment(now).toDate(),
          moment(now)
            .hour(23)
            .minute(58)
            .toDate(),
        ],
      },
    },
  });
};
