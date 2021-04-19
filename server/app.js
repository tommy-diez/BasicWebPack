'use strict';
const express = require('express');
const app = express();
app.use(express.static('docs'));
var bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const citiesRoutes = require('./routes/cities.routes');
app.use('/api/v1/cities', citiesRoutes);

app.set('port', process.env.PORT || 8000);
app.set('ip', process.env.NODEJS_IP || '127.0.0.1');

app.listen(app.get('port'), function() {
    console.log('%s: Node server started on %s ...', Date(Date.now()), app.get('port'));
});