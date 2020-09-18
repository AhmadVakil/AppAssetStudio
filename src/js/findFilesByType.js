var path = require('path'), fs=require('fs');
var jsonfile = require('jsonfile')

// check all the keys
function checkTheType(obj, key) {
  /*if (key.toLowerCase().includes('color')) {
          //console.log(obj.key)
  }*/
var RegExp = /^#[0-9A-F]{6}$/i;

//isHexColor = hex => typeof hex === 'string' && hex.length === 6 && !isNaN(Number('0x' + hex))

if (isHexColor(obj[key]) || RegExp.test(obj[key])) {
        // Create color elements here
        console.log(key+" ====>> "+obj[key] + "  Color")
} else if (typeof obj[key] === "number"){
        // Create number elements here
        console.log(key+" ====>> "+obj[key] + "  Number")
} else if (typeof obj[key] === "boolean"){
        // Create boolean elements here
        console.log(key+" ====>> "+obj[key] + "  Boolean")
} else if (typeof obj[key] === "string"){
        // Create text field here
        console.log(key+" ====>> "+obj[key] + "  String")
}

}
//
function getDeepKeys(obj) {
    var keys = [];
    for(var key in obj) {
    checkTheType(obj, key)
    //var attr = JSON.parse(key)


    //console.log(key) print all keys
        keys.push(key);
        if(typeof obj[key] === "object") {
            var subkeys = getDeepKeys(obj[key]);
            keys = keys.concat(subkeys.map(function(subkey) {
                return key + "." + subkey;
            }));
        }
    }

    return keys;
}

function fromDir(startPath,filter){

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            console.log('-- found: ',filename);
            jsonfile.readFile(filename+"", function(err, jsonFile) {
                   getDeepKeys(jsonFile)
                  // console.log('json-files=====>>> ')
            })

        };
    };
};

//fromDir('Cloned_Git_Repositories/My-news-app','.json');

//console.log('astringNice'.toLowerCase().includes('nice')) //true

// regular function

function isHexColor (hex) {
  return typeof hex === 'string'
      && hex.length === 6
      && !isNaN(Number('0x' + hex))
}

console.log(isHexColor('ffffff'))
// or as arrow function (ES6+)
