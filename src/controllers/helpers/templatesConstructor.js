const phrases = require('./../../assets/phrases.json');

module.exports = {
  reminderTemplate: (el) => {
    const template = {
      title: el.dataValues.text,
      buttons: [
        {
          type: 'postback',
          title: phrases.tm.rmSnoozeTitle,
          payload: `snooze:${el.notificationId}`,
        },
      ],
    };

    if (el.dataValues.repeat) {
      template.buttons.push({
        type: 'postback',
        title: phrases.tm.rmDeleteTitle,
        payload: `delete:${el.notificationId}`,
      });
      template.subtitle = phrases.tm.rmDailySubtitle;
    } else {
      template.buttons.push({
        type: 'postback',
        title: 'Confirm',
        payload: `confirm:${el.notificationId}`,
      });
      template.subtitle = phrases.tm.rmOnceSubtitle;
    }
    return template;
  },
  messageTemplate: template => ({
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [template],
      },
    },
  }),
  buttonsTemplate: id => ({
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: phrases.tm.btText,
        buttons: [
          {
            title: phrases.tm.btChange,
            type: 'postback',
            payload: `changeDate:${id}`,
          },
          {
            title: phrases.tm.btDelete,
            type: 'postback',
            payload: `delete:${id}`,
          },
        ],
      },
    },
  }),
  listTemplate: list => ({
    attachment: {
      type: 'template',
      payload: {
        template_type: 'list',
        top_element_style: 'compact',
        elements: list,
      },
    },
  }),
  getStartedTemplate: () => ({
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      get_started: {
        payload: 'start',
      },
    }),
  }),
  persistentMenuTemplate: () => ({
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      persistent_menu: [
        {
          locale: 'default',
          composer_input_disabled: false,
          call_to_actions: [
            {
              title: phrases.tm.prCreate,
              type: 'postback',
              payload: 'create',
            },
            {
              title: phrases.tm.prShow,
              type: 'postback',
              payload: 'list',
            },
            {
              title: phrases.tm.prLast,
              type: 'postback',
              payload: 'last',
            },
          ],
        },
      ],
    }),
  }),
  createQuery: (userId, message) => ({
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(
      {
        messaging_type: 'RESPONSE',
        recipient: {
          id: userId,
        },
        message,
      },
    ),
  }),
};
