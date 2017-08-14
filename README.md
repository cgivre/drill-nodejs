# Apache Drill Client for NodeJS
These are initial experiments to create a connector for NodeJS to query Apache Drill. 

## Usage
To query Drill, the `.execute()` or `.query()` functions 
```
var client = new Drill.Client({hostname:'localhost', port:8047});

client.query('SELECT * FROM cp.`employee.json` LIMIT 10', function(error, data, columns){
  console.log({data: data['rows'], columns: data['columns'], error: error});
});
```
