var express = require("express");
var router = express.Router();
const fs = require("fs");

router.get("/", function (req, res) {
  fs.readFile("data.json", (err, data) => {
    if (err) throw err;
    let jsonData = JSON.parse(data);
    res.send(jsonData["activities"]);
  });
});

router.get("/:room", function (req, res) {
  let room = req.params.room;
  console.log(room);
  fs.readFile("data.json", (err, data) => {
    if (err) throw err;
    let jsonData = JSON.parse(data);
    jsonData = jsonData["activities"].filter((act) => act["room"] === room);
    res.send(jsonData);
  });
});

router.post("/", function (req, res) {
  res.send("Got a POST request");
});

router.put("/user", function (req, res) {
  res.send("Got a PUT request at /user");
});

router.delete("/user", function (req, res) {
  res.send("Got a DELETE request at /user");
});

module.exports = router;
