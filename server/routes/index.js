var express = require("express");
var router = express.Router();
const pool = require("../db/pool.js");

/* GET home page. */
router.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

router.get("/todos", async (req, res) => {
  const results = await pool.query("select * from todos").catch(e => console.log(e));
  console.log(results.rows);
  res.send("OK");
})

module.exports = router;
