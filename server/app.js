const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

app.use(helmet());

app.use(express.json());

app.use(morgan('dev'));

app.post('/login', (req, res, next) => {
  res.json({ token: '123456' });
});


app.post('/form', (request, response) => {
  const data = request.body

  console.log(data)

  return response.json(data)
})

module.exports = app;