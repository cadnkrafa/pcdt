const line = require('@line/bot-sdk');
const formFlow = require('./conversation/form-flow');
const stateManager = require('./conversation/state-manager');
require('dotenv').config();

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new line.Client(config);

module.exports = async (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then(() => res.status(200).end())
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });

  async function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') return;

    const userId = event.source.userId;
    const userMessage = event.message.text;

    const { replyMessage } = await formFlow.handleUserReply(userId, userMessage);
    return client.replyMessage(event.replyToken, replyMessage);
  }
};

