var jsondir = require("jsondir");
var data = {
               "-path": "../storage/resources/template",
               "config.json": {
                   "-content": "abcde"
               },
               "project.json": {
                   "-content": "abcde"
               },
               "Resources": {
                   "App Icon": {
                       "Android": {
                           "res": {
                               "mipmap-hdpi": {
                                   "-type": "d"
                               },
                               "mipmap-mdpi": {
                                   "-type": "d"
                               },
                               "mipmap-xhdpi": {
                                   "-type": "d"
                               },
                               "mipmap-xxhdpi": {
                                   "-type": "d"
                               },
                               "mipmap-xxxhdpi": {
                                   "-type": "d"
                               }
                           }
                       },
                       "ios": {
                           "config.json": {
                              "-content": "abcde"
                           }
                       }
                   }
               }
           }
console.log(typeof data)

jsondir.json2dir(data, function(err) {
    if (err) throw err;
});
