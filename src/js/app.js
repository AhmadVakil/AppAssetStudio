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


function popUp() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

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
        var repoButtons = document.getElementById("repo-buttons")
        //repoButtons.innerHTML = ''
        var repos = document.getElementById("repositories")

        document.getElementById("jsonButtons").innerHTML = ''
        repoName = repos.value
        if (repoName === "Select Repository"){
            repoButtons.style.display = "none";

        } else if (repoName != "Select Repository"){
            repoButtons.style.display = "block";
            configuration = { repoNames : repoName }
            //var delivery = new Delivery(socket)
            console.log(configuration.repoNames)
            socket.emit('openThisRepo', { repoNames : repoName });
            console.log(repoName)
        }

      }

    socket.on('Repositories', function (data){
    var repoInfoText = document.createElement("h4")
    var error = document.createElement("i")
    var bigNotification = document.getElementById("bigNotification")

    error.className = "fas fa-exclamation-triangle"
    repoInfoText.innerHTML = "It's seems like there is no mobile application repository on the system. Please clone or contact your system administrator.<br><br>"
    var resourceDiv = document.getElementById("resource-picker")

        if (data.length!==0){
            bigNotification.style.display = "none"
            repoInfoText.innerHTML = "Resource folder should be selected here, please select from the excisting repositories"
            var repositoriesMenu = document.createElement("select")
            repositoriesMenu.addEventListener('change', myfunction2)

            repositoriesMenu.id = "repositories"
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
        bigNotification.style.display = "block"
        resourceDiv.appendChild(error)
        resourceDiv.appendChild(repoInfoText)
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
    var allJsonHolder= document.getElementById('global-json-changer')
    isHexColor = hex => typeof hex === 'string' && hex.length === 6 && !isNaN(Number('0x' + hex))
    var jsonP = document.createElement('p')
    //jsonDiv.style.width = '50%'
    jsonP.style.textAlign = 'center'
    //jsonDiv.id = obj[key]+'-div'
    //jsonDiv.className = 'json-div'
    //allJsonHolder.innerHTML = key+'<br>'
    var fancyLine = document.createElement('hr')
    var textInputOne= document.createElement('input')
    var textInputTwo= document.createElement('input')
    jsonP.innerHTML = key+'<br>'
    allJsonHolder.style.textAlign = 'center'
    if (isHexColor(obj[key]) || RegExp.test(obj[key])) {
            // Create color elements here
            console.log(key+" ====>> "+obj[key] + "  Color")
            textInputOne.type='text'
            textInputOne.id=obj[key]+'-hex'
            textInputOne.style.width = '35%'
            textInputOne.style.display = 'inline'
            textInputTwo.type='color'
            textInputTwo.id=obj[key]+'-picker'
            jsonP.appendChild(textInputOne)
            jsonP.appendChild(textInputTwo)
            allJsonHolder.appendChild(jsonP)
            allJsonHolder.appendChild(fancyLine)
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
        var buttonGroupDiv = document.getElementById("jsonButtons");
        buttonGroupDiv.appendChild(jsonFileButton)

        var jsonDivMain = document.getElementById("global-json-changer");
        jsonDivMain.appendChild(buttonGroupDiv)

        jsonFileButton.addEventListener("click", function() {
              //console.log(jsonFileButton.id)
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