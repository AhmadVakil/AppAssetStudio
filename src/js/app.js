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
  var jsonButton = document.getElementById('view-json')

var repos = document.getElementById('repositories')
var repoName
var configuration
//var socket = io.connect('127.0.0.1:5001')
repos.addEventListener('change', myfunction2)


function myFunction() {
        var x = document.getElementById("global-json-changer");
        if (x.style.display === "none") {
            x.style.display = "block";
            jsonButton.style.backgroundColor = 'red'
        } else {
            x.style.display = "none";
            jsonButton.style.backgroundColor = '#6484ec'
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

   function handles(){
    var x = document.getElementById("Color-changer-part");
    if (x.style.display === "none") {
        x.style.display = "block";
        handlesChanger.style.backgroundColor = 'red'
    } else {
        x.style.display = "none";
        handlesChanger.style.backgroundColor = '#6484ec'
    }
   }

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
      closeIssue.style.backgroundImage = "url('js/close.png')"
      closeIssue.style.width = '70%'
      closeIssue.style.height = '70%'
      closeIssue.src = "js/close.png"
      closeIssue.style.verticalAlign = 'middle'

      var openIssue=document.createElement('img')
      openIssue.style.backgroundImage = "url('js/open.png')"
      openIssue.style.width = '70%'
      openIssue.style.height = '70%'
      openIssue.src = "js/open.png"
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
        document.getElementById("jsonButtons").innerHTML = ''
        repoName = repos.value
        if (repoName != "Select Repository"){
                configuration = { repoNames : repoName }
                //var delivery = new Delivery(socket)

                console.log(configuration.repoNames)
                socket.emit('openThisRepo', { repoNames : repoName });
                console.log(repoName)

        }

      }

    socket.on('Repositories', function (data){
        var repoList = document.getElementById("repositories")
        var defaultOption = document.createElement('option')
        defaultOption.innerHTML = "Select Repository"
        repoList.appendChild(defaultOption)
        for (var i=0; i<data.length; i++){
         var tempOption = document.createElement('option')
         tempOption.innerHTML = data[i]
         repoList.appendChild(tempOption)
        }
    })

    function appDesignOne() {
        configFileName = 'appDesignOne'
        socket.emit('appDesignOne', { configName : configFileName });
        console.log('clicked')
    }

    function appDesignTwo() {
        configFileName = 'appDesignTwo'
        socket.emit('appDesignTwo', { configName : configFileName });
    }

    function appSettingsOne () {
        configFileName = 'appSettingsOne'
        socket.emit('appSettingsOne', { configName : configFileName });
    }

    function appSettingsTwo() {
        configFileName = 'appSettingsTwo'
                socket.emit('appSettingsTwo', { configName : configFileName });
    }

    function appSettingsThree() {
        configFileName = 'appSettingsThree'
                socket.emit('appSettingsThree', { configName : configFileName });
    }

    function appSettingsFour() {
        configFileName = 'appSettingsFour'
                socket.emit('appSettingsFour', { configName : configFileName });
    }

    function appNotificationOne() {
        configFileName = 'appNotificationOne'
                socket.emit('appNotificationOne', { configName : configFileName });
    }

    function appNotificationTwo() {
        configFileName = 'appNotificationTwo'
                socket.emit('appNotificationTwo', { configName : configFileName });
    }

    function appLogin() {
        configFileName = 'appLogin'
                socket.emit('appLogin', { configName : configFileName });
    }

    function customModuleOne() {
        configFileName = 'customModuleOne'
                socket.emit('customModuleOne', { configName : configFileName });
    }

    function customModuleTwo() {
        configFileName = 'customModuleTwo'
                socket.emit('customModuleTwo', { configName : configFileName });
    }

    function customModuleThree() {
        configFileName = 'customModuleThree'
                socket.emit('customModuleThree', { configName : configFileName });
    }

        socket.on('configChanger', function (data) {
        //myFunction()
          console.log(data.fields)
          //var globalConfig
          console.log('============>>>>'+data.title)
          viewJsonDivs(data.title)


          for (var i=0; i<data.fields.length;i++){
            var allJsonHolder= document.getElementById(data.title+'-div')
            var fancyLine = document.createElement('hr')
            var lineBreaker = document.createElement('br')

            var jsonDiv = document.createElement('div')
            jsonDiv.id = data.fields[i].jsonKeyPath+'-div'
            jsonDiv.className = 'json-div'
            jsonDiv.innerHTML = data.fields[i].title+'<br>'

            /*var radioOne= document.createElement('input')
            radioOne.type='radio'
            radioOne.innerHTML = 'Use HEX number'*/
            var textInputOne= document.createElement('input')
            var textInputTwo= document.createElement('input')
            if (data.fields[i].type === 'color'){
                textInputOne.type='text'
                textInputOne.id=data.fields[i].jsonKeyPath+'-hex'

                textInputTwo.type='color'
                textInputTwo.id=data.fields[i].jsonKeyPath+'-picker'

                // Inserting values
                /*var jsonPath = data.fields[i].jsonKeyPath
                console.log(jsonPath)
                textInputOne.value = globalConfig.*/

                jsonDiv.appendChild(textInputOne)
                jsonDiv.appendChild(textInputTwo)
            }

            if (data.fields[i].type === 'number'){
              textInputOne.type='number'
              textInputOne.id=data.fields[i].jsonKeyPath+'-number'
              textInputOne.style.width = '50px'
              jsonDiv.appendChild(textInputOne)
            }

            if (data.fields[i].type === 'text'){
              textInputOne.type='text'
              textInputOne.id=data.fields[i].jsonKeyPath+'-text'
              jsonDiv.appendChild(textInputOne)
            }

            if (data.fields[i].type === 'boolean'){
              var booleanSelector = document.createElement('select')
              var yes = document.createElement('option')
              yes.innerHTML = 'Yes'
              var no = document.createElement('option')
              no.innerHTML = 'No'

              booleanSelector.appendChild(yes)
              booleanSelector.appendChild(no)
              jsonDiv.appendChild(booleanSelector)

            }


            /*var radioTwo= document.createElement('input')
            radioTwo.type='radio'
            radioTwo.insertAdjacentHTML = 'AAAA' */


           // jsonDiv.appendChild(radioOne)

           // jsonDiv.appendChild(lineBreaker)
           // jsonDiv.appendChild(radioTwo)



            allJsonHolder.appendChild(jsonDiv)
            allJsonHolder.appendChild(fancyLine)

          }
        })



/*
    socket.on('CurrentConfigs', function (data) {
            var primaryColor = document.getElementById('primaryColor-hex')
            var moduleBackgroundColor = document.getElementById('moduleBackgroundColor-hex')
            var primaryColorDark = document.getElementById('primaryColorDark-hex')
            var secondaryColor = document.getElementById('secondaryColor-hex')
            var accentColor = document.getElementById('accentColor-hex')
            var textColor = document.getElementById('textColor-hex')

            var remoteNotificationIdKey = document.getElementById('remoteNotification.contentIdKey-div')
            var remoteNotificationPubdateKey = document.getElementById('remoteNotification.pubdateKey-text')
            var remoteNotificationSubtitleKey = document.getElementById('remoteNotification.subtitleKey-div')
            var remoteNotificationTitleKey = document.getElementById('remoteNotification.titleKey-div')
            var conceptField = document.getElementById('conceptField-div')
            var storyField = document.getElementById('storyField-div')
            var authorField = document.getElementById('authorField-div')
            var productId = document.getElementById('productId-div')
            var loginURL = document.getElementById('loginURL-div')
            var pushApplicationAndroid = document.getElementById('pushApplication.android-div')
            var pushApplicationIos = document.getElementById('pushApplication.ios-div')
            var pushTopic = document.getElementById('pushTopic-div')
            var pushRegisterURL = document.getElementById('pushRegisterURL-div')
            var appIconButton = document.getElementById('view-icon-picker')
            var handlesChanger = document.getElementById('view-handles')
/*
remoteNotificationIdKey.value = data.
remoteNotificationPubdateKey.value = data.
remoteNotificationSubtitleKey.value = data.
remoteNotificationTitleKey.value = data.
conceptField.value = data.
storyField.value = data.
authorField.value = data.
productId.value = data.
loginURL.value = data.
pushApplicationAndroid.value = data.
pushApplicationIos.value = data.
pushTopic.value = data.
pushRegisterURL.value = data.
appIconButton.value = data.
handlesChanger.value = data.

            console.log('data=========>> '+data.primaryColorDark);
            //data = JSON.parse(data)
            //globalConfig = data
            x.value ='#'+data.primaryColor
            //var prim = document.getElementById('primaryColorDark-hex')
            primaryColor.value = data.primaryColor
            primaryColorDark.value = data.primaryColorDark
            secondaryColor.value =data.secondaryColor
            accentColor.value = data.accentColor
            moduleBackgroundColor.value = data.moduleBackgroundColor
            textColor.value = data.textColor

            x.addEventListener('change', myfunction)
            function myfunction(){
              if (x.value != data.primaryColor){
                x.style.backgroundColor = 'green'
              } else {
                x.style.backgroundColor = 'white'
              }
            }

            //document.getElementById('colorTextInput').innerHTML = data.primaryColor
           // socket.emit('my other event', { my: 'data' });
          });
*/


    /*<div id="primaryColorDark-div" class="json-div">
                           <input type="checkbox" name="primaryColorDark" id="primaryColorDark">Change Accent Color:<br><br>
                                <input type="radio" value="Hex Color">Use HEX color:
                                <input id="primaryColorDark-hex" type="text" value=""><br>

                                <input type="radio" name="primaryColorDark-picker" value="Hex Color">Use color picker:
                                <input id="primaryColorDark-picker" type="color"><br>
                           </div>
                           <hr>*/



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

function createElements(obj, key) {
  /*if (key.toLowerCase().includes('color')) {
          //console.log(obj.key)
  }*/



    var RegExp = /^#[0-9A-F]{6}$/i;

    isHexColor = hex => typeof hex === 'string' && hex.length === 6 && !isNaN(Number('0x' + hex))

    if (isHexColor(obj[key]) || RegExp.test(obj[key])) {
            // Create color elements here
            console.log(key+" ====>> "+obj[key] + "  Color")
    } else if (typeof obj[key] === "number"){
            // Create number elements here
            console.log(key+" ====>> "+obj[key] + "  Number")
    } else if (typeof obj[key] === "boolean"){
            // Create boolean elements here
            console.log(key+" ====>> "+obj[key] + "  Boolean")
    } else if (typeof obj[key] === "string"){
            // Create text field here
            console.log(key+" ====>> "+obj[key] + "  String")
    }

}

function isHexColor (hex) {
  return typeof hex === 'string'
      && hex.length === 6
      && !isNaN(Number('0x' + hex))
}

function getDeepKeys(obj) {
    var keys = [];
    for(var key in obj) {
    createElements(obj, key)
    //var attr = JSON.parse(key)

    if (typeof obj[key] === "object"){
    //console.log(key +' : ')
    } else {
    //console.log('   '+key +' : '+obj[key])
    }
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
        console.log(file.path)
        console.log(file.name)
        var jsonFileButton = document.createElement("BUTTON");
        var fancyIcon = document.createElement("i")
        fancyIcon.className = "fa fa-cog"
        fancyIcon.aria = "true"

        jsonFileButton.className = "groupButtons"
        var buttonText = document.createTextNode(" "+file.name);
        jsonFileButton.appendChild(fancyIcon)
        jsonFileButton.appendChild(buttonText);
        jsonFileButton.id = file.path
        var buttonGroupDiv = document.getElementById("jsonButtons");
        buttonGroupDiv.appendChild(jsonFileButton)

        var jsonDivMain = document.getElementById("global-json-changer");
        jsonDivMain.appendChild(buttonGroupDiv)

        jsonFileButton.addEventListener("click", function() {
                  console.log(jsonFileButton.id)
        });

        //getDeepKeys(file)
       //console.log(file.fileName)

       //console.log(file.filePath)
       //console.log(file)
});

