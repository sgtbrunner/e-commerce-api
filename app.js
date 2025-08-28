require('dotenv').config();
require('express-async-errors');

// Native modules
const path = require('path');

// express
const express = require('express');
const app = express();

// rest of the packages
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');

app.use(express.static('./public'));
app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './public/uploads',
  })
);

// database
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/auth-routes');
const userRouter = require('./routes/user-routes');
const productRouter = require('./routes/product-routes');
const reviewRouter = require('./routes/review-routes');
const orderRouter = require('./routes/order-routes');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    max: 60,
    windowMs: 15 * 60 * 1000,
  })
);
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get('/', (_req, res) => {
  return res.status(200).redirect('/docs');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL).then(() =>
      app.listen(PORT, console.log(`Server is listening on port ${PORT}`))
    );
  } catch (error) {
    console.log({ error });
  }
};

start();
