var http = require('http');
var host = "localhost";
var port = 8047;
//var Events = require('events');

var Drill = function() {};
exports.Drill = new Drill();

Drill.prototype.createConnection = function(options) {
  this.hostname = options.hostname;
  this.port = options.port;
  console.log(this.hostname + " " + this.port);

}

isActive = function() {

}

module.exports = Drill;


/*
function createConnection(options) {
  Events.EventEmitter.call(this);
  this.hostname = options.hostname;
  this.port = options.port;
  this.state = 'disconnected';
}

function isActive() {
  var options = {
    host: this.hostname,
    port: this.port,
    path: '/'
  };

  var req = http.request(options, function(res) {
      console.log(JSON.stringify(res.headers));
    }
  );
  req.end();
}

/*exports.isActive = function(){
  var options = {
    host = this.host,
    port = this.port,
    path = "/"
  };

  http.head(options, function(resp){
    resp.on('data', function(chunk){
      return true;
    });
  }).on("error", function(e){
    console.log( "Error: " + e.messsage);
    return false
  });
}*/
