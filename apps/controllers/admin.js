var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
    router.json({"message" : "This is admin page"});
})

module.exports = router;