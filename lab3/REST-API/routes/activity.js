var express = require("express");
var router = express.Router();
var fs = require("fs");

function makeActivity(body) {
  return {
    room: body.room,
    slot: body.slot,
    day: body.day,
    group: body.group,
    teacher: body.teacher,
    class: body.subject,
  };
}

function checkValidActivity(activity, data) {
  if (
    typeof activity.slot !== "undefined" &&
    typeof activity.room !== "undefined" &&
    typeof activity.group !== "undefined" &&
    typeof activity.day !== "undefined" &&
    typeof activity.teacher !== "undefined" &&
    typeof activity.class !== "undefined"
  ) {
    if (
      data["rooms"].includes(activity.room) &&
      data["groups"].includes(activity.group) &&
      data["teachers"].includes(activity.teacher) &&
      data["classes"].includes(activity.class)
    ) {
      return true;
    }
  }
  return false;
}

function checkActivityExists(activity, activityList) {
  return activityList.findIndex(
    (act) =>
      act.room == activity.room &&
      act.slot == activity.slot &&
      act.day == activity.day
  );
}
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
  // Create activity
  console.log(req.body);
  let act = makeActivity(req.body);
  let data = fs.readFileSync("data.json");
  data = JSON.parse(data);
  if (checkValidActivity(act, data) && checkActivityExists(act, data["activities"])) {
    // add activity, save file
  } else {
    // Bad request
  }
});

router.put("/", function (req, res) {
  // Update activity
  res.send("Got a PUT request");
});

router.delete("/", function (req, res) {
  // Delete activity
  res.send("Got a DELETE request");
});

module.exports = router;
