var Jimp = require("jimp");
var jsonfile = require('jsonfile')
var path = require('path')
var jsonfile = require('jsonfile')

//var http = require('http')
var io  = require('socket.io').listen(5001)
var dl  = require('delivery')
const editJsonFile = require("edit-json-file");
//const sharp = require('sharp');
//var lenna1 = Jimp.read("inputImages/close_overview_handle.png")
var globalCloseHandle_Small
var globalCloseHandle_Medium
var globalCloseHandle_Larg
var mainBackgroundImage
var receivedColor
var TargetRepoName

var express = require("express");
var myParser = require("body-parser");
var app = express();

var globalMasker
var globalAppIcon
var globalShadow

const testFolder = './Cloned_Git_Repositories/';
const fs = require('fs');

// Change depending on this Json file
var Json_Configurator = 'config_changer.json'
var Shared_Global_Configuration_Path
jsonfile.readFile(Json_Configurator, function(err, obj) {

    // Path for global config
    Shared_Global_Configuration_Path = obj.path

    // Edit global config
    let file = editJsonFile(Shared_Global_Configuration_Path);

    // Set a couple of fields
    // obj.fields[2].jsonKeyPath is 'primaryColor'
    file.set(obj.fields[0].jsonKeyPath, "true");

    // Save the data to the disk
    file.save();

})



var gm = require('gm')
var pixelColor
var appIconName
var text
/*
io.sockets.on('connection', function (socket){

})

*/

function fromDir(startPath,filter, socket){

        if (!fs.existsSync(startPath)){
            console.log("no dir ",startPath);
            return;
        }

        var files=fs.readdirSync(startPath);
        for(var i=0;i<files.length;i++){
            var filePath=path.join(startPath,files[i]);
            var stat = fs.lstatSync(filePath);
            if (stat.isDirectory()){
                fromDir(filePath,filter); //recurse
            } else if (filePath.indexOf(filter)>=0) {
                console.log('-- found: ',filePath);

                io.emit('foundJson', { path : filePath, name : path.basename(filePath)});
                //console.log(filePath)
                /*jsonfile.readFile(filePath, function(err, jsonFile) {
                console.log("************************************ sent!")
                       jsonFile["filePath"] = filePath
                       jsonFile["fileName"] = path.basename(filePath)
                       //console.log(jsonFile.filePath)
                       //console.log(jsonFile.fileName)
                       io.emit('CurrentConfigs', jsonFile);
                       //getDeepKeys(jsonFile)
                })*/

            };
        };
};

io.sockets.on('connection', function(socket){


    /*jsonfile.readFile(Json_Configurator+"", function(err, obj) {
        socket.emit('configChanger', obj);
    })*/



    socket.on('openThisRepo', function (data) {
                //fromDir = new fromDir(socket)
                fromDir('Cloned_Git_Repositories/'+data.repoNames,'.json', socket)
                //console.log(data.repoNames);
                /*jsonfile.readFile('Cloned_Git_Repositories/'+data.repoNames+'/Resources/Modules/shared/configuration/global_config.json'+"", function(err, obj) {
                          socket.emit('CurrentConfigs', obj);
                })*/

     })
    var delivery = dl.listen(socket);
    //let sharedConfigJson = fs.readFileSync('Cloned_Git_Repositories/Customer-X/Resources/Modules/shared/configuration/global_config.json');



    fs.readdir(testFolder, (err, files) => {
        socket.emit('Repositories', files)
      })

      /*jsonfile.readFile('Cloned_Git_Repositories/Customer-X/Resources/Modules/shared/configuration/global_config.json'+"", function(err, obj) {
          socket.emit('CurrentConfigs', obj);
      })*/



    delivery.on('receive.success',function(file){
      var params = file.params;
      appIconName = file.name
      //console.log(appIconName)
      fs.writeFile(file.name,file.buffer, function(err){
        console.log(file.name)
        console.log(file.params)
        if(err){
          console.log('Error: Icon file could not received by the server.');
        }else{
          console.log('Icon file received by the server.');
          changeAppIcon()
        };
      });
    });
  });





var port = 8000;
var http = require("http");
var server = http.createServer();
server.on('request', request);
server.listen(port);
console.log('RUNNING SERVER.....');
console.log('SERVER IS ON NOW....... :)');
function request(request, response) {
    var store = '';
    var object



    request.on('data', function(data)
    {

        store += data
        object = JSON.parse(store)
        console.log('Data Received!! We Proccess it now!')
    });
    request.on('end', function()
    {
        receivedColor = parseInt(object.colorShortHex)
        TargetRepoName = object.targetRepo
        console.log(TargetRepoName)
        transparentIconCreator()
        /*console.log(receivedColor);
        console.log(object.color)
        console.log(object.colorNoHashTag)*/
        transparentIconCreator()

        var noTag = object.colorNoHashTag
        var moduleBackgroundColor = object.moduleBackgroundColor
        var primaryColorDark = object.primaryColorDark
        var secondaryColor = object.secondaryColor
        var accentColor = object.accentColor
        var textColor = object.textColor
        transparentIconCreator()


function transparentIconCreator(){
//Create the background color with HEX code
Jimp.read("inputImages/yellow.png", function (err, mainBackground) {
    if (err) throw err;
    for (var i= 0 ; i< 800 ; i++){
        for(var j=0 ; j< 800 ; j++){
        mainBackground.setPixelColor(receivedColor, i ,j)
        }

    }
    a()
    function a(){
        mainBackground.write("inputImages/yellow.png");
    }
});


// Opening Close Handle PNG
Jimp.read("inputImages/close_overview_handle.png", function (err, small_handle) {
    if (err) throw err;
    small_handle.quality(100)
    small_handle.resize(73, 39)

    globalCloseHandle_Small = small_handle
});

Jimp.read("inputImages/close_overview_handle.png", function (err, medium_handle) {
    if (err) throw err;
    medium_handle.quality(100)
    medium_handle.resize(146, 78)

    globalCloseHandle_Medium = medium_handle
});

Jimp.read("inputImages/close_overview_handle.png", function (err, larg_handle) {
    if (err) throw err;
    larg_handle.quality(100)
    larg_handle.resize(272, 136)

    globalCloseHandle_Larg = larg_handle
});


// Mixing close handles with transparents backgrounds
Jimp.read("inputImages/yellow.png", function (err, transparentCloseIcon_Small) {
    if (err) throw err;
    transparentCloseIcon_Small.resize(88, 44)
         .quality(100)            // resize
         .opacity(0.5)
         .composite( globalCloseHandle_Small, 8, 3 )

         //iOS
         .write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/Modules/epaper/ios/close_overview_handle.png")

         //Android
         .write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/Modules/epaper/android/resources/icons/close_overview_handle.png")

         .flip(false, true)

         //iOS
         .write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/Modules/epaper/ios/issue_overview_handle.png")

         //Android
         .write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/Modules/epaper/android/resources/icons/issue_overview_handle.png");

});

Jimp.read("inputImages/yellow.png", function (err, transparentCloseIcon_Medium) {
    if (err) throw err;
    transparentCloseIcon_Medium.resize(176, 88)
         .quality(100)
         .opacity(0.5)          // resize
         .composite(globalCloseHandle_Medium, 16, 6)

         //iOS
         .write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/Modules/epaper/ios/close_overview_handle@2x.png")

         //Android
         .write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/Modules/epaper/android/resources/icons/close_overview_handle@2x.png")

         .flip(false, true)

         //iOS
         .write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/Modules/epaper/ios/issue_overview_handle@2x.png")

         //Android
         .write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/Modules/epaper/android/resources/icons/issue_overview_handle@2x.png");


});

Jimp.read("inputImages/yellow.png", function (err, transparentCloseIcon_Larg) {
    if (err) throw err;
    transparentCloseIcon_Larg.resize(264, 132)
         .quality(100)
         .opacity(0.5)          // resize
         .composite(globalCloseHandle_Larg, 0, 0)

         //iOS
         .write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/Modules/epaper/ios/close_overview_handle@3x.png")

         //Android
         .write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/Modules/epaper/android/resources/icons/close_overview_handle@3x.png")

         .flip(false, true)

         //iOS
         .write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/Modules/epaper/ios/issue_overview_handle@3x.png")

         //Android
         .write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/Modules/epaper/android/resources/icons/issue_overview_handle@3x.png");

});
}

let file = editJsonFile(`Cloned_Git_Repositories/`+TargetRepoName+`/Resources/Modules/shared/configuration/global_config.json`);

// Set a couple of fields
file.set("primaryColor", noTag);
file.set("moduleBackgroundColor", moduleBackgroundColor)
file.set("primaryColorDark",primaryColorDark)
file.set("secondaryColor",secondaryColor)
file.set("accentColor",accentColor)
file.set("textColor",textColor)

// Save the data to the disk
file.save();

// Reload it from the disk
file = editJsonFile(`jsOutput/gc.json`, {
    autosave: true
});
/*********************************************************************************************************************************************** */
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.end(store)




});
}

function changeAppIcon(){
 Jimp.read(appIconName, function (err, appIcon) {
    if (err) throw err;

    // Roman_Square_1.png
    // infomaker.png
    //Infomaker_Transparent_Text.png
    Jimp.read("Image_Trimers/Roman_Square_1.png", function (err, masker) {
        if (err) throw err;
        masker.quality(100)
        masker.resize(1024, 1024)
        //masker.flip(false,true)
        //globalMasker = masker
    // IOS Icon
    appIcon.resize(1024, 1024)
    appIcon.write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/App Icon/ios/Icon.png")

    appIcon.resize(1024, 1024)
    for (var y=0; y<1024; y++){
        for (var x=0; x<1024; x++){

           pixelColor = masker.getPixelColor(x, y)
           if (pixelColor > 0){
            appIcon.setPixelColor(0xFFFFFF00, x, y)
           }
        }
    }

    appIcon.quality(100)

    //Roman_Square_Shadow_Border.png
    //No_Shadow.png
    Jimp.read("Image_Shadows/Roman_Square_Shadow_Border.png", function (err, shadow) {
        if (err) throw err;
        shadow.quality(100)
        shadow.resize(1024, 1024)
        shadow.composite(appIcon, 0, 0)

        // Just Testing
        shadow.resize(1024 , 1024)
        shadow.write("Cloned_Git_Repositories/"+TargetRepoName+"/test.png")


        // Android mipmap-xxxhdpi
        shadow.resize(192 , 192)
        shadow.write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/App Icon/android/res/mipmap-xxxhdpi/ic_launcher.png")

        // Android mipmap-xxhdpi
        shadow.resize(144 , 144)
        shadow.write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/App Icon/android/res/mipmap-xxhdpi/ic_launcher.png")

        // Android mipmap-xhdpi
        shadow.resize(96 , 96)
        shadow.write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/App Icon/android/res/mipmap-xhdpi/ic_launcher.png")

        // Android mipmap-hdpi
        shadow.resize(72 , 72)
        shadow.write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/App Icon/android/res/mipmap-hdpi/ic_launcher.png")

        // Android mipmap-mdpi
        shadow.resize(48 , 48)
        shadow.write("Cloned_Git_Repositories/"+TargetRepoName+"/Resources/App Icon/android/res/mipmap-mdpi/ic_launcher.png")

    })
    //
})

})
}

