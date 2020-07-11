const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://localhost/databasetest";
mongoose.connect(URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const conecction = mongoose.connection;

conecction.once("open", () => {
  console.log("DB is connected");
});
