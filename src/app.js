require('dotenv').config({ path: './env/tokens.env' });
const express = require('express');
const bodyParser = require('body-parser');
const preStart = require('./controllers/pre-start');
const messageWebhook = require('./controllers/messenger/input-message');
const verifyWebhook = require('./controllers/messenger/verify-webhook');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => console.log('Express server is listening on port 5000'));
app.get('/', verifyWebhook);
app.post('/', messageWebhook);
preStart();
