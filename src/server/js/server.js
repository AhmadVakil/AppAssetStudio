var io  = require('socket.io').listen(5001);
var jsonfile = require('jsonfile');
var Jimp = require("jimp");
var path = require('path');
const fs = require('fs');
var config;
fs.readFile('src/server/configs/server-config.json', 'utf8', function (err, data) {
  if (err) throw err;
  config = JSON.parse(data);
  function log(activity){
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

  function fromDir(startPath,filter, socket) {
      var start = new Date().getTime();

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
    fs.readFile('src/server/configs/images.json', 'utf8', function (err, imagesJson) {
      imagesJson = JSON.parse(imagesJson)
      socket.on('manipulateIcon', function (imgBuffer) {
        var start = new Date().getTime();
        socket.emit("loadingImage", ({msg: "Processing Image"}))
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
                var elapsed = new Date().getTime() - start;
                console.log('\x1b[33m%s\x1b[0m', "Icon launcher created automatically from scratch")
                console.log('\x1b[33m%s\x1b[0m', "Time taken: \n"+elapsed+" milliseconds")
                socket.emit("iconUpdates", res)
              })
            })
          })
        })
      })
      socket.on('inAppIconUpdateView', function (data) {
        var start = new Date().getTime();
        socket.emit("loadingImage", ({msg: "Processing Image"}))
        var background = imagesJson["rawBg"]
        background = background.substring(background.indexOf(",") + 1);
        Jimp.read(Buffer.from((background), 'base64'), function (err, background) {
          var hexString = data.inAppIconOpacity.toString()
          switch (hexString) {
            case "10":
              hexString = "A";
              break;
            case "11":
              hexString = "B";
              break;
            case "12":
              hexString = "C";
              break;
            case "13":
              hexString = "D";
              break;
            case "14":
              hexString = "E";
              break;
            case "15":
              hexString = "F";
              break;
          }
          var bgColor = Jimp.cssColorToHex(data.inAppIconBgColor+hexString+hexString)
          for (var y=0; y<1024; y++) {
            for (var x=0; x<1024; x++) {
              background.setPixelColor(bgColor, x, y)
            }
          }
          background.resize(parseInt(data.inAppIconWidth), parseInt(data.inAppIconHeight))
          Jimp.read(Buffer.from((imagesJson[data.inAppIconBorderRadius]).replace(/^data:image\/png;base64,/, ""), 'base64'), function (err, masker) {
            masker.quality(100)
            masker.resize(parseInt(data.inAppIconWidth), parseInt(data.inAppIconHeight))

            // Iterating & removing pixels of appIcon based on the frame pixels
            for (var y=0; y<parseInt(data.inAppIconHeight); y++) {
              for (var x=0; x<parseInt(data.inAppIconWidth); x++) {
                pixelColor = masker.getPixelColor(x, y)
                if (pixelColor > 0) {
                  background.setPixelColor(0xFFFFFF00, x, y)
                }
              }
            }
            bg = background
            var onTopImage = data.inAppIconOnTopIcon === null ? imagesJson["rawBg"] : data.inAppIconOnTopIcon
            onTopImage = onTopImage.substring(onTopImage.indexOf(",") + 1);
            Jimp.read(Buffer.from((onTopImage), 'base64'), function (err, onTopIcon) {
              if (err) throw err;
              Jimp.read(Buffer.from((imagesJson["rawBg"]).replace(/^data:image\/png;base64,/, ""), 'base64'), function (err, rawBackground) {
                var onTopHexString = data.inAppIconOnTopOpacity.toString()
                switch (onTopHexString) {
                  case "10":
                    onTopHexString = "A";
                    break;
                  case "11":
                    onTopHexString = "B";
                    break;
                  case "12":
                    onTopHexString = "C";
                    break;
                  case "13":
                    onTopHexString = "D";
                    break;
                  case "14":
                    onTopHexString = "E";
                    break;
                  case "15":
                    onTopHexString = "F";
                    break;
                }
                rawBackground.resize(parseInt(data.inAppIconWidth), parseInt(data.inAppIconHeight))
                onTopIcon.resize(parseInt(data.inAppIconOnTopIconScale)/100*onTopIcon.bitmap.width + onTopIcon.bitmap.width,
                                 parseInt(data.inAppIconOnTopIconScale)/100*onTopIcon.bitmap.height + onTopIcon.bitmap.height)
                var x = ( (bg.bitmap.width - onTopIcon.bitmap.width) / 2 )
                var y = ( (bg.bitmap.width - onTopIcon.bitmap.width) / 2 )
                var onTopIconColor = Jimp.cssColorToHex(data.inAppIconOnTopColor+onTopHexString+onTopHexString)
                for (var y=0; y<1024; y++) {
                  for (var x=0; x<1024; x++) {
                  pixelColor = onTopIcon.getPixelColor(x, y)
                    if (pixelColor > 0) {
                      onTopIcon.setPixelColor(onTopIconColor, x, y)
                    }
                  }
                }
                rawBackground.composite(onTopIcon, parseInt(data.inAppIconOnTopIconX), parseInt(data.inAppIconOnTopIconY))//.shadow({ opacity: 0.8, size: 1.0, blur: 5, x: 0, y: 0 })
                bg.composite(rawBackground, 0, 0)
                bg.getBase64(Jimp.AUTO, (err, result) => {
                  var elapsed = new Date().getTime() - start;
                  console.log('\x1b[33m%s\x1b[0m', "App buttons, notification icon, \nor toggle button created automatically.")
                  console.log('\x1b[33m%s\x1b[0m', "Time taken: \n"+elapsed+" milliseconds")
                  socket.emit("inAppIconUpdated", {
                    result : result
                  })
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
        var start = new Date().getTime();
        icDetails.imgBuffer = icDetails.imgBuffer.substring(icDetails.imgBuffer.indexOf(",") + 1);
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
                  console.log('\x1b[34m%s\x1b[0m', "xxxhdpi created.")
                }
                if (icDetails.xxhdpi) {
                  xxhdpi.resize(144, 144)
                  appIcon.resize(114, 114)
                  xxhdpi.composite(appIcon, 15, 15)
                  if (icDetails.dropShadow) {
                    xxhdpi.shadow({ opacity: 0.8, size: 1.0, blur: 5, x: 0, y: 0 })
                  }
                  xxhdpi.write(config.resourcesPath+icDetails.repo+config.pathToXXHdpi)
                  console.log('\x1b[34m%s\x1b[0m', "xxhdpi created.")
                }
                if (icDetails.xhdpi) {
                  xhdpi.resize(96, 96)
                  appIcon.resize(76, 76)
                  xhdpi.composite(appIcon, 10, 10)
                  if (icDetails.dropShadow) {
                    xhdpi.shadow({ opacity: 0.8, size: 1.0, blur: 5, x: 0, y: 0 })
                  }
                  xhdpi.write(config.resourcesPath+icDetails.repo+config.pathToXHdpi)
                  console.log('\x1b[34m%s\x1b[0m', "xhdpi created.")
                }
                if (icDetails.hdpi) {
                  hdpi.resize(72, 72)
                  appIcon.resize(56, 56)
                  hdpi.composite(appIcon, 8, 8)
                  if (icDetails.dropShadow) {
                    hdpi.shadow({ opacity: 0.5, size: 1.0, blur: 1, x: 0, y: 0 })
                  }
                  hdpi.write(config.resourcesPath+icDetails.repo+config.pathToHdpi)
                  console.log('\x1b[34m%s\x1b[0m', "hdpi created.")
                }
                if (icDetails.mdpi) {
                  mdpi.resize(48, 48)
                  appIcon.resize(38, 38)
                  mdpi.composite(appIcon, 5, 5)
                  if (icDetails.dropShadow) {
                    mdpi.shadow({ opacity: 0.5, size: 1.0, blur: 1, x: 0, y: 0 })
                  }
                  mdpi.write(config.resourcesPath+icDetails.repo+config.pathToMdpi)
                  console.log('\x1b[34m%s\x1b[0m', "mdpi created.")
                }
                var elapsed = new Date().getTime() - start;
                console.log('\x1b[31m%s\x1b[0m', "Icons rounded, shadows added and changes pushed to its Git repository.")
                console.log('\x1b[33m%s\x1b[0m', "Time taken: \n"+elapsed+" milliseconds")
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
          fs.appendFile(config.feedbackPath, 'Feedback----------------------' + datetime + '\n' + 'Firstname:' + obj.firstname + '\n' + 'Lastname:' + obj.lastname + '\n' + 'Feedback:' + obj.feedback + '\n\n', function (err) {
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
        var start = new Date().getTime();
        ;(function(next) {
        	fromDir(config.resourcesPath+data.repoNames,'.json', socket)
          next()
        }(function() {
        	var elapsed = new Date().getTime() - start;
          console.log('\x1b[31m%s\x1b[0m', "All configuration files fetched and send to the end-user.")
          console.log('\x1b[33m%s\x1b[0m', "Time taken: \n"+elapsed+" milliseconds")
        }))


      })
      socket.on('openThisTemplate', function (data) {
        fromDir(config.templateResourcesPath+data.repoNames,'.json', socket)
      })
      socket.on('mkdirRequest', function (data) {
        var obj = JSON.parse(data)
        socket.emit('verifyToProceed', obj)
      })
      socket.on('mkdirVerified', function (data, verify) {
        var start = new Date().getTime();
        var timeNotificationText = ""
        if (verify.length<15 && verify === data["-path"]){
          if (config.linuxOS) {
            const shell = require('shelljs')
            var jsondir = require('jsondir');
            if (config.initialGitRepo) {
              shell.exec('bash src/server/autoGitMakeRepo.sh '+data["-path"])
              timeNotificationText = "Git repository created, cloned including directory structure and required files "
            } else {
              socket.emit("gitFunctionalityDisabled", {msg: "Git functionality is disabled. It means only the directory structure is created and not the Git repository."})
              timeNotificationText = "Directory structure created just locally without the remote Git repository."
            }
            data["-path"] = config.resourcesPath+data["-path"]
            jsondir.json2dir(data, function(err) {
              if (err) throw err;
            })
          } else {
            socket.emit("linuxOsDisabled", {msg: "Linux OS is not set to true."})
          }
          var elapsed = new Date().getTime() - start;
          console.log('\x1b[33m%s\x1b[0m', timeNotificationText)
          console.log('\x1b[33m%s\x1b[0m', "Time taken: \n"+elapsed+" milliseconds")
          socket.emit('templateCreated')
        } else {
            socket.emit('failedToCreateTemplate')
        }
      })
      socket.on('saveJsonFile', function(jsonTextArea) {
        var start = new Date().getTime();
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
        console.log('\x1b[33m%s\x1b[0m', "JSON configuration saved.")
        console.log('\x1b[33m%s\x1b[0m', "Time taken: \n"+elapsed+" milliseconds")
      })
      fs.readdir(config.resourcesPath, (err, files) => {
        socket.emit('Repositories', files)
      })
      fs.readdir(config.templateResourcesPath, (err, files) => {
        socket.emit('templateResource', files)
      })
    })
  });
  console.log("SERVER IS UP...")
});