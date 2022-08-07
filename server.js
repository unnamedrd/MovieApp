/*const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const { response } = require('express')
const {request} = require('http')
require('dotenv').config()
const PORT = 8700;



let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "sample_mflix",
  collection;

MongoClient.connect(dbConnectionStr)
  .then((client) => {
  console.log(`Connected to database`);
  db = client.db(dbName);
  collection = db.collection("movies");
});

//app.set('view engine', 'ejs')
//app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//first get statement will bring back entire array of possibilities while we're typing

app.get("/search", async (request, response) => {
  //try and catch block, searching for something and catching error
  try {
    let result = await collection
      .aggregate([
        //passing in object
        {
          $search: {
            autocomplete: {
              query: `${request.query.query}`,
              path: "title",
              fuzzy: {
                "maxEdits": 2, //can take 2 subs for chars spelling mistakes
                "prefixLength": 3, //req user to type in at least 3 char before starting autosearch
              },
            },
          },
        },
      ])
      .toArray();
    response.send(result); //response that comes out of get request is going to be result of search query
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

//second git request will narrow down search result to one item or movie

app.get("/get/:id", async (request, response) => {
  try {
    let result = await collection.findOne({
      //object
      "_id": ObjectId(request.params.id),
    });
    response.send(result);
  } catch(error) {
    response.status(500).send({ message: error.message });
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`server is running on port = ${PORT}whoot`);
});*/



const express = require('express')
const app = express()
const cors = require('cors')
const {MongoClient, ObjectId } = require('mongodb')
const { response } = require('express')
const { request } = require('http')
require('dotenv').config()
const PORT = 3000

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'sample_mflix',
    collection

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to database`)
        db = client.db(dbName)
        collection = db.collection('movies')
    })

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())

app.get("/search", async (request,response) => {
    try {
        let result = await collection.aggregate([
            {
                "$search" : {
                    "autocomplete" : {
                        "query": `${request.query.query}`,
                        "path": "title",
                        "fuzzy": {
                            "maxEdits":2,
                            "prefixLength": 3
                        }
                    }
                }
            }
        ]).toArray()
        //console.log(result)
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
        //console.log(error)
    }
})

app.get("/get/:id", async (request, response) => {
    try {
        let result = await collection.findOne({
            "_id" : ObjectId(request.params.id)
        })
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
    }
}
)

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on ${PORT}.`)
})

//THIS IS THE INDEX TO APPLY TO MONGODB MOVIES COLLECTION
// {
//     "mappings": {
//         "dynamic": false,
//         "fields": {
//             "title": [
//                 {
//                     "foldDiacritics": false,
//                     "maxGrams": 7,
//                     "minGrams": 3,
//                     "tokenization": "edgeGram",
//                     "type": "autocomplete"
//                 }
//             ]
//         }
//     }
// }