var path = require('path'), fs=require('fs');
var jsonfile = require('jsonfile')

// check all the keys
function checkTheType(obj, key) {
    if (key.toLowerCase().includes('color')) {
        console.log(obj.key)
    }

}
//
function getDeepKeys(obj) {
    var keys = [];
    for(var key in obj) {
    checkTheType(obj, key)
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
            })

        };
    };
};

fromDir('Cloned_Git_Repositories/Customer-X','.json');

//console.log('astringNice'.toLowerCase().includes('nice')) //true
