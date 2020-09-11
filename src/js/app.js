var startButton = document.getElementById('start')
var ConvertButtonPage = document.getElementById('Convert')
let BR=document.createElement('BR')

    var childSection = document.createElement("div")
    childSection.style.margin = '25px'
    childSection.style.textAlign = 'center';
    document.body.style.backgroundImage = "url('js/infomaker.jpg')"

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

var repos = document.getElementById('repositories')
var repoName
var configuration
//var socket = io.connect('127.0.0.1:5001')
repos.addEventListener('change', myfunction2)


var moduleBackgroundColor = document.getElementById('moduleBackgroundColor-hex')
var primaryColorDark = document.getElementById('primaryColorDark-hex')
var secondaryColor = document.getElementById('secondaryColor-hex')
var accentColor = document.getElementById('accentColor-hex')
var textColor = document.getElementById('textColor-hex')
var jsonButton = document.getElementById('view-json')
var appIconButton = document.getElementById('view-icon-picker')
var handlesChanger = document.getElementById('view-handles')

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
        repoName = repos.value
        console.log('reponame======>>>> '+repoName)
        configuration = { repoNames : repoName }
        //var delivery = new Delivery(socket)

          // console.log(file.files[0].name)
        socket.emit('openThisRepo', { repoNames : repoName });
        console.log(repoName)
      }

    socket.on('Repositories', function (data){
        var repoList = document.getElementById("repositories")
        for (var i=0; i<data.length; i++){
         var tempOption = document.createElement('option')
         tempOption.innerHTML = data[i]
         repoList.appendChild(tempOption)
        }
    })

    socket.on('configChanger', function (data) {
      console.log(data.fields)
      var globalConfig

      socket.on('CurrentConfigs', function (data) {
        console.log(data.primaryColor)
        globalConfig = data
        x.value ='#'+data.primaryColor
        /*primaryColorDark.value = data.primaryColorDark
        secondaryColor.value =data.secondaryColor
        accentColor.value = data.accentColor
        moduleBackgroundColor.value = data.moduleBackgroundColor
        textColor.value = data.textColor*/

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

      for (var i=0; i<data.fields.length;i++){
        var allJsonHolder= document.getElementById('global-json-changer')
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
              console.log('TEST')
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

        $.ajax
              ({
                type: "POST",
                url: "http://localhost:8000",
                crossDomain:true,
                dataType: "json",
                data:JSON.stringify({colorShortHex: AARRGGBB , color: hexColor.value , colorNoHashTag: noTag, iconName: file.files[0].name, targetRepo: repoNames, moduleBackgroundColor: moduleBackgroundColor.value, primaryColorDark:primaryColorDark.value, secondaryColor:secondaryColor.value, accentColor:accentColor.value, textColor: textColor.value })
              }).done(function ( data ) {
                console.log(configuration.repoNames)
                    /*alert("Your requested color is successfully sent.");*/
                })
      })