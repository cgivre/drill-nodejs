var Drill = require('./index.js');
var client = new Drill.Client({hostname:'localhost', port:8047});

/*client.query('SELECT * FROM cp.`employee.json` LIMIT 10', function(error, data, columns){
  console.log({data: data['rows'], columns: data['columns'], error: error});
});*/

client.cluster( function( error, response, body ){
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  console.log('body:', body);
});




/*client.plan('SELECT * FROM cp.`employee.json` LIMIT 10', function(error, data, columns){
  console.log({data: data['rows'], columns: data['columns'], error: error});
});*/
