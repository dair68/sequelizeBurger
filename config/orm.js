var connection = require("./connection");

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

//reads all the data in the burgers table
var orm = {
    selectAll: function(table, cb) {
        var query = "SELECT * FROM ??";
        connection.query(query, [table] ,function (err, res) {
            if (err) {
                throw err;
            }
            //console.log(res);
            cb(res);
        });
    },
    insertOne: function(table, columns, values, cb) {
        var query = "INSERT INTO ??(??) VALUES(?)";
        var parameters = [
            table,
            columns,
            values
        ];
        connection.query(query, parameters, function(err, res) {
            if(err) {
                throw err;
            }
            //console.log(res);
            cb(res);
        });
    },
    updateOne: function(table, valuesObj, condition, cb) {
        //var query = "UPDATE ?? SET ? WHERE ?";
        var parameters = [
            table,
            objToSql(valuesObj),
            condition
        ];
        var query = "UPDATE " + table + " SET " + objToSql(valuesObj) + " WHERE " + condition;
        console.log(query);
        connection.query(query, function(err, res) {
            if(err) {
                throw err;
            }
            console.log(res);
            cb(res);
        });
    }
}

module.exports = orm;