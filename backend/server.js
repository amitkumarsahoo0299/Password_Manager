const express = require("express");
const dotenv = require("dotenv");
const { mongoClient, MongoClient } = require("mongodb");
const bodyparser = require('body-parser');
const { Result } = require("postcss");
const cors = require('cors')

dotenv.config();

//connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

//Database Name
const dbName = "passop";
const app = express();
const port = 3000;
app.use(bodyparser.json())
app.use(cors())

client.connect();

//get all the password
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  await client.connect();
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

//save the password
app.post("/", async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    await client.connect();
    const collection = db.collection("passwords");
    const findResult = await collection.insertOne(password);
    res.send({success:true, Result:findResult});
  });

//delete  the password
app.delete("/", async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  await client.connect();
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  res.send({success:true, Result:findResult});
});



app.listen(port, () => {
  console.log(`Example app listening on  port http://localhost:${port}`);
});
