var express = require("express");
var router = express.Router();
const pool = require("../db/pool.js");


/* GET home page. */
router.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

module.exports = router;
