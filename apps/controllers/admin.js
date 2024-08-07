var express = require("express");
var router = express.Router();

var user_md = require("../models/users")

router.get("/", function(req, res){
    res.json({"message" : "This is admin page"});
})

router.get("/signup", function(req, res){
    res.render("signup",  {data: {}});
})

router.post("/signup", function(req, res) {
    var user = req.body;

    if (user.email.trim().length == 0) {
        res.render("signup", {data : {error: "Email is required"}})
    }

    if (user.passwd != user.repasswd && user.passwd.trim().length == 0) {
        res.render("signup", {data : {error: "Password is not match!"}})
    }

    user ={
        email: user.email,
        password: user.passwd,
        first_name: user.first_name,
        last_name: user.last_name
    }

    user_md.addUser(user);
})

module.exports = router;