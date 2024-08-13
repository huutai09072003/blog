var q = require("q")
var db = require("../common/database");
var conn = db.getConnection();

function getAllPosts() {
    var defer = q.defer();
        var query = conn.query('SELECT * FROM posts', function (error, post) {
            if (error){
                defer.reject(error);
            } else{
                defer.resolve(post);
            }
        });

        return defer.promise;
}

module.exports = {
    getAllPosts: getAllPosts
}