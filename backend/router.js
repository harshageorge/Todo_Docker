var express = require("express");
var router = express.Router();
var db = require("./connect.js");

router.get("/get", function (req, res, next) {
  var sql = "SELECT * FROM todos";
  db.query(sql, function (err, rows) {
    if (err) {
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        rows,
      });
    }
    // res.status(200).send(data);
  });
});
router.post("/post", function (req, res, next) {
  var sql =
    "INSERT INTO `todos`(`id`,`title`,`todo_status`) VALUES ("+req.body.id+",'" +
    req.body.title +
    "'," +
    req.body.status +
    ")";
  db.query(sql, function (err, rows) {
    if (err) {
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        rows,
      });
    }
    // res.status(200).send("todos saved");
  });
});
router.put("/edit/:id", function (req, res, next) {
  var sql =
    "UPDATE todos SET title='" +
    req.body.title +
    "', todo_status=" +
    req.body.status +
    " WHERE id=" +
    req.params.id;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.status(200).send("todo edited");
  });
});

router.delete("/delete/:id", function (req, res, next) {
  var sql = "DELETE FROM todos WHERE id=" + req.params.id + "";
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.status(200).send("todo deleted");
  });
});
module.exports = router;
