const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connection = require("./dbService");

//read
app.get("/getAll", (request, response) => {
  var sql = "SELECT * FROM post_tb;";
  connection.query(sql, function (err, rows) {
    if (err) {
      response.status(500).send({ error: "Something failed!" });
    }
    response.json(rows);
  });
});

// create
app.post("/create", (request, response) => {
  const date_added = new Date();
  const title = request.body.title;
  const post = request.body.body;

  console.log(request.body, "create app title, post");
  let sql = `INSERT INTO post_tb (title, post, date_added) VALUES (?, ?, ?)`;
  connection.query(sql, [title, post, date_added], (err, result) => {
    if (err) throw err.message;
    response.json(result);
  });
  // response.json(data)
});

//delete
app.delete("/delete/:id", (request, response) => {
  const { id } = request.params;
  console.log(id, "i m id");
  let sql = "DELETE FROM post_tb WHERE id = ?";
  connection.query(sql, [id], function (err, row) {
    if (err) {
      response.status(500).send({ error: "Something failed!" });
    }
    response.json(row);
  });
});
//patch
app.patch("/update/:id", (request, response) => {
  const data = request.body;
  const { id } = request.params;
  console.log(data, "body update", id, "id...");
  response.json(id)
});

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});
