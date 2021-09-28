var express = require("express");
var router = express.Router();
var fs = require('fs');

router.get("/", function(req, res) {
    fs.readFile('data.json',(err,data) => {
        if(err) throw err;
        let jsonData = JSON.parse(data);
        return res.send(jsonData["rooms"]);
    });
});

module.exports = router;