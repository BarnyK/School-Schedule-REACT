var express = require("express");
var router = express.Router();
const fs = require('fs');

router.get("/", function(req, res, next) {
    fs.readFile('data.json',(err,data) => {
        if(err) throw err;
        let jsonData = JSON.parse(data);
        res.send(jsonData["rooms"]);
    });
});

module.exports = router;