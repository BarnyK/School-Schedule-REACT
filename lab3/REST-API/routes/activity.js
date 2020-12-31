var express = require("express");
var router = express.Router();
const fs = require("fs");

router.get("/", function (req, res) {
  let room = req.query.room;
  let slot = req.query.slot;
  let day = req.query.day;
  fs.readFile("data.json", (err, data) => {
    if (err) throw err;
    let jsonData = JSON.parse(data);
    let responseData = jsonData["activities"];
    if (room) responseData = responseData.filter((act) => act["room"] == room);
    if (slot) responseData = responseData.filter((act) => act["slot"] == slot);
    if (day) responseData = responseData.filter((act) => act["day"] == day);
    res.send(responseData);
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
