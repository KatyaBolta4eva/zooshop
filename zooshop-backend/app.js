require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const port = 3000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static("../zooshop-frontend/build"));

app.use("/", routes);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  console.log("Connected to mongodb");
  app.listen(port, () => {
    console.log(`Server has been started on port ${port}...`);
  });
});
