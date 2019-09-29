const projectId = process.env.PROJECT_ID;
const LANGUAGE_CODE = 'en-US';
const dialogFlow = require('dialogflow');
const moment = require('moment');
const sendMessage = require('../messenger/output-message');
const phrases = require('./../../assets/phrases.json');
const logger = require('..//helpers/logger');


const dbCreate = require('../database/db-create');
const dbChange = require('../database/db-change');


const config = {
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
  },
};

const sessionClient = new dialogFlow.SessionsClient(config);

function dateStructuring(result) {
  const { date, time } = result.parameters.fields;
  return moment(date)
    .hour(moment(time.stringValue)
      .hour())
    .minutes(moment(time.stringValue)
      .minutes()).format();
}

function isCreateIntent(result) {
  return result.intent.displayName === 'create'
        && result.parameters.fields.any.stringValue
        && result.parameters.fields.time.stringValue
        && result.parameters.fields.date.stringValue
        && result.parameters.fields.yes_no.stringValue;
}

function createIntent(userId, result) {
  const notification = {
    date: dateStructuring(result),
    userId,
    text: result.parameters.fields.any.stringValue,
    repeat: result.parameters.fields.yes_no.stringValue === 'yes',
  };
  dbCreate(notification)
    .then(() => sendMessage.textMessage(
      userId,
      phrases.pm.add,
    ))
    .catch((err) => {
      console.error('ERROR:', err);
    });
}

function isChangeIntent(result) {
  return result.intent.displayName === 'change'
        && result.parameters.fields.number.numberValue
        && result.parameters.fields.date.stringValue
        && result.parameters.fields.time.stringValue;
}

function changeIntent(userId, result) {
  dbChange(result.parameters.fields.number.numberValue, dateStructuring(result))
    .then(() => sendMessage.textMessage(userId, phrases.pm.add))
    .catch((err) => { console.log(err); });
}

module.exports = (event) => {
  const userId = event.sender.id;
  const message = event.message.text;
  const sessionPath = sessionClient.sessionPath(projectId, userId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: LANGUAGE_CODE,
      },
    },
  };

  sessionClient
    .detectIntent(request)
    .then((responses) => {
      const result = responses[0].queryResult;
      if (isCreateIntent(result)) {
        createIntent(userId, result);
      } else if (isChangeIntent(result)) {
        changeIntent(userId, result);
      }
      return sendMessage.textMessage(userId, result.fulfillmentText);
    })
    .catch((e) => {
      logger(__filename, e);
    });
};
