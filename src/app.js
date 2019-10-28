const express = require('express');

const log = require('./middlewares/log');
const routes = require('./config/routes');
const cors = require('./middlewares/cors');

const app = express();

app.use(log);
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

module.exports = app;
