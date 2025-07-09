require("dotenv").config();

// express
const express = require("express");
const app = express();

// database
const connectDB = require("./db/connect");

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
