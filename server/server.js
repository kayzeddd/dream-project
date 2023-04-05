const express = require("express");
const morgan = require("morgan");
const cors = require("cors")

const { testFetch } = require('./openai-handlers')
const { 
  addUser, 
  addDream, 
  getAllDreams, 
  getUserDreams,
  getOneDream,
  addComment, 
} = require('./handlers')

express()

  .use(morgan("tiny"))
  .use(express.json())

  .use(express.static("public"))
  .use(cors())
  .use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods: *");
    res.header("Allow: *"); 
    next();
    })


  .get("/test", testFetch)
  .get("/all-dreams", getAllDreams)
  .get("/user-dreams/:userId", getUserDreams)
  .get("/dream/:dreamId", getOneDream)

  .post("/add-user", addUser)

  .post("/add-dream", addDream)
  .post("/add-comment", addComment)


  .listen(8000, () => console.log(`Listening on port 8000`));