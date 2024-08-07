var bcryptjs = require("bcryptjs");
var config = require("config");

function hash_password(password) {
    var saltRounds = config.get("salt");

    var salt = bcryptjs.genSaltSync(saltRounds);
    var hash = bcryptjs.hashSync(password, salt);

    return hash
}

module.exports = {
    hash_password: hash_password
}