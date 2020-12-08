var io  = require('socket.io').listen(5001)
var jsonfile = require('jsonfile')
var path = require('path')
const fs = require('fs');
const testFolder = './Cloned_Git_Repositories/';

function log(activity){
    console.log(activity)
    var datetime = new Date();
    const logDir = '../logs'
    if (!fs.existsSync(logDir)){
        fs.mkdirSync(logDir);
    }

    fs.appendFile(logDir+'/activities.log', '-- On ' + datetime + "\n" + activity,
    function (err) {
        if (err) throw err;
    });
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
    socket.on('imgBuffer', function (imgBuffer) {
        var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0"
            + "NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO"
            + "3gAAAABJRU5ErkJggg==";
        var data = img.replace(/^data:image\/\w+;base64,/, "");
        var buf = new Buffer(data, 'base64');
        //fs.writeFile('image.png', buf);
    })
    socket.on('feedBack', function (obj) {
       var datetime = new Date();
       const feedbacksDir = '../feedbacks'
       if (!fs.existsSync(feedbacksDir)){
           fs.mkdirSync(feedbacksDir);
       }

       fs.appendFile(feedbacksDir+'/feedbacks.log', 'Feedback----------------------' + datetime + '\n' +
                                                   'Firstname:' + obj.firstname + '\n' +
                                                   'Lastname:' + obj.lastname + '\n' +
                                                   'Feedback:' + obj.feedback + '\n\n', function (err) {
         if (err) throw err;
         console.log('Feedback Saved!');
         socket.emit('feedbackSaved');
       });
    })
    socket.on('fetchConfigFile', function (obj) {
          jsonfile.readFile(obj.configPath, function(err, configData) {
              socket.emit('configData', configData);
          })

    })
    socket.on('openThisRepo', function (data) {
                fromDir('Cloned_Git_Repositories/'+data.repoNames,'.json', socket)
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
    fs.readdir(testFolder, (err, files) => {
        socket.emit('Repositories', files)
    })
});
console.log("SERVER IS UP...")