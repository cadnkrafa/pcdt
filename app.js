const express = require('express');
const bodyParser = require('body-parser');
const lineWebhook = require('./line-webhook');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/webhook', lineWebhook);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
