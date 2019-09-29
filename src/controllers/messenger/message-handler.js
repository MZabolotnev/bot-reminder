const moment = require('moment');
const processMessage = require('../dialogflow/process-message');
const scheduler = require('../scheduler/scheduler');
const sendMessage = require('./output-message');
const dbGetDaily = require('../database/db-get-daily');
const templatesConstructor = require('../helpers/templatesConstructor');
const dbDel = require('../database/db-del');
const dbChange = require('../database/db-change');
const phrases = require('./../../assets/phrases.json');
const config = require('./../../assets/config.json');


function listElConstructor(el) {
  return {
    title: el.dataValues.text,
    subtitle: el.dataValues.date,
    image_url: config.remImgUrl,
    buttons: [
      {
        title: 'Edit',
        type: 'postback',
        payload: `edit:${el.dataValues.notificationId}`,
      },
    ],
  };
}

function start(event) {
  sendMessage.textMessage(
    event.sender.id,
    phrases.mh.start,
  );
}

function last(event) {
  dbGetDaily(event.sender.id).then((res) => {
    if (res.length) {
      sendMessage.templateMessage(
        event.sender.id,
        templatesConstructor.reminderTemplate(res[res.length - 1]),
      );
    } else {
      sendMessage.textMessage(
        event.sender.id,
        phrases.mh.noReminders,
      );
    }
  });
}

function create(event) {
  const data = event;
  data.message = { text: 'create reminder' };
  delete data.postback;
  processMessage(data);
}

function dailyList(event) {
  const list = [];
  dbGetDaily(event.sender.id).then((res) => {
    res.forEach(el => list.push(listElConstructor(el)));
    if (list.length === 0) {
      sendMessage.textMessage(
        event.sender.id,
        phrases.mh.noReminders,
      );
    } else if (list.length === 1) {
      sendMessage.templateMessage(event.sender.id, list[0]);
    } else {
      sendMessage.listReminders(
        event.sender.id,
        list.slice(0, 4),
      );
    }
  });

  sendMessage.listReminders(event.sender.id, list);
}

function del(event, payload) {
  scheduler.delete(payload[1], event.sender.id);
  sendMessage.textMessage(event.sender.id, phrases.mh.delReminder);
}

function changeDate(event, payload) {
  const data = event;
  data.message = { text: `change reminder ${payload[1]} ` };
  processMessage(data);
}

function snooze(userId, notificationId) {
  dbChange(notificationId, moment().add(config.snoozeTime, 'm').format());
  sendMessage.textMessage(userId, phrases.mh.snoozeReminder);
}

function confirm(userId, notificationId) {
  dbDel(notificationId);
  sendMessage.textMessage(userId, phrases.mh.confirmReminder);
}

module.exports = (event) => {
  if (event.message && event.message.text) {
    processMessage(event);
  } else if (event.postback && event.postback.payload) {
    const payload = event.postback.payload.split(':');
    switch (payload[0]) {
      case 'last':
        last(event);
        break;
      case 'start':
        start(event);
        break;
      case 'create': {
        create(event);
        break;
      }
      case 'list': {
        dailyList(event);
        break;
      }
      case 'delete':
        del(event, payload);
        break;
      case 'edit':
        sendMessage.buttonsMessage(event.sender.id, payload[1]);
        break;
      case 'changeDate': {
        changeDate(event, payload);
        break;
      }
      case 'snooze': {
        snooze(event.sender.id, payload[1]);
        break;
      }
      case 'confirm': {
        confirm(event.sender.id, payload[1]);
        break;
      }
      default:
        sendMessage.textMessage(event.sender.id, phrases.mh.err);
    }
  }
};
