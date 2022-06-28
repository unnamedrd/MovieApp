const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const PORT = 8000;

require("dotenv").config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "sample_mflix",
  collection;

MongoClient.connect(dbConnectionStr).then((client) => {
  console.log(`Connected to database`);
  db = client.db(dbName);
  collection = db.collection("movies");
});

app.listen(process.env.PORT || PORT, () => {
  console.log("server is running whoot");
});
