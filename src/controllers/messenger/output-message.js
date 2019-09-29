const templatesConstructor = require('../helpers/templatesConstructor');
const http = require('../../services/http');

module.exports = {
  textMessage: (userId, text) => http(
    `${process.env.MESSAGE_URL}${process.env.FACEBOOK_ACCESS_TOKEN}`,
    templatesConstructor.createQuery(userId, {
      text,
    }),
  ),

  templateMessage: (userId, template) => http(
    `${process.env.MESSAGE_URL}${process.env.FACEBOOK_ACCESS_TOKEN}`,
    templatesConstructor.createQuery(userId, templatesConstructor.messageTemplate(template)),
  ),

  buttonsMessage: (userId, id) => http(
    `${process.env.MESSAGE_URL}${process.env.FACEBOOK_ACCESS_TOKEN}`,
    templatesConstructor.createQuery(userId, templatesConstructor.buttonsTemplate(id)),
  ),

  listReminders: (userId, list) => http(
    `${process.env.MESSAGE_URL}${process.env.FACEBOOK_ACCESS_TOKEN}`,
    templatesConstructor.createQuery(userId, templatesConstructor.listTemplate(list)),
  ),

  getStarted: () => http(
    `${process.env.PROFILE_URL}${process.env.FACEBOOK_ACCESS_TOKEN}`,
    templatesConstructor.getStartedTemplate(),
  ),

  persistentMenu: () => http(
    `${process.env.PROFILE_URL}${process.env.FACEBOOK_ACCESS_TOKEN}`,
    templatesConstructor.persistentMenuTemplate(),
  ),
};
