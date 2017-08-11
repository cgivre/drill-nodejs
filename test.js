var http = require('http');
var dt = require('./dategen');
var drill = require('./drill.js')

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("The date and time are currently: " + dt.myDateTime());
    //var drillConnnection = createConnection({hostname:'localhost', port:8047});
    var d = new Drill();
    d.createConnection({hostname:'localhost', port:8047});
    res.end();
}).listen(8100);
