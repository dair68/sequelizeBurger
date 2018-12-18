var orm = require("../config/orm.js");

var burger = {
    all: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },
    create: function(columns, values, cb) {
        orm.insertOne("burgers", columns, values, function(res) {
            cb(res);
        });
    },
    update: function(valuesObj, condition, cb) {
        orm.updateOne("burgers",valuesObj, condition, function(res) {
            cb(res);
        });
    }
};

module.exports = burger;