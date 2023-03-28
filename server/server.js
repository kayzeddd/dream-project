const express = require("express");
const morgan = require("morgan");
const cors = require("cors")

express()

  .use(morgan("tiny"))
  .use(express.json())

  .use(express.static("public"))
  .use(cors())

  // .get('/', (req, res) => {
  //   res.status(200).json({status:"success"})
  // })
  

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "nope",
    });
  })

  .listen(8000, () => console.log(`Listening on port 8000`));

  