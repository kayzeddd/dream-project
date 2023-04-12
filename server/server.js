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
  saveDream,
  getSavedDreams,
  addView,
  deleteDream,
  getUserData,
  addRemoveLike,
  deleteSavedDream,
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
  .get("/get-saved-dreams/:userId", getSavedDreams)
  .get("/get-user-data/:userId", getUserData)

  .post("/dream/:dreamId", getOneDream)
  .post("/add-user", addUser)
  .post("/save-dream", saveDream)
  .post("/add-dream", addDream)
  .post("/add-comment", addComment)

  .patch("/like-dream", addRemoveLike)
  // .post("/add-view", addView)

  .delete("/delete-dream/:dreamId", deleteDream)
  .delete("/delete-saved-dream", deleteSavedDream)


  .listen(8000, () => console.log(`Listening on port 8000`));