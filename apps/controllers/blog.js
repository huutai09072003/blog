var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
    router.json({"message" : "This is blog page"});
})

module.exports = router;