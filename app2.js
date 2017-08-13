var Drill = require('./drill1.js');
//var drill = new Drill();
var client = new Drill.Client({hostname:'localhost', port:8047});

client.query('SELECT * FROM cp.`employee.json` LIMIT 10', function(error, data, columns){
  console.log({data: data['rows'], columns: data['columns'], error: error});
});
