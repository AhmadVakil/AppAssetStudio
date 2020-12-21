var Jimp = require("jimp");
var readline = require('readline');
const fs = require('fs');
const path = require('path');

var TargetRepoName = "dummy-app"
var iconBackgroundColor = 0x104499
var addIconOnTop = true
var onTopIconScaleAmount = 0
var crop = true
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


console.log('\x1b[33m%s\x1b[0m',`
██████╗ ███████╗███████╗██╗ ██████╗ ██████╗ ███╗   ██╗███████╗
██╔══██╗██╔════╝██╔════╝██║██╔════╝██╔═══██╗████╗  ██║██╔════╝
██████╔╝█████╗  ███████╗██║██║     ██║   ██║██╔██╗ ██║███████╗
██╔══██╗██╔══╝  ╚════██║██║██║     ██║   ██║██║╚██╗██║╚════██║
██║  ██║███████╗███████║██║╚██████╗╚██████╔╝██║ ╚████║███████║
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
Author: Ahmadreza Vakil`)

console.log(`This NodeJS CLI helps you create icon launchers for your mobile applications through the commandline very fast & easy!

You have two options:
- If your icon is ready and you want to crop it then you can crop your icon with already defined frames.
OR
- Choose a background color, put your icon on top of it and then crop it.

*** This requires nothing, you can create ic launchers easy and fast.
Answer the following questions properly to get your icons.
`)
fs.readFile('../configs/cli-config.json', 'utf8', function (err, data) {
    if (err) throw err;
    config = JSON.parse(data);
    function listFiles() {
        const directoryPath = path.join(__dirname, config.imagesPath);
        var ls = ""
        fs.readdir(directoryPath, function (err, files) {
            if (err) {
                return console.log('Unable to read the directory: ' + err);
            }
            files.forEach(function (file) {
                if (path.extname(file)===".png" || path.extname(file)===".jpg") {
                    ls += file + "  "
                }
            });
            console.log('\x1b[33m%s\x1b[0m', ls)
        });
    }

    var mainQuestion = function() {
        rl.question("\nSelect by typing 1 or 2:\n1- Crop an icon\n2- Create an icon\n", function(answer) {
            if (answer === "1") {
                var cropQuestionOne = function() {
                    listFiles()
                    rl.question("Choose from following images in ../storage/images/ directory:\n(Original image stays untouched)\nChange this in cli-config.json\n", function(answer) {
                        try {
                            if (fs.existsSync(config.imagesPath+answer)) {
                                Jimp.read(config.imagesPath+answer, function (err, appIcon) {
                                    var cropRadius = rl.question("\nEnter border radius (range: 0 - 10 where 0 equals none and 10 equals circle):\n", function(answer) {
                                        if (Number.isInteger(parseInt(answer))){
                                            switch (parseInt(answer)) {
                                              case 0:
                                                answer = 50;
                                                break;
                                              case 1:
                                                answer = 100;
                                                break;
                                              case 2:
                                                answer = 150;
                                                break;
                                              case 3:
                                                answer = 200;
                                                break;
                                              case 4:
                                                answer = 250;
                                                break;
                                              case 5:
                                                answer = 300;
                                                break;
                                              case 6:
                                                answer = 350;
                                                break;
                                              case 7:
                                                answer = 400;
                                                break;
                                              case 8:
                                                answer = 450;
                                                break;
                                              case 9:
                                                answer = 500;
                                                break;
                                              case 10:
                                                answer = 550;
                                                break;
                                              default:
                                                answer = 200;
                                            }
                                            Jimp.read(config.framesPath+"Radius-Border-"+answer+".png", function (err, masker) {
                                            masker.quality(100)
                                            masker.resize(1024, 1024)

                                            // Creating iOS icon launcher
                                            appIcon.resize(1024, 1024).write(config.outputsPath+config.targetRepoName+config.pathToIosIcon)
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
                                            Jimp.read(config.imagesPath+"raw-background.png", function (err, transparentBg) {
                                                var xxxhdpi, xxhdpi, xhdpi, mdpi, hdpi
                                                xxxhdpi = xxhdpi = xhdpi = hdpi = mdpi = transparentBg

                                                // Creating all Android icon launchers
                                                xxxhdpi.resize(192, 192)
                                                appIcon.resize(152, 152)
                                                xxxhdpi.composite(appIcon, 20, 20)
                                                xxxhdpi.shadow({ opacity: 0.8, size: 1.0, blur: 5, x: 0, y: 0 })
                                                xxxhdpi.write(config.outputsPath+config.targetRepoName+config.pathToXXXHdpi)
                                                console.log("xxxhdpi created.")

                                                xxhdpi.resize(144, 144)
                                                appIcon.resize(114, 114)
                                                xxhdpi.composite(appIcon, 15, 15)
                                                xxhdpi.shadow({ opacity: 0.8, size: 1.0, blur: 5, x: 0, y: 0 })
                                                xxhdpi.write(config.outputsPath+config.targetRepoName+config.pathToXXHdpi)
                                                console.log("xxhdpi created.")

                                                xhdpi.resize(96, 96)
                                                appIcon.resize(76, 76)
                                                xhdpi.composite(appIcon, 10, 10)
                                                xhdpi.shadow({ opacity: 0.8, size: 1.0, blur: 5, x: 0, y: 0 })
                                                xhdpi.write(config.outputsPath+config.targetRepoName+config.pathToXHdpi)
                                                console.log("xhdpi created.")

                                                hdpi.resize(72, 72)
                                                appIcon.resize(56, 56)
                                                hdpi.composite(appIcon, 8, 8)
                                                hdpi.shadow({ opacity: 0.5, size: 1.0, blur: 1, x: 0, y: 0 })
                                                hdpi.write(config.outputsPath+config.targetRepoName+config.pathToHdpi)
                                                console.log("hdpi created.")

                                                mdpi.resize(48, 48)
                                                appIcon.resize(38, 38)
                                                mdpi.composite(appIcon, 5, 5)
                                                mdpi.shadow({ opacity: 0.5, size: 1.0, blur: 1, x: 0, y: 0 })
                                                mdpi.write(config.outputsPath+config.targetRepoName+config.pathToMdpi)
                                                console.log("mdpi created.")
                                                console.log('\x1b[33m%s\x1b[0m', "Completed! Icons cropped & saved in related directories!\n")
                                            })
                                        })
                                        } else {
                                            console.log("Error: This is not a valid choice, choose within the range!")
                                        }
                                    console.log('\x1b[33m%s\x1b[0m', "Generating Android icon launchers...")
                                    rl.close();
                                    })
                                })
                            } else {
                                console.log("File does not exist! Upload the file first.")
                                cropQuestionOne()
                            }
                        } catch(err) {
                            console.log("Catch! File does not exist! Upload the file first.")
                        }
                    })
                }
                cropQuestionOne()
            } else if (answer === "2") {
                // Do you want background color for you icon
                rl.question("\nChoose a background color for your icon or press return to use transparent\nThis color comes with alpha chanel which represent the amount of transparency.\nYou can simply Google your color and paste here.\nFormat is 0xRRBBGGAA, example 0x559910FF.\nEnter Color: ", function(bgColor) {
                    var bg
                    Jimp.read(config.imagesPath+"raw-background.png", function (err, rawBackground) {
                        rawBackground.resize(1024, 1024)
                        for (var y=0; y<1024; y++) {
                            for (var x=0; x<1024; x++) {
                               rawBackground.setPixelColor(parseInt(bgColor), x, y)
                            }
                        }
                        bg = rawBackground
                    })
                    listFiles()
                    rl.question("\nNow you can choose an icon to add on top of your background.\n", function(onTopIcon) {
                        Jimp.read(config.imagesPath+onTopIcon, function (err, onTopIcon) {
                            Jimp.read(config.imagesPath+"raw-background.png", function (err, rawBackground) {
                                rawBackground.resize(1024, 1024)
                                rl.question("\nWant to scale the top icon?\nEnter scale amount(Range: -99 to +99)\nEnter scale amount: ", function(scaleAmount) {
                                    if (parseInt(scaleAmount)> -99 && parseInt(scaleAmount) < 99) {
                                        onTopIconScaleAmount = scaleAmount
                                    } else {
                                        console.log("Scale amount is not valid! Default scale set to 0%.")
                                    }
                                    onTopIcon.resize(onTopIconScaleAmount/100*onTopIcon.bitmap.width + onTopIcon.bitmap.width,
                                                                                                         onTopIconScaleAmount/100*onTopIcon.bitmap.height + onTopIcon.bitmap.height)
                                    var x = ( (bg.bitmap.width - onTopIcon.bitmap.width) / 2 )
                                    var y = ( (bg.bitmap.width - onTopIcon.bitmap.width) / 2 )
                                    rawBackground.composite(onTopIcon, x, y).shadow({ opacity: 0.8, size: 1.0, blur: 5, x: 0, y: 0 })
                                    bg.composite(rawBackground, 0, 0)
                                    bg.write(config.imagesPath+"createdImage.png")
                                    console.log("Icon created! Now you can use option 1 to crop it the way you want.")
                                    rl.close()
                                })
                            })
                        })
                    })
                })
            } else {
                console.log('\x1b[31m%s\x1b[0m', "I can't help you with this choice! Wrong input, try again!")
                mainQuestion()
            }
        })
    }
    mainQuestion()
})