const { Pool } = require("pg");
require("dotenv").config();


const pool = new Pool({
  database: process.env.ENV_DATABASE,
  user: process.env.ENV_USER,
  password: process.env.ENV_PASSWORD,
  host: process.env.ENV_HOST,
  port: 5432,
  ssl: {
    sslmode: "require",
    rejectUnauthorized: false,
  },
});

// const pool = new Pool({
//   database: "todo_users",
//   user: "kawabata",
//   host: "localhost",
//   password: "XLwdAX2m",
//   port: 5432,
// });


module.exports = pool;