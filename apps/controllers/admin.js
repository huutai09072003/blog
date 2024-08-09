var express = require("express");
var router = express.Router();

var user_md = require("../models/user")
var helper = require("../helpers/helper")

router.get("/", function(req, res){
    res.json({"message" : "This is admin page"});
})

router.get("/signup", function(req, res){
    res.render("signup",  {data: {}});
})

router.get("/signin", function(req, res){
    res.render("signin",  {data: {}});
})

router.post("/signup", function(req, res) {
    var user = req.body;

    if (user.email.trim().length == 0) {
        res.render("signup", {data : {error: "Email is required"}})
    }

    if (user.passwd != user.repasswd || user.passwd.trim().length == 0) {
        res.render("signup", {data : {error: "Password is not match!"}})
    }

    var hashed_password = helper.hash_password(user.passwd);

    user ={
        email: user.email,
        password: hashed_password,
        first_name: user.firstname,
        last_name: user.lastname
    }

    var result= user_md.addUser(user);

    result.then(function(data) {
        res.redirect("/admin/signin");
        console.log(data);
    }).catch(function(err){
        res.render("signup", {data : {error: "Connect insert User to DB!"}});
        console.log(err);
    })

    // if (!result) {
    //     res.render("signup", {data : {error: "Connect insert User to DB!"}})
    // } else{
    //     res.json({message: "Inserted successful!"})
    // }
})

router.post("/signin", function(req, res){
    var params = req.body;

    if (params.email.trim().length == 0) {
        res.render("signin", {data : {error: "Please fill the email"}});
    } else{
        var data = user_md.getUserbyEmail(params.email);
    }

    if (data) {
        data.then(function(users){
            var user = users[0];

            var status = helper.compare_password(params.password, user.password);

            if (!status) {
                res.render("signin", {data : {error: "Wrong password"}});
            } else{
                req.session.user = user;
                console.log(req.session.user);
                res.redirect("/admin/");
            }
        })
    }else{
        res.render("signup", {data : {error: "User not exists"}});
    }
})

module.exports = router;