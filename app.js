const http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const userServiceProxy = httpProxy('http://www.globo.com');
const productsServiceProxy = httpProxy('http://localhost:3002');

// Proxy request
app.get('/users', (req, res, next) => {
  userServiceProxy(req, res, next);
})

app.get('/products', (req, res, next) => {
  productsServiceProxy(req, res, next);
})

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var server = http.createServer(app);
server.listen(3000);