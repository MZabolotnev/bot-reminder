const moment = require('moment');
const Notifications = require('../../services/db');
const config = require('./../../assets/config.json');

module.exports = () => {
  const now = Date.now();
  return Notifications.findAll({
    where: {
      date: {
        [Notifications.operator.between]: [
          moment(now).toDate(),
          moment(now)
            .add(config.dbCronyInterval, 'm')
            .toDate(),
        ],
      },
    },
  });
};
