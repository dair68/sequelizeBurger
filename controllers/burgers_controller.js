var express = require("express");
var burger = require("../models/burger");

var router = express.Router();

//callback function for get routes
function renderBurgers(req, res) {
    burger.all(function(data) {
        var burgers = [];

        for(var i=0; i<data.length; i++) {
            //checking if burger has not been devoured
            var burg = {
                id: data[i].id,
                burger: data[i].burger_name,
                devoured: data[i].devoured
            };
            burgers.push(burg);
        }
    
        var params = {
            burgers: burgers
        };
        //console.log(params);

        res.render("index", params);
    });
}

//obtains burgers and displays them to main page
router.get("/", renderBurgers);
router.get("/index", renderBurgers);

//adds burger to database
router.post("/index", function(req, res) {
    //console.log(req.body);
    var name = req.body.name;
    burger.create(["burger_name"], [name], function(data) {
        //returning id of row added
        res.json({id: data.insertId});
    });
});

//updates burger to be devoured
router.put("/index", function(req, res) {
    console.log(req.body);
    var id = req.body.id;
    var condition = "id = " + id;
    console.log(condition);

    var values = {
        devoured: 1
    };

    burger.update(values, condition, function(result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.status(200).end();
          }
    })
});

module.exports = router;