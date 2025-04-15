require('dotenv').config();
require('express-async-errors');

// Express
const express = require('express');
const app = express();

const morgan = require('morgan');

// Database
const connect = require('./db/connect');

// Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('e commerce api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connect(process.env.MONGO_URL);
    app.listen(PORT, console.log(`Server is running on port ${PORT}...`));
  } catch (error) {
    console.log({ error });
  }
};

start();
