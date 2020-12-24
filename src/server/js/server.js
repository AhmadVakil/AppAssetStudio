var io  = require('socket.io').listen(5001)
var jsonfile = require('jsonfile')
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

        // Data received from client side
        socket.on('cropIcon', function (icDetails) {
            console.log(icDetails.imgBuffer)
        })

        socket.on('imgBuffer', function (imgBuffer) {
            var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0"
                + "NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO"
                + "3gAAAABJRU5ErkJggg==";
            var data = img.replace(/^data:image\/\w+;base64,/, "");
            var buf = new Buffer(data, 'base64');
            //fs.writeFile('image.png', buf);
        })
        socket.on('cropAndSaveImage', function (obj) {

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