var Util = require('util')
var request = require('request')
var rp = require('request-promise')
var url = require('url')
var Drill = function () {};

module.exports  = Drill;

Drill.prototype.createConnection = function(options) {
  this.hostname = options.hostname;
  this.port = options.port;
  this.ssl = options.ssl;

  if(this.ssl) {
    this.fullHost = "https://" + this.hostname + ":" + this.port;
  } else {
    this.fullHost = "http://" + this.hostname + ":" + this.port;
  }
  return this;
};


Drill.prototype.getHostname = function() {
  return this.hostname;
};


Drill.prototype.query = function() {
  var result = "";
  var headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept':'application/json'
  }
  var href = url.format({
      protocol: 'http:',
      hostname: 'localhost',
      pathname: '/query.json',
      port: 8047
    });

  //var query = encodeURIComponent("SELECT * FROM cp.`employee.json` LIMIT 20")
  var queryOptions = {
    uri: href,
    method: 'POST',
    headers: headers,
    json: {"queryType": "SQL", "query": "SELECT * FROM cp.`employee.json` LIMIT 5"}
  }
  /*request(queryOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var result = body;
        this.queryResult = body.rows;
        this.columns = body.columns;
        console.log(body.columns);
    } else {
      console.log( "URL: " + href + "\n" + response.statusCode + "\n" + body)
    }
  })
  return false;
}*/
  result = rp(queryOptions).then( function(parsedBody){
    console.log(parsedBody.rows)
    result = parsedBody
  }).catch(function(err){
      //POST Failed
  });
}
