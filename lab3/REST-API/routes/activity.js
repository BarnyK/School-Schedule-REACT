var express = require("express");
var router = express.Router();
var fs = require("fs");

function makeActivity(body) {
  return {
    room: body.room,
    slot: parseInt(body.slot),
    day: parseInt(body.day),
    group: body.group,
    teacher: body.teacher,
    class: body.class,
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
      data["classes"].includes(activity.class) &&
      !isNaN(activity.day) &&
      !isNaN(activity.slot) &&
      activity.day >= 0 &&
      activity.day < 5 &&
      activity.slot >= 0 &&
      activity.slot < 9
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
    if (err) return res.sendStatus(500);
    let jsonData = JSON.parse(data);
    let responseData = jsonData["activities"];
    if (room) responseData = responseData.filter((act) => act["room"] == room);
    if (slot) responseData = responseData.filter((act) => act["slot"] == slot);
    if (day) responseData = responseData.filter((act) => act["day"] == day);
    return res.send(responseData);
  });
});

router.post("/", function (req, res) {
  // Create activity
  let act = makeActivity(req.body);
  let data = fs.readFileSync("data.json");
  data = JSON.parse(data);
  if (
    checkValidActivity(act, data) &&
    checkActivityExists(act, data["activities"]) == -1
  ) {
    data["activities"].push(act);
    data = JSON.stringify(data, null, 2);
    fs.writeFileSync("data.json", data);
    return res.sendStatus(200);
  } else {
    return res.sendStatus(400);
  }
});

router.put("/", function (req, res) {
  // Update activity
  let act = makeActivity(req.body);
  let data = fs.readFileSync("data.json");
  data = JSON.parse(data);
  if (checkValidActivity(act, data)) {
    let i = checkActivityExists(act, data["activities"]);
    if (i !== -1) {
      data["activities"][i] = act;
      data = JSON.stringify(data, null, 2);
      fs.writeFileSync("data.json", data);
      return res.sendStatus(200);
    }
  }
  return res.sendStatus(400);
});

router.delete("/", function (req, res) {
  // Delete activity
  let act = makeActivity(req.body);
  console.log(act);
  let data = fs.readFileSync("data.json");
  data = JSON.parse(data);
  if (checkValidActivity(act,data)) {
    if (
      typeof act.day !== "undefined" &&
      typeof act.slot !== "undefined" &&
      typeof act.room !== "undefined"
    ) {
      console.log(act);
      data["activities"] = data["activities"].filter(
        (activity) =>
          !(
            act.day == activity.day &&
            act.slot == activity.slot &&
            act.room == activity.room
          )
      );
      data = JSON.stringify(data, null, 2);
      fs.writeFileSync("data.json", data);
      return res.sendStatus(200);
    }
  }
  return res.sendStatus(400);
});

module.exports = router;
