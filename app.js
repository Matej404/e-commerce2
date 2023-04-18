// Instantiate express server
const express = require('express');
const app = express();

const loaders = require('./loaders');
const bodyParser = require('body-parser');

loaders(app);
// Listen on port 3000
app.listen(3000, () => {  console.log('Express server running on port 3000!') });