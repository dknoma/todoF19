const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// the express app
const app = express();

// log requests to console
app.use(logger('dev'));
// parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// appending app to the require allows the express app to have access to the routes
require('./server/routes')(app);
// catch-all route where other paths get routed to that are not specified
app.get('*', (req, res) => res.status(200).send({
	message: 'HELLO THERE',
}));

module.exports = app;