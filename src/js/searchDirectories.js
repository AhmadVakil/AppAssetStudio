var fs = require('fs');
var path = require('path');
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {

            results = results.concat(res);
            console.log("===>"+path.extname(JSON.stringify(results)))
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

//console.log(path.extname('c:\home\index.jpg'))



walk(process.env.HOME, function(err, results) {
  if (err) throw err;
  //var path = require('path')
  //console.log(results);
});