const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const heroes = require("./routes/heroes");
require("dotenv").config();

const app = express();

app.use("/images", express.static("images"));

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

mongoose.connect(process.env.MONGO_CONN_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json(err.message);
  next();
};
app.use(errorHandler);

app.use("/api/heroes", heroes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
