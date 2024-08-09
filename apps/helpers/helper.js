var bcryptjs = require("bcryptjs");
var config = require("config");

function hash_password(password) {
    var saltRounds = config.get("salt");

    var salt = bcryptjs.genSaltSync(saltRounds);
    var hash = bcryptjs.hashSync(password, salt);

    return hash
}

function compare_password(password, hash) {
    return bcryptjs.compareSync(password, hash);
}

module.exports = {
    hash_password: hash_password,
    compare_password: compare_password
}