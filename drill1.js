var Util = require('util')
var request = require('request')
var rp = require('request-promise')
var url = require('url')

exports.version = 'unknown';
//module.exports  = Drill;

var Client = exports.Client = function(args){
  if (!args)
    args = {};

  this.host = args.host || 'localhost';
  this.port = args.port || 8074;
  this.user = args.user || process.env.USER;
  this.ssl = args.ssl || false;

};

Client.prototype.query = function(queryString, callback) {
  var href = url.format({
    protocol: 'http:',
    hostname: 'localhost',
    pathname: '/query.json',
    port: 8047
  })
  var headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept':'application/json'
  }
  var queryOptions = {
    uri: href,
    method: 'POST',
    headers: headers,
    json: {"queryType": "SQL", "query": queryString}
  }

  //from presto
  request(queryOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('victory')
      callback(null, body);
    }
    /*if (error || code !== 200) {
      var message = "query info api returns error" + (data && data.length > 0 ? ":" + data : "");
      callback({message: message, error: error, code: code});
      return;
    }
    callback(null, data);*/
  });
};

/*
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

Client.prototype.query = function(query_id, callback) {
  this.request({ method: 'POST', path: '/query.json' }, function(error, code, data){
    if (error || code !== 200) {
      var message = "query info api returns error" + (data && data.length > 0 ? ":" + data : "");
      callback({message: message, error: error, code: code});
      return;
    }
    callback(null, data);
  });
};


Drill.prototype.getHostname = function() {
  return this.hostname;
};

Drill.prototype.connect = function() {
  return true;
}


/*
Drill.prototype.query = function(query) {
  console.log("Executing: " + query)

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

  var queryOptions = {
    uri: href,
    method: 'POST',
    headers: headers,
    json: {"queryType": "SQL", "query": query}
  }

  request(queryOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var result = body;
        this.queryResult = body.rows;
        this.columns = body.columns;
        console.log(body.columns);
        return body.rows

    } else {
      console.log( "URL: " + href + "\n" + response.statusCode + "\n" + body)
      return false
    }
  })
}
  /*promiseResult = rp(queryOptions).then( function(parsedBody){
    console.log("Query")
    return parsedBody
  }).catch(function(err){
      //POST Failed
  });
  return result;
}
*/
