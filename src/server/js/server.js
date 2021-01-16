var io  = require('socket.io').listen(5001);
var jsonfile = require('jsonfile');
var jsondir = require('jsondir');
var Jimp = require("jimp");
var path = require('path');
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

        socket.on('manipulateIcon', function (imgBuffer) {
            socket.emit("loadingImage", ({msg: "Processing Image"}))
            fs.readFile('src/server/configs/images.json', 'utf8', function (err, imagesJson) {
            imagesJson = JSON.parse(imagesJson)
            var bg
            var background = imgBuffer.transparentBackground || imgBuffer.useBackgroundColor || imgBuffer.backgroundImage === "transparent" ? imagesJson["rawBg"] : imgBuffer.backgroundImage
            background = background.substring(background.indexOf(",") + 1);
            Jimp.read(Buffer.from((background), 'base64'), function (err, background) {
                background.resize(1024, 1024)
                if (imgBuffer.useBackgroundColor) {
                var bgColor = Jimp.cssColorToHex(imgBuffer.backgroundColor)
                    for (var y=0; y<1024; y++) {
                        for (var x=0; x<1024; x++) {
                           background.setPixelColor(bgColor, x, y)
                        }
                    }
                }
                bg = background
                var onTopImage = imgBuffer.onTopImage === null ? imagesJson["rawBg"] : imgBuffer.onTopImage
                onTopImage = onTopImage.substring(onTopImage.indexOf(",") + 1);
                Jimp.read(Buffer.from((onTopImage), 'base64'), function (err, onTopIcon) {
                    if (err) throw err;
                    Jimp.read(Buffer.from((imagesJson["rawBg"]).replace(/^data:image\/png;base64,/, ""), 'base64'), function (err, rawBackground) {
                        rawBackground.resize(1024, 1024)
                        onTopIcon.resize(parseInt(imgBuffer.scaleAmount)/100*onTopIcon.bitmap.width + onTopIcon.bitmap.width,
                                         parseInt(imgBuffer.scaleAmount)/100*onTopIcon.bitmap.height + onTopIcon.bitmap.height)
                        var x = ( (bg.bitmap.width - onTopIcon.bitmap.width) / 2 )
                        var y = ( (bg.bitmap.width - onTopIcon.bitmap.width) / 2 )
                        rawBackground.composite(onTopIcon, x, y).shadow({ opacity: 0.8, size: 1.0, blur: 5, x: 0, y: 0 })
                        bg.composite(rawBackground, 0, 0)
                        bg.getBase64(Jimp.AUTO, (err, res) => {
                               socket.emit("iconUpdates", res)
                        })
                    })
                })
            })
            })
        })

        socket.on('iconBackgroundImage', function (imgBuffer) {
            socket.emit("iconUpdates", imgBuffer)
        })
        // Image data received from client side
        socket.on('cropIcon', function (icDetails) {
            icDetails.imgBuffer = icDetails.imgBuffer.substring(icDetails.imgBuffer.indexOf(",") + 1);
            console.log(icDetails.imgBuffer)
            var base64Data = icDetails.imgBuffer.replace(/^data:image\/png;base64,/, "");
            var datetime = new Date();
            var fileName = ("uploaded-"+datetime+".png").replace(/\s/g, '');
            fs.readFile('src/server/configs/images.json', 'utf8', function (err, imagesJson) {
                if (err) throw err;
                imagesJson = JSON.parse(imagesJson)
                icDetails.borderRadiusAmount = icDetails.borderRadiusAmount === "Disabled" || icDetails.borderRadiusAmount === "" ? "0" : icDetails.borderRadiusAmount
                Jimp.read(Buffer.from((icDetails.imgBuffer).replace(/^data:image\/png;base64,/, ""), 'base64'), function (err, appIcon) {
                    Jimp.read(Buffer.from((imagesJson[icDetails.borderRadiusAmount]).replace(/^data:image\/png;base64,/, ""), 'base64'), function (err, masker) {
                        masker.quality(100)
                        masker.resize(1024, 1024)
                        appIcon.resize(1024, 1024)

                        // Creating iOS icon launcher
                        if (icDetails.ios) {
                            appIcon.resize(1024, 1024).write(config.resourcesPath+icDetails.repo+config.pathToIosIcon)
                        }

                        // Iterating & removing pixels of appIcon based on the frame pixels
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
                        Jimp.read(Buffer.from((imagesJson.rawBg).replace(/^data:image\/png;base64,/, ""), 'base64'), function (err, transparentBg) {
                            var xxxhdpi, xxhdpi, xhdpi, mdpi, hdpi
                            xxxhdpi = xxhdpi = xhdpi = hdpi = mdpi = transparentBg

                            // Creating all Android icon launchers based on requests
                            if (icDetails.xxxhdpi) {
                                xxxhdpi.resize(192, 192)
                                appIcon.resize(152, 152)
                                xxxhdpi.composite(appIcon, 20, 20)
                                if (icDetails.dropShadow) {
                                    xxxhdpi.shadow({ opacity: 0.8, size: 1.0, blur: 5, x: 0, y: 0 })
                                }
                                xxxhdpi.write(config.resourcesPath+icDetails.repo+config.pathToXXXHdpi)
                                console.log("xxxhdpi created.")
                            }
                            if (icDetails.xxhdpi) {
                                xxhdpi.resize(144, 144)
                                appIcon.resize(114, 114)
                                xxhdpi.composite(appIcon, 15, 15)
                                if (icDetails.dropShadow) {
                                    xxhdpi.shadow({ opacity: 0.8, size: 1.0, blur: 5, x: 0, y: 0 })
                                }
                                xxhdpi.write(config.resourcesPath+icDetails.repo+config.pathToXXHdpi)
                                console.log("xxhdpi created.")
                            }
                            if (icDetails.xhdpi) {
                                xhdpi.resize(96, 96)
                                appIcon.resize(76, 76)
                                xhdpi.composite(appIcon, 10, 10)
                                if (icDetails.dropShadow) {
                                    xhdpi.shadow({ opacity: 0.8, size: 1.0, blur: 5, x: 0, y: 0 })
                                }
                                xhdpi.write(config.resourcesPath+icDetails.repo+config.pathToXHdpi)
                                console.log("xhdpi created.")
                            }
                            if (icDetails.hdpi) {
                                hdpi.resize(72, 72)
                                appIcon.resize(56, 56)
                                hdpi.composite(appIcon, 8, 8)
                                if (icDetails.dropShadow) {
                                    hdpi.shadow({ opacity: 0.5, size: 1.0, blur: 1, x: 0, y: 0 })
                                }
                                hdpi.write(config.resourcesPath+icDetails.repo+config.pathToHdpi)
                                console.log("hdpi created.")
                            }
                            if (icDetails.mdpi) {
                                mdpi.resize(48, 48)
                                appIcon.resize(38, 38)
                                mdpi.composite(appIcon, 5, 5)
                                if (icDetails.dropShadow) {
                                    mdpi.shadow({ opacity: 0.5, size: 1.0, blur: 1, x: 0, y: 0 })
                                }
                                mdpi.write(config.resourcesPath+icDetails.repo+config.pathToMdpi)
                                console.log("mdpi created.")
                            }
                            console.log('\x1b[33m%s\x1b[0m', "Completed! Icons requests processed!\n")
                            socket.emit('iconLaunchersCreated')
                        })
                    })
                })
            })
        })
        socket.on('sendForCrop', function (imgBuffer) {
            console.log(imgBuffer)
            socket.emit('imgBuffer', imgBuffer);
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
        socket.on('openThisTemplate', function (data) {
            fromDir(config.templateResourcesPath+data.repoNames,'.json', socket)
        })
        socket.on('mkdirRequest', function (data) {
            var obj = JSON.parse(data)
            socket.emit('verifyToProceed', obj)
        })
        socket.on('mkdirVerified', function (data, verify) {
            if (verify.length<9 && verify === data["-path"]){
                data["-path"] = config.resourcesPath+data["-path"]
                jsondir.json2dir(data, function(err) {
                    if (err) throw err;
                })
                socket.emit('templateCreated')
            } else {
                socket.emit('failedToCreateTemplate')
            }

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
        fs.readdir(config.templateResourcesPath, (err, files) => {
            socket.emit('templateResource', files)
        })
    });
console.log("SERVER IS UP...")
});