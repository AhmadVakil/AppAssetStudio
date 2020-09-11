var http = require('http')
var io  = require('socket.io').listen(5001)
var dl  = require('delivery')
var fs  = require('fs')


//resizer.file = 'infomaker.png'

/*const USER = 'ahmad-vakil';
const PASS = 'ahmadreza7';
const REPO = 'bitbucket.org/infomaker/exjobb-branding-template';*/

const git = require('simple-git/promise');
//const remote = `https://${USER}:${PASS}@${REPO}`;

/*git().silent(true)
  .clone(remote, ('D:/Thesis/INFOMAKER/File-server/exjobb-branding-template'))
  .then(() => console.log('finished'))
  .catch((err) => console.error('failed: ', err));
*/

// Read JSON Synchrously
    console.log('Clone is finished')
    var fs = require("fs");
    console.log("\n ******************************************* \n");
    var content = fs.readFileSync("/home/user1/temp-thesis-all-related-files/temp-thesis/Thesis2/Thesis/INFOMAKER/File-server/exjobb-branding-template/Resources/Modules/epaper/configuration.json");
    console.log("Output Content : \n"+ content);
    console.log("\n ******************************************* \n");

function onRequest (request, response){
    console.log("User has requested...", request.url);
    response.writeHead(200, {"Context-Type": "text/plain"})
    response.write(content)
    response.end()
}

http.createServer(onRequest).listen(1031);
console.log("Server is up....")

io.sockets.on('connection', function(socket){
    var delivery = dl.listen(socket);
    delivery.on('receive.success',function(file){
      var params = file.params;
      fs.writeFile(file.name,file.buffer, function(err){
        
        if(err){
          console.log('Error: Icon file could not received by the server.');
        }else{
          console.log('Icon file received by the server.');
        };
      });
    });
  });
//resizer.file.url('Infomaker.png')
//var resizer = require('airesize')
//resizer._imagePath = 'Infomaker.png'
/*var nrc = require('node-run-cmd');
nrc.run('airesize Infomaker.png');
*/
/*
var imageResizer = require('../../node_modules/airesize/libs/image-resizer');
var log = require('../../node_modules/airesize/libs/log');
var inputHelper = require('../../node_modules/airesize/libs/input-helper');
var validationUtil = require('../../node_modules/airesize/libs/validation-util');


var _imagePath, _width, height;
_imagePath = 'D:\Thesis\INFOMAKER\responsive-webdir\client-server\src\js\Infomaker.png'
_width = 100
_height = 100

firstS(_imagePath)
widthS(_width)
heightS(_height)



function firstS(imagePath) {
        _imagePath = 'D:\Thesis\INFOMAKER\responsive-webdir\client-server\src\js\Infomaker.png';
  }

function widthS(width) {
        _width = 100;
       // return inputHelper.takeHeight();
  }

function heightS(height) {
       // if (validationUtil.validateWidthAndHeight(_width,height)) {
        var test = imageResizer.load(_imagePath,_width,height);
       // test.startResizing();
         //imageS(test) 
         
        //}
  }

function imageS(imageResizerObj) {
      //  imageResizerObj.startResizing();
}
    
/*
if (validationUtil.validateWidthAndHeight(_width,height)) {
    .startResizing();
    function (imageResizerObj) {
      imageResizerObj.startResizing();
  }
  //function (imageResizerObj) {
    //obj.startResizing();
//}
}
//inputHelper.getImagePath()
    /*.then(function (imagePath) {
        _imagePath = imagePath;
        return inputHelper.takeWidth();
    })*/
    /*.then(function (width) {
        _width = width;
        //return inputHelper.takeHeight();
    })*/
   /* .then(function (height) {
        
    })
    .then()
    .catch(function (err) {
       log.error(err.toString(),true);
    });*/
