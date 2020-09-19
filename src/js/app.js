var startButton = document.getElementById('start')
var ConvertButtonPage = document.getElementById('Convert')
let BR=document.createElement('BR')

    var childSection = document.createElement("div")
    childSection.style.margin = '25px'
    childSection.style.textAlign = 'center';
    document.body.style.backgroundImage = "url('../image/grey.jpg')"

    var fileSection = document.createElement("div")
    fileSection.style.margin = '25px'
    fileSection.className = 'sectionsDivider'

  var file = document.getElementById("file")
  var FilePickerSection = document.getElementById("file-drop-part")

  var x = document.getElementById("colorTextInput")
  x.setAttribute("type", "text")
  x.id = 'hexColor'
  x.style.borderRadius = '5px'
  x.value='#'
  var editJsonFilesbutton = document.getElementById('editJsonFilesButton')

var repos = document.getElementById('repositoriesDropDownMenu')
var repoName
var configuration
//var socket = io.connect('127.0.0.1:5001')


function popUp() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

function editJsonFilesButton() {
    var x = document.getElementById("configFilesDiv");
    if (x.style.display === "none") {
        x.style.display = "block";
        editJsonFilesbutton.style.backgroundColor = 'red'
    } else {
        //x.innerHTML = ''

        x.style.display = "none";
        editJsonFilesbutton.style.backgroundColor = '#6484ec'
    }
}


function viewJsonDivs(jsonDivName) {
        var x = document.getElementById(jsonDivName+'-div');
        var pressedButton = document.getElementById(jsonDivName)
        if (x.style.display === "none") {
            x.style.display = "inline";
            pressedButton.style.backgroundColor = 'red'
        } else {
            x.style.display = "none";
            pressedButton.style.backgroundColor = '#6484ec'
        }
    }

   function iconPicker(){
    var x = document.getElementById("file-drop-part");
    if (x.style.display === "none") {
        x.style.display = "block";
        appIconButton.style.backgroundColor = 'red'
    } else {
        x.style.display = "none";
        appIconButton.style.backgroundColor = '#6484ec'
    }
   }

//Handles button must fix
  /* function handles(){
    var x = document.getElementById("Color-changer-part");
    if (x.style.display === "none") {
        x.style.display = "block";
        document.getElementById.("view-handles").backgroundColor = 'red'
    } else {
        x.style.display = "none";
        document.getElementById.("view-handles").backgroundColor = '#6484ec'
    }
   }*/

      var canvas = document.getElementById('canvas')
      canvas.style.width = '88px'
      canvas.style.height = '44px'
      canvas.style.backgroundColor = 'white'
      canvas.style.textAlign = 'center'
      canvas.style.boxShadow = '0px'
      canvas.style.opacity = '1'
      canvas.style.marginLeft= '300px'
      canvas.style.marginTop = '10px'
      canvas.style.padding = '0px'
      canvas.style.boxShadow =  '0px 0px 20px #000000'
      canvas.style.transition = 'all 1s'

      var canvas2 = document.getElementById('canvas2')
      canvas2.style.width = '88px'
      canvas2.style.height = '44px'
      canvas2.style.backgroundColor = 'white'
      canvas2.style.textAlign = 'center'
      canvas2.style.boxShadow = '0px'
      canvas2.style.opacity = '1'
      canvas2.style.marginLeft= '300px'
      canvas2.style.marginTop = '10px'
      //canvas2.style.marginBottom = '50px'
      canvas2.style.padding = '0px'
      canvas2.style.boxShadow =  '0px 0px 20px #000000'
      canvas2.style.transition = 'all 1s'

      var closeIssue=document.createElement('img')
      closeIssue.style.backgroundImage = "url('js/Input_Images/close.png')"
      closeIssue.style.width = '70%'
      closeIssue.style.height = '70%'
      closeIssue.src = "js/Input_Images/close.png"
      closeIssue.style.verticalAlign = 'middle'

      var openIssue=document.createElement('img')
      openIssue.style.backgroundImage = "url('js/Input_Images/open.png')"
      openIssue.style.width = '70%'
      openIssue.style.height = '70%'
      openIssue.src = "js/Input_Images/open.png"
      openIssue.style.verticalAlign = 'middle'

      canvas.appendChild(closeIssue)
      canvas2.appendChild(openIssue)



    x.addEventListener('keypress', function(e){
      var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      canvas.style.backgroundColor = x.value
      canvas2.style.backgroundColor= x.value
      console.log(x.value)
    }
  })

var submit = document.getElementById("button");
submit.innerHTML = "Submit"
submit.className = 'button'
submit.style.width = '170px'
submit.style.height = '80px'
var ImageIsSent = false
var socket = io.connect('127.0.0.1:5001')

   function myfunction2(){
        var mainButtons = document.getElementById("main-buttons")
        //mainButtons.innerHTML = ''
        var repos = document.getElementById("repositoriesDropDownMenu")

        document.getElementById("configFilesDiv").innerHTML = ''
        repoName = repos.value
        if (repoName === "Select Repository"){
            mainButtons.style.display = "none";

        } else if (repoName != "Select Repository"){
            mainButtons.style.display = "block";
            configuration = { repoNames : repoName }
            //var delivery = new Delivery(socket)
            console.log(configuration.repoNames)
            document.getElementById('jsonAllKeysParagraph').innerHTML = ''
            socket.emit('openThisRepo', { repoNames : repoName });
            console.log(repoName)
        }

      }

    socket.on('Repositories', function (data){
    var repoInfoText = document.createElement("h4")
    var error = document.createElement("i")
    var failedToLoadRepoNotification = document.getElementById("failedToLoadRepoNotification")
    var selectRepoNotification = document.getElementById("selectRepoNotification")

    error.className = "fas fa-exclamation-triangle"
    repoInfoText.innerHTML = "It's seems like there is no mobile application repository on the system. Please clone or contact your system administrator.<br><br>"
    var resourceDiv = document.getElementById("resource-picker")

        if (data.length!==0){
            failedToLoadRepoNotification.style.display = "none"
            repoInfoText.innerHTML = "Resource folder should be selected here, please select from the excisting repositories"
            var repositoriesMenu = document.createElement("select")
            //selectRepoNotification.style.display = 'block;'
            repositoriesMenu.addEventListener('change', myfunction2)

            repositoriesMenu.id = "repositoriesDropDownMenu"
            var defaultOption = document.createElement('option')
            defaultOption.innerHTML = "Select Repository"
            repositoriesMenu.appendChild(defaultOption)
            for (var i=0; i<data.length; i++){
                 var tempOption = document.createElement('option')
                 tempOption.innerHTML = data[i]
                 repositoriesMenu.appendChild(tempOption)
             }
        resourceDiv.appendChild(repoInfoText)
        resourceDiv.appendChild(repositoriesMenu)
        } else {
        failedToLoadRepoNotification.style.display = "block"
        resourceDiv.appendChild(error)
        resourceDiv.appendChild(repoInfoText)
        }


    })


      submit.addEventListener('click', function(){
        //$(function(){
          var socket = io.connect('127.0.0.1:5001')
        // var imageSelected = false

          socket.on('connect', function(){
            var delivery = new Delivery(socket)

             delivery.on('delivery.connect',function(delivery){
              //console.log('TEST')
              //$("input[type=submit]").click(
                //file()
               // function file(evt){
                var file = $("input[type=file]")[0].files[0]

               // console.log(file.files[0].name)
                delivery.send(file, configuration)

               // ImageIsSent = true
                //socket.send({foo: 'bar'})
                //evt.preventDefault()
               //}
              //})
            })

            delivery.on('send.success',function(fileUID){

              console.log("file was successfully sent.")
              FilePickerSection.innerHTML = 'File is now sent to the server!'
              FilePickerSection.style.transition='all 2s'

            })
          })

        var hexColor= document.getElementById('hexColor')
        console.log(hexColor.value)
        var field = hexColor.value
        var noTag = ''
        for (var i=1; i<=6; i++){
          noTag+=field.charAt(i)
        }
        console.log(noTag)
        var stringColor = hexColor.value
        var AARRGGBB='0x'
        for(var i=1; i<=6; i++){
          AARRGGBB+=stringColor.charAt(i)
        }
        AARRGGBB+='ff'
        console.log(AARRGGBB)
        var conf='Customer-X'
        moduleBackgroundColor.value = '147258'
        $.ajax
              ({
                type: "POST",
                url: "http://localhost:8000",
                crossDomain:true,
                dataType: "json",
                data:JSON.stringify({colorShortHex: AARRGGBB , color: hexColor.value , colorNoHashTag: noTag, iconName: file.files[0].name, targetRepo: conf, moduleBackgroundColor: moduleBackgroundColor.value, primaryColorDark:primaryColorDark.value, secondaryColor:secondaryColor.value, accentColor:accentColor.value, textColor: textColor.value })
              }).done(function ( data ) {
                console.log(configuration.repoNames)
                    alert("Your requested color is successfully sent.");
                })
      })

function validateColor(obj, key, textInputOne, textInputTwo, verifyIcon, verifyIconSpan){
var RegExp = /^#[0-9A-F]{6}$/i;
isHexColor = hex => typeof hex === 'string' && hex.length === 6 && !isNaN(Number('0x' + hex))
                    if (RegExp.test(textInputOne.value)) {
                            textInputTwo.value = textInputOne.value
                            //textInputTwo.value = '#'+textInputOne.value
                            verifyIcon.className = "far fa-check-circle"
                            verifyIcon.style.color = 'yellow'
                            verifyIcon.title = "Color seems OK"
                            verifyIconSpan.appendChild(verifyIcon)
                           // console.log(textInputTwo.value)
                       } else if (isHexColor(textInputOne.value)) {
                            textInputTwo.value = '#'+textInputOne.value
                            verifyIcon.className = "far fa-check-circle"
                            verifyIcon.style.color = 'yellow'
                            verifyIcon.title = "Color seems OK"
                            verifyIconSpan.appendChild(verifyIcon)
                       } else {
                            //alert('The color for '+ key +' seems like wrong!\n Please fix this in your configuration manually or use the color picker to fix it from.')
                            //textInputOne.value=''
                            verifyIcon.className = "fas fa-exclamation-triangle"
                            verifyIcon.style.color = 'red'
                            verifyIcon.title = "Check the color value!"
                            verifyIconSpan.appendChild(verifyIcon)

                       }



}

function createElements(obj, key) {
  /*if (key.toLowerCase().includes('color')) {
          //console.log(obj.key)
  }*/
    var RegExp = /^#[0-9A-F]{6}$/i;
    isHexColor = hex => typeof hex === 'string' && hex.length === 6 && !isNaN(Number('0x' + hex))
    var jsonAllParagraphsKeeper= document.getElementById('jsonAllParagraphsKeeper')
    var jsonAllKeysParagraph= document.getElementById('jsonAllKeysParagraph')
    var jsonKeyParagraph = document.createElement('p')

    //jsonDiv.style.width = '50%'
    jsonKeyParagraph.style.textAlign = 'center'
    jsonKeyParagraph.id = obj[key]+'-p'
    //jsonKeyParagraph.className = 'json-div'
    //jsonKeyParagraph.innerHTML = key+'<br>'
   // var fancyLine = document.createElement('hr')
    var textInputOne= document.createElement('input')
    var textInputTwo= document.createElement('input')
    var verifyIconSpan = document.createElement('span')
    verifyIconSpan.style.margin = '10px'
    var verifyIcon = document.createElement('i')
    jsonKeyParagraph.innerHTML = key+'<br>'
    jsonAllParagraphsKeeper.style.textAlign = 'center'
    verifyIconSpan.innerHTML = ''
if (typeof obj[key] === 'object'  && isNaN(key)){
        console.log('skipped')
        var objectName = document.createElement('h3')
            objectName.className = 'subSections'
            objectName.style.display = 'inline'
            objectName.innerHTML = key+''
            //jsonKeyParagraph.appendChild(objectName)
            jsonAllKeysParagraph.appendChild(objectName)
            jsonAllParagraphsKeeper.appendChild(jsonAllKeysParagraph)
    } else {
        if (isHexColor(obj[key]) || RegExp.test(obj[key]) || key.toLowerCase().includes('color') && key.length) {

                // Create color elements here
                console.log(key+" ====>> "+obj[key] + "  Color")
                textInputOne.type='text'
                textInputOne.id=obj[key]+'-hex'
                textInputOne.style.width = '35%'
                textInputOne.style.display = 'inline'
                textInputTwo.type='color'
                textInputTwo.id=obj[key]+'-picker'
                textInputOne.value = obj[key]
                validateColor(obj, key, textInputOne, textInputTwo, verifyIcon, verifyIconSpan)

                textInputOne.addEventListener('change', function(){
                    if (RegExp.test(textInputOne.value)) {
                        textInputTwo.value = textInputOne.value
                        //textInputTwo.value = '#'+textInputOne.value
                        verifyIcon.className = "far fa-check-circle"
                        verifyIcon.style.color = 'yellow'
                        verifyIcon.title = "Color seems OK"
                        verifyIconSpan.appendChild(verifyIcon)
                       // console.log(textInputTwo.value)
                    } else if (isHexColor(textInputOne.value)) {
                        textInputTwo.value = '#'+textInputOne.value
                        verifyIcon.className = "far fa-check-circle"
                        verifyIcon.style.color = 'yellow'
                        verifyIcon.title = "Color seems OK"
                        verifyIconSpan.appendChild(verifyIcon)
                    } else {
                        //alert('The color for '+ key +' seems like wrong!\n Please fix this in your configuration manually or use the color picker to fix it from.')
                        //textInputOne.value=''
                        verifyIcon.className = "fas fa-exclamation-triangle"
                        verifyIcon.style.color = 'red'
                        verifyIcon.title = "Check the color value!"
                        verifyIconSpan.appendChild(verifyIcon)
                    }
                })
                textInputTwo.addEventListener('change', function(){
                        textInputOne.value = textInputTwo.value
                        //textInputTwo.value = '#'+textInputOne.value
                        verifyIcon.className = "far fa-check-circle"
                        verifyIcon.style.color = 'yellow'
                        verifyIcon.title = "Color seems OK"
                        verifyIconSpan.appendChild(verifyIcon)
                })
                jsonKeyParagraph.appendChild(verifyIconSpan)
                jsonKeyParagraph.appendChild(textInputOne)
                jsonKeyParagraph.appendChild(textInputTwo)

                jsonAllKeysParagraph.appendChild(jsonKeyParagraph)
                jsonAllParagraphsKeeper.appendChild(jsonAllKeysParagraph)
                //jsonAllParagraphsKeeper.appendChild(fancyLine)
        } else if (typeof obj[key] === "number"){
                // Create number elements here
                textInputOne.type = 'number'
                textInputOne.value = obj[key]
                if (textInputOne.value!== null && textInputOne.value!== ''){
                    verifyIcon.className = "far fa-check-circle"
                    verifyIcon.style.color = 'yellow'
                    verifyIcon.title = "Value seems OK!"
                    verifyIconSpan.appendChild(verifyIcon)
                } else {
                    verifyIcon.className = "fas fa-exclamation-triangle"
                    verifyIcon.style.color = 'red'
                    verifyIcon.title = "Check the value!"
                    verifyIconSpan.appendChild(verifyIcon)
                }
                jsonKeyParagraph.appendChild(verifyIconSpan)
                jsonKeyParagraph.appendChild(textInputOne)
                jsonAllKeysParagraph.appendChild(jsonKeyParagraph)
                jsonAllParagraphsKeeper.appendChild(jsonAllKeysParagraph)

                console.log(key+" ====>> "+obj[key] + "  Number")
        } else if (typeof obj[key] === "boolean"){
                // Create boolean elements here
                textInputOne.type = 'boolean'
                textInputOne.value = obj[key]
                if (textInputOne.value!== null && textInputOne.value!== ''){
                    verifyIcon.className = "far fa-check-circle"
                    verifyIcon.style.color = 'yellow'
                    verifyIcon.title = "Value seems OK!"
                    verifyIconSpan.appendChild(verifyIcon)
                } else {
                    verifyIcon.className = "fas fa-exclamation-triangle"
                    verifyIcon.style.color = 'red'
                    verifyIcon.title = "Check the value!"
                    verifyIconSpan.appendChild(verifyIcon)
                }
                jsonKeyParagraph.appendChild(verifyIconSpan)
                jsonKeyParagraph.appendChild(textInputOne)
                jsonAllKeysParagraph.appendChild(jsonKeyParagraph)
                jsonAllParagraphsKeeper.appendChild(jsonAllKeysParagraph)
                console.log(key+" ====>> "+obj[key] + "  Boolean")
        } else if (typeof obj[key] === "string"){
                // Create text field here
                textInputOne.type = 'string'
                textInputOne.value = obj[key]
                if (textInputOne.value!== null && textInputOne.value!== ''){
                    verifyIcon.className = "far fa-check-circle"
                    verifyIcon.style.color = 'yellow'
                    verifyIcon.title = "Value seems OK!"
                    verifyIconSpan.appendChild(verifyIcon)
                } else {
                    verifyIcon.className = "fas fa-exclamation-triangle"
                    verifyIcon.style.color = 'red'
                    verifyIcon.title = "Check the value!"
                    verifyIconSpan.appendChild(verifyIcon)
                }
                jsonKeyParagraph.appendChild(verifyIconSpan)
                jsonKeyParagraph.appendChild(textInputOne)
                jsonAllKeysParagraph.appendChild(jsonKeyParagraph)
                jsonAllParagraphsKeeper.appendChild(jsonAllKeysParagraph)
                console.log(key+" ====>> "+obj[key] + "  String")
        }
      }

}

function isHexColor (hex) {
  return typeof hex === 'string'
      && hex.length === 6
      && !isNaN(Number('0x' + hex))
}

function getDeepKeys(obj) {
    var keys = [];
    //alert(obj[key].length)
    for(var key in obj) {
    createElements(obj, key)
    //var attr = JSON.parse(key)
    console.log("keyyyy===> "+'   '+key +' : '+obj[key])
    /*if (typeof obj[key] === "object"){
    //console.log(key +' : ')
    } else {
    //console.log('   '+key +' : '+obj[key])
    }*/
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

socket.on('foundJson', function (file) {
        //console.log(file.path)
        //console.log(file.name)
        var jsonFileButton = document.createElement("BUTTON");
        var fancyIcon = document.createElement("i")
        fancyIcon.className = "fa fa-cog"
        fancyIcon.aria = "true"

        jsonFileButton.className = "groupButtons"
        var buttonText = document.createTextNode(" "+file.name);
        jsonFileButton.appendChild(fancyIcon)
        jsonFileButton.appendChild(buttonText);
        jsonFileButton.id = file.path
        jsonFileButton.title = file.path
        var buttonGroupDiv = document.getElementById("configFilesDiv");
        buttonGroupDiv.appendChild(jsonFileButton)

        /*var jsonDivMain = document.getElementById("jsonAllParagraphsKeeper");
        jsonDivMain.appendChild(buttonGroupDiv)*/

        jsonFileButton.addEventListener("click", function() {
              //console.log(jsonFileButton.id)
              var jsonAllKeysParagraph= document.getElementById('jsonAllKeysParagraph')
              jsonAllKeysParagraph.innerHTML= ''
              //jsonFileButton.style.backgroundColor = 'red'
              socket.emit('fetchConfigFile', { configPath : jsonFileButton.id });
        });

        //getDeepKeys(file)
       //console.log(file.fileName)

       //console.log(file.filePath)
       //console.log(file)
});

socket.on('configData', function (configData) {
    //console.log(configData)
    getDeepKeys(configData)
});

function sendFeedBack(){
    socket.emit('feedBack', { firstname : document.getElementById("firstname").value,
                              lastname : document.getElementById("lastname").value,
                              feedback : document.getElementById("feedback").value});
}

socket.on('feedbackSaved', function () {
    //console.log(configData)
    document.getElementById('closeFeedback').click();
    document.getElementById("firstname").value = ''
    document.getElementById("lastname").value = ''
    document.getElementById("feedback").value = ''
    document.getElementById("popup2").style.display = 'block'
    console.log("Feedback saved by the server")
});