// app.js
var Drill = require('./drill.js');
var drill = new Drill();

var con = drill.createConnection({hostname:'localhost', port:8047});
//queryData = drill.query();
//console.log( queryData );

con.query("SELECT * FROM cp.`employee.json` LIMIT 20", function (err, data, columns) {
  if (err){ throw err; } else {
    console.log("Result: " + result);
  }
});
