const express = require('express');
const morgan = require('morgan');

const tourRouters = require('./routers/tourRouters');
const userRouters = require('./routers/userRouters');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
	console.log('Hello from Middleware');
	req.requestTime = new Date().toISOString();
	next();
});

app.use('/api/v1/tours', tourRouters);
app.use('/api/v1/users', userRouters);

module.exports = app;