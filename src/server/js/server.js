var io  = require('socket.io').listen(5001)
var jsonfile = require('jsonfile')
var Jimp = require("jimp");
var path = require('path')
const fs = require('fs');
var config;
fs.readFile('src/server/configs/server-config.json', 'utf8', function (err, data) {
    if (err) throw err;
    config = JSON.parse(data);
    function log(activity){
        console.log(activity)
        if (config.production) {
            var datetime = new Date();
            if (!fs.existsSync(config.logPath)){
                fs.mkdirSync(config.logPath);
            }
            fs.appendFile(config.logPath, '-- On ' + datetime + "\n" + activity,
            function (err) {
                if (err) throw err;
            });
        }
    }

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
                log("-- File Found: " + filePath);
                io.emit('foundJson', { path : filePath, name : path.basename(filePath)});
            };
        };
    };

    io.sockets.on('connection', function(socket){
        log("CLIENT CONNECTION ESTABLISHED...\nWAITING FOR REQUESTS..." )

        // Image data received from client side
        socket.on('cropIcon', function (icDetails) {
            var base64Data = icDetails.imgBuffer.replace(/^data:image\/png;base64,/, "");
            var datetime = new Date();
            var fileName = ("uploaded-"+datetime+".png").replace(/\s/g, '');
            fs.readFile('src/server/configs/images.json', 'utf8', function (err, imagesJson) {
                if (err) throw err;
                imagesJson = JSON.parse(imagesJson)
                Jimp.read(Buffer.from((icDetails.imgBuffer).replace(/^data:image\/png;base64,/, ""), 'base64'), function (err, appIcon) {
                    Jimp.read(Buffer.from((imagesJson[icDetails.borderRadiusAmount]).replace(/^data:image\/png;base64,/, ""), 'base64'), function (err, masker) {
                        masker.quality(100)
                        masker.resize(1024, 1024)

                        // Creating iOS icon launcher
                        appIcon.resize(1024, 1024).write(config.resourcesPath+icDetails.repo+config.pathToIosIcon)
                        for (var y=0; y<1024; y++) {
                            for (var x=0; x<1024; x++) {
                               pixelColor = masker.getPixelColor(x, y)
                               if (pixelColor > 0) {
                                   appIcon.setPixelColor(0xFFFFFF00, x, y)
                               }
                            }
                        }
                        appIcon.quality(100)
                        appIcon.resize(1024, 1024)
                        Jimp.read(config.uploadedImagesPath+"raw-background.png", function (err, transparentBg) {
                            var xxxhdpi, xxhdpi, xhdpi, mdpi, hdpi
                            xxxhdpi = xxhdpi = xhdpi = hdpi = mdpi = transparentBg

                            // Creating all Android icon launchers
                            xxxhdpi.resize(192, 192)
                            appIcon.resize(152, 152)
                            xxxhdpi.composite(appIcon, 20, 20)
                            xxxhdpi.shadow({ opacity: 0.8, size: 1.0, blur: 5, x: 0, y: 0 })
                            xxxhdpi.write(config.resourcesPath+icDetails.repo+config.pathToXXXHdpi)
                            console.log("xxxhdpi created.")

                            xxhdpi.resize(144, 144)
                            appIcon.resize(114, 114)
                            xxhdpi.composite(appIcon, 15, 15)
                            xxhdpi.shadow({ opacity: 0.8, size: 1.0, blur: 5, x: 0, y: 0 })
                            xxhdpi.write(config.resourcesPath+icDetails.repo+config.pathToXXHdpi)
                            console.log("xxhdpi created.")

                            xhdpi.resize(96, 96)
                            appIcon.resize(76, 76)
                            xhdpi.composite(appIcon, 10, 10)
                            xhdpi.shadow({ opacity: 0.8, size: 1.0, blur: 5, x: 0, y: 0 })
                            xhdpi.write(config.resourcesPath+icDetails.repo+config.pathToXHdpi)
                            console.log("xhdpi created.")

                            hdpi.resize(72, 72)
                            appIcon.resize(56, 56)
                            hdpi.composite(appIcon, 8, 8)
                            hdpi.shadow({ opacity: 0.5, size: 1.0, blur: 1, x: 0, y: 0 })
                            hdpi.write(config.resourcesPath+icDetails.repo+config.pathToHdpi)
                            console.log("hdpi created.")

                            mdpi.resize(48, 48)
                            appIcon.resize(38, 38)
                            mdpi.composite(appIcon, 5, 5)
                            mdpi.shadow({ opacity: 0.5, size: 1.0, blur: 1, x: 0, y: 0 })
                            mdpi.write(config.resourcesPath+icDetails.repo+config.pathToMdpi)
                            console.log("mdpi created.")
                            console.log('\x1b[33m%s\x1b[0m', "Completed! Icons cropped & saved in related directories!\n")
                        })
                    })
                })
            })
        })
        socket.on('imgBuffer', function (imgBuffer) {
            var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0"
                + "NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO"
                + "3gAAAABJRU5ErkJggg==";
            var data = img.replace(/^data:image\/\w+;base64,/, "");
            var buf = new Buffer(data, 'base64');
            //fs.writeFile('image.png', buf);
        })
        socket.on('feedBack', function (obj) {
            if (config.production) {
                var datetime = new Date();
                fs.appendFile(config.feedbackPath, 'Feedback----------------------' + datetime + '\n' +
                                                           'Firstname:' + obj.firstname + '\n' +
                                                           'Lastname:' + obj.lastname + '\n' +
                                                           'Feedback:' + obj.feedback + '\n\n', function (err) {
                    if (err) throw err;
                    console.log('Feedback Saved!');
                    socket.emit('feedbackSaved');
                });
            } else {
                console.log("Warning! Production mode is off. Feedback received but not saved. \nIf this is production, immediately set production to true in server-config.json")
            }
        })
        socket.on('fetchConfigFile', function (obj) {
              jsonfile.readFile(obj.configPath, function(err, configData) {
                  socket.emit('configData', configData);
              })

        })
        socket.on('openThisRepo', function (data) {
              fromDir(config.resourcesPath+data.repoNames,'.json', socket)
        })

        socket.on('saveJsonFile', function(jsonTextArea) {
            console.log(typeof jsonTextArea)
            socket.on('pathToJson', function(pathToJson) {
                try {
                  fs.unlinkSync(pathToJson) //  Remove the file
                  fs.writeFileSync(pathToJson, jsonTextArea);
                } catch(err) {
                  console.error(err)
                }
            })
            socket.emit('jsonFileSaved')
        })
        fs.readdir(config.resourcesPath, (err, files) => {
            socket.emit('Repositories', files)
        })
    });
console.log("SERVER IS UP...")
});