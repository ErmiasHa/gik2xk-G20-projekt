var express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/products', require('./routes/productsRoute'));
app.use('/cart', require('./routes/cartsRouter'));
app.use('/users', require('./routes/usersRoute'));

module.exports = app;
