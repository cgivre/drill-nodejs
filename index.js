/*
Copyright 2017 Charles S. Givre

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var Util = require('util')
var request = require('request')
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

  if(this.ssl) {
    this.protocol = "https";
  } else {
    this.protocol = "http";
  }

};

Client.prototype.execute = function(queryString, callback) {
  var href = url.format({
    protocol: this.protocol,
    hostname: this.host,
    pathname: '/query.json',
    port: this.port
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
  request(queryOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('victory')
      callback(null, body);
    } //TODO Add error handling
  });
};

Client.prototype.getSchemata = function() {
  //query('SHOW DATABASES')
}


Client.prototype.query = function(queryString, callback) {
  var href = url.format({
    protocol: this.protocol,
    hostname: 'localhost',
    pathname: '/query.json',
    port: this.port
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
  request(queryOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, body);
    } //TODO Add error handling
  });
};

Client.prototype.query = function(queryString, callback) {
  var href = url.format({
    protocol: this.protocol,
    hostname: this.host,
    pathname: '/query.json',
    port: this.port
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
  request(queryOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, body);
    } //TODO Add error handling
  });
};

Client.prototype.plan = function(queryString, callback) {
  var href = url.format({
    protocol: this.protocol,
    hostname: this.host,
    pathname: '/query.json',
    port: this.port
  })
  var headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept':'application/json'
  }
  var queryOptions = {
    uri: href,
    method: 'POST',
    headers: headers,
    json: {"queryType": "SQL", "query": "EXPLAIN PLAN FOR " + queryString}
  }
  request(queryOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, body);
    } //TODO Add error handling
  });
};

Client.prototype.metrics = function( callback ){
  var href = url.format({
    protocol: this.protocol,
    hostname: this.host,
    pathname: '/status/metrics',
    port: this.port
  })

  var queryOptions = {
    uri: href
  }

  request(queryOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, response, body);
    }
  });
}

Client.prototype.storage = function( callback ){
  var href = url.format({
    protocol: this.protocol,
    hostname: this.host,
    pathname: '/storage.json',
    port: this.port
  })

  var queryOptions = {
    uri: href
  }

  request(queryOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, response, body);
    }
  });
}

Client.prototype.threads = function( callback ){
  var href = url.format({
    protocol: this.protocol,
    hostname: this.host,
    pathname: '/status/threads',
    port: this.port
  })

  var queryOptions = {
    uri: href
  }

  request(queryOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, response, body);
    }
  });
}

Client.prototype.options = function( callback ){
  var href = url.format({
    protocol: this.protocol,
    hostname: this.host,
    pathname: '/options.json',
    port: this.port
  })

  var queryOptions = {
    uri: href
  }

  request(queryOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, response, body);
    }
  });
}

Client.prototype.storage_detail = function( pluginName, callback ){
  var href = url.format({
    protocol: this.protocol,
    hostname: this.host,
    pathname: '/storage/' + pluginName + '.json',
    port: this.port
  })

  var queryOptions = {
    uri: href
  }

  request(queryOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, response, body);
    }
  });
}

Client.prototype.storage_enable = function( pluginName, value, callback ){
  value = value.toLowerCase();
  if( value != "true" && value != "false" ){
    callback(new Error( "the Value must be either true or false"));
  } else {
    var href = url.format({
      protocol: this.protocol,
      hostname: this.host,
      pathname: '/storage/' + pluginName + '/enable/' + value,
      port: this.port
    })

    var queryOptions = {
      uri: href
    }

    request(queryOptions, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(null, response, body);
      }
    });
  }
}

Client.prototype.storage_update = function(plugin_name, config, callback) {
  var href = url.format({
    protocol: this.protocol,
    hostname: 'localhost',
    pathname: '/storage/' + plugin_name + '.json',
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
    json: config
  }
  request(queryOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('victory')
      callback(null, body);
    }
  });
};

Client.prototype.profiles = function( callback ){
  var href = url.format({
    protocol: this.protocol,
    hostname: this.host,
    pathname: '/profiles.json',
    port: this.port
  })

  var queryOptions = {
    uri: href
  }
  request(queryOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, response, body);
    }
  });
}

Client.prototype.profile = function( queryID, callback ){
  var href = url.format({
    protocol: this.protocol,
    hostname: this.host,
    pathname: '/profiles/' + queryID + '.json',
    port: this.port
  })

  var queryOptions = {
    uri: href
  }
  request(queryOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, response, body);
    }
  });
}

Client.prototype.profile_cancel = function( queryID, callback ){
  var href = url.format({
    protocol: this.protocol,
    hostname: this.host,
    pathname: '/profiles/cancel/' + queryID + '.json',
    port: this.port
  })

  var queryOptions = {
    uri: href
  }
  request(queryOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, response, body);
    }
  });
}

Client.prototype.cluster = function( callback ){
  var href = url.format({
    protocol: this.protocol,
    hostname: this.host,
    pathname: '/cluster.json',
    port: this.port
  })

  var queryOptions = {
    uri: href
  }

  request(queryOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, response, body);
    }
  });
}
