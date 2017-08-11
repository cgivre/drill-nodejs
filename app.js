// app.js
var Drill = require('./drill1.js');
var drill = new Drill();

var con = drill.createConnection({hostname:'localhost', port:8047});
queryData = drill.query();
console.log( queryData );
