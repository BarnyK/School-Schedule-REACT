var express = require("express");
var router = express.Router();
var fs = require('fs');

router.get("/", function(req, res) {
    fs.readFile('data.json',(err,data) => {
        if(err) throw err;
        let jsonData = JSON.parse(data);
        res.send(jsonData["classes"]);
    });
});

module.exports = router;