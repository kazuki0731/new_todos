var express = require("express");
var router = express.Router();
const pool = require("../db/pool.js");

/* GET home page. */
router.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

router.get("/todos", async (req, res) => {
  const results = await pool
    .query("select * from todos order by id asc")
    .catch((e) => console.log(e));
  res.send(results.rows);
});

router.post("/todo", async (req, res) => {
  const result = await pool
    .query("insert into todos (todo) values ($1) returning *", [req.body.todo])
    .catch((e) => console.log(e));
  res.send(result.rows[0]);
});

router.put("/todos", async (req, res) => {
  console.log(req.body.id);
  await pool
    .query("update todos set iscompleted = Not iscompleted where id = $1", [
      req.body.id,
    ])
    .catch((e) => console.log(e));
  res.send("OK");
});

router.delete("/todos", async (req, res) => {
  await pool
    .query("delete from todos where iscompleted = $1", [true])
    .catch((e) => console.log(e));
  res.send("OK");
});

module.exports = router;
