const cron = require('node-cron');
const moment = require('moment');
const sendMessage = require('../messenger/output-message');
const dbDel = require('../database/db-del');
const dbGetCrony = require('../database/db-get-crony');
const templatesConstructor = require('../helpers/templatesConstructor');
const dbChange = require('../database/db-change');
const config = require('./../../assets/config.json');


const tasks = [];

async function collector() {
  const arr = await dbGetCrony();
  arr.forEach((el) => {
    const date = moment(el.dataValues.date).format('m H D M E');
    const task = cron.schedule(date, async () => {
      await sendMessage.templateMessage(el.userId, templatesConstructor.reminderTemplate(el));
      if (!el.dataValues.repeat) {
        task.destroy();
        dbChange(
          el.notificationId,
          moment(el.dataValues.date).add(config.schedulerRepeatTime,
            'm').format(),
        );
      }
    });
    task.id = el.notificationId;
    tasks.push(task);
    task.start();
  });
}

function reminder() {
  collector();
  setInterval(collector, config.collectorIntervalTimeSec);
}

async function deleteReminder(id) {
  await dbDel(id);
  tasks.forEach((task) => {
    if (task.id === id) {
      task.destroy();
    }
  });
}

module.exports = {
  reminder,
  delete: deleteReminder,
};
