
//var startButton = document.getElementById('start')
//var ConvertButtonPage = document.getElementById('Convert')
let BR = document.createElement('BR')
var paddingAmount

var childSection = document.createElement('div')
childSection.style.margin = '25px'
childSection.style.textAlign = 'center'
    document.body.style.backgroundImage = "url('../image/grey.jpg')"

var fileSection = document.createElement('div')
fileSection.style.margin = '25px'
fileSection.className = 'sectionsDivider'

var file = document.getElementById('file')
var FilePickerSection = document.getElementById('file-drop-part')
var paddingValue = document.getElementById('paddingValue')
paddingValue.value = 0
var paddingNumber = document.getElementById('paddingNumber')
paddingNumber.value = 0
paddingNumber.style.width = '50px'

var icBackColor = document.getElementById('icBackColor')
icBackColor.addEventListener('change', icBackColorViewr)

function icBackColorViewr () {
    var colorNumber
    for (var i = 1; i < 7; i++) {
      colorNumber += icBackColor.value.charAt[i]
    }
    console.log(colorNumber)
  }

paddingNumber.addEventListener('change', changePaddingNumber)

function changePaddingNumber () {
    paddingValue.value = paddingNumber.value
    paddingAmount = paddingNumber.value
  }

paddingValue.addEventListener('change', changePadding)
function changePadding () {
    paddingNumber.value = paddingValue.value
    paddingAmount = paddingValue.value
    console.log(paddingAmount)
  }
// background:url("../image/infomaker.jpg") ;
/*
//$("file-drop-part").on("change", function(){

  // Get a reference to the fileList
  var files = !!this.files ? this.files : [];

  // If no files were selected, or no FileReader support, return
  if ( !files.length || !window.FileReader ) return;

  // Only proceed if the selected file is an image
  if ( /^image/.test( files[0].type ) ) {

      // Create a new instance of the FileReader
      var reader = new FileReader();

      // Read the local file as a DataURL
      reader.readAsDataURL( files[0] );

      // When loaded, set image data as background of page
      reader.onloadend = function(){

          $("icViewer").css("background-image", "url(" + this.result + ")");

      }

  }

//})
  } */

var x = document.getElementById('colorTextInput')
x.setAttribute('type', 'text')
x.id = 'hexColor'
x.style.borderRadius = '5px'
x.value = '#'

var repos = document.getElementById('repositories')
var repoName
var configuration
// var socket = io.connect('127.0.0.1:5001')

var moduleBackgroundColor = document.getElementById('moduleBackgroundColor-hex')
var primaryColorDark = document.getElementById('primaryColorDark-hex')
var secondaryColor = document.getElementById('secondaryColor-hex')
var accentColor = document.getElementById('accentColor-hex')
var textColor = document.getElementById('textColor-hex')
var jsonButton = document.getElementById('view-json')
var appIconButton = document.getElementById('view-icon-picker')
var handlesChanger = document.getElementById('view-handles')

function myFunction () {
    var x = document.getElementById('global-json-changer')
        if (x.style.display === 'none') {
          x.style.display = 'block';
          jsonButton.style.backgroundColor = 'red'
        } else {
          x.style.display = 'none';
          jsonButton.style.backgroundColor = '#6484ec'
        }
  }

function iconPicker () {
     var x = document.getElementById('file-drop-part')
    if (x.style.display === 'none') {
      x.style.display = 'block';
      appIconButton.style.backgroundColor = 'red'
    } else {
      x.style.display = 'none';
      appIconButton.style.backgroundColor = '#6484ec'
    }
   }

function handles () {
     var x = document.getElementById('Color-changer-part')
    if (x.style.display === 'none') {
      x.style.display = 'block';
      handlesChanger.style.backgroundColor = 'red'
    } else {
      x.style.display = 'none';
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
canvas.style.marginLeft = '300px'
canvas.style.marginTop = '10px'
canvas.style.padding = '0px'
canvas.style.boxShadow = '0px 0px 20px #000000'
canvas.style.transition = 'all 1s'

var canvas2 = document.getElementById('canvas2')
canvas2.style.width = '88px'
canvas2.style.height = '44px'
canvas2.style.backgroundColor = 'white'
canvas2.style.textAlign = 'center'
canvas2.style.boxShadow = '0px'
canvas2.style.opacity = '1'
canvas2.style.marginLeft = '300px'
canvas2.style.marginTop = '10px'
      // canvas2.style.marginBottom = '50px'
canvas2.style.padding = '0px'
canvas2.style.boxShadow = '0px 0px 20px #000000'
canvas2.style.transition = 'all 1s'

var closeIssue = document.createElement('img')
closeIssue.style.backgroundImage = "url('js/close.png')"
closeIssue.style.width = '70%'
closeIssue.style.height = '70%'
closeIssue.src = 'js/close.png'
closeIssue.style.verticalAlign = 'middle'

var openIssue = document.createElement('img')
openIssue.style.backgroundImage = "url('js/open.png')"
openIssue.style.width = '70%'
openIssue.style.height = '70%'
openIssue.src = 'js/open.png'
openIssue.style.verticalAlign = 'middle'

canvas.appendChild(closeIssue)
canvas2.appendChild(openIssue)



x.addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode
    if (key === 13) { // 13 is enter
      canvas.style.backgroundColor = x.value
      canvas2.style.backgroundColor = x.value
      console.log(x.value)
    }
    })

var submit = document.getElementById('button')
submit.innerHTML = 'Submit'
submit.className = 'button'
submit.style.width = '170px'
submit.style.height = '80px'
var ImageIsSent = false
var socket = io.connect('127.0.0.1:5001')

socket.on('Repositories', function (data) {
      var repoList = document.getElementById('repositories')
      for (var i = 0; i < data.length; i++) {
          var tempOption = document.createElement('option')
          tempOption.innerHTML = data[i]
          repoList.appendChild(tempOption)
        }
    })
    // var globalJsonConfig
var globalConfig
var desireConfig
socket.on('configChanger', function (data) {
      console.log(data.fields)
      desireConfig = data

      socket.on('CurrentConfigs', function (data) {
        console.log(data.primaryColor)
        globalConfig = data
        x.value = '#' + data.primaryColor
        /*primaryColorDark.value = data.primaryColorDark
        secondaryColor.value =data.secondaryColor
        accentColor.value = data.accentColor
        moduleBackgroundColor.value = data.moduleBackgroundColor
        textColor.value = data.textColor */

        x.addEventListener('change', myfunction)
        function myfunction () {
          if (x.value != data.primaryColor) {
            x.style.backgroundColor = 'green'
          } else {
            x.style.backgroundColor = 'white'
          }
        }

        // document.getElementById('colorTextInput').innerHTML = data.primaryColor
       // socket.emit('my other event', { my: 'data' });
      })

      for (var i = 0; i < data.fields.length; i++) {
        var allJsonHolder = document.getElementById('global-json-changer')
        var fancyLine = document.createElement('hr')
        var lineBreaker = document.createElement('br')

        var jsonDiv = document.createElement('div')
        jsonDiv.id = data.fields[i].jsonKeyPath + '-div'
        jsonDiv.className = 'json-div'
        jsonDiv.innerHTML = data.fields[i].title + '<br>'

        /*var radioOne= document.createElement('input')
        radioOne.type='radio'
        radioOne.innerHTML = 'Use HEX number' */

        var textInputOne = document.createElement('input')
        textInputOne.addEventListener('change', divChanger)
        function divChanger () {
          textInputOne.style.color = 'green'
        }
        var textInputTwo = document.createElement('input')
        if (data.fields[i].type === 'color') {
          textInputOne.type = 'text'
          textInputOne.id = data.fields[i].jsonKeyPath

          textInputTwo.type = 'color'
          textInputTwo.id = data.fields[i].jsonKeyPath

            // Inserting values
            /* var jsonPath = data.fields[i].jsonKeyPath
            console.log(jsonPath)
            textInputOne.value = globalConfig.*/

          jsonDiv.appendChild(textInputOne)
          jsonDiv.appendChild(textInputTwo)
        }

        if (data.fields[i].type === 'number') {
          textInputOne.type = 'number'
          textInputOne.id = data.fields[i].jsonKeyPath
          textInputOne.style.width = '50px'
          jsonDiv.appendChild(textInputOne)
        }

        if (data.fields[i].type === 'text') {
          textInputOne.type = 'text'
          textInputOne.id = data.fields[i].jsonKeyPath
          jsonDiv.appendChild(textInputOne)
        }

        if (data.fields[i].type === 'boolean') {
          var booleanSelector = document.createElement('form')
          booleanSelector.id = data.fields[i].jsonKeyPath + ''

          var br = document.createElement('br')
          var yes = document.createElement('input')
          yes.type = 'radio'
          yes.innerHTML = 'Yes'
          yes.value = 'yes'


          var no = document.createElement('input')
          no.type = 'radio'
          no.innerHTML = 'No'
          no.value = 'no'

          booleanSelector.insertAdjacentText('beforeend', 'Yes')
          booleanSelector.appendChild(yes)
          booleanSelector.appendChild(br)
          booleanSelector.insertAdjacentText('beforeend', 'No')
          booleanSelector.appendChild(no)

          jsonDiv.appendChild(booleanSelector)

          yes.addEventListener('change', noUncheck)

          no.addEventListener('change', yesUncheck)

          function noUncheck () {
            if (yes.checked === true) {
                no.checked = false
              }
          }

          function yesUncheck () {
            if (no.checked === true) {
              yes.checked = false
            }
          }
        }


        /* var radioTwo= document.createElement('input')
        radioTwo.type='radio'
        radioTwo.insertAdjacentHTML = 'AAAA' */


       // jsonDiv.appendChild(radioOne)

       // jsonDiv.appendChild(lineBreaker)
       // jsonDiv.appendChild(radioTwo)



        allJsonHolder.appendChild(jsonDiv)
        allJsonHolder.appendChild(fancyLine)
      }
      var repos = document.getElementById('repositories')
      repos.addEventListener('change', myfunction2)
      function myfunction2 () {
        repoName = repos.value
        configuration = { repoNames: repoName }
        // var delivery = new Delivery(socket)

          // console.log(file.files[0].name)
        socket.emit('openThisRepo', { repoNames: repoName })
       
        socket.on('thisRepoGlobalConfig' , function (currentConfigs) {
          for (var i = 0; i < desireConfig.fields.length; i++) {
            let jKEY = desireConfig.fields[i].jsonKeyPath
            let subPath = desireConfig.fields[i].subPath
           // console.log('Key PATH========>'+jKEY)

            var tmp = document.getElementById(jKEY)

            if (desireConfig.fields[i].type === 'boolean') {
              // if (currentConfigs[i]=== true){
              console.log(desireConfig.fields[i])
                // tmp.value = 'Yes'
                // tmp.value = 'true'
                // document.getElementById().value = "yes"
                // var selector = document.getElementById(tmp.id)
                // console.log(tmp.id+'iddddddddddddddddddddddddddddddddddddddd')





                // selector= selector.value[1]
               // console.log(selector.length)
                // selector.
              //  yes.selected
                // selector.selectedIndex = "1"
                // selector.insertAdjacentElement('beforeend' , no)
                // x.selectedIndex = 1
                // var x = tmp.options[0].text;
                // tmp.innerHTML = x
                // $(tmp).val( 0 )
                // tmp.text = 'Yes'
              // }
            }

            if (subPath === true) {
                      /*jKEY.split('.').forEach(function(obj) {
                        console.log('OBJECT:   '+currentConfigs.remoteNotification.pubdateKey)
                       // console.log(currentConfigs.)
                      }) */

                      // var obj = {a: 1, b: 2, c: 3};
              var temp = jKEY.split('.')

              var tLength = temp.length

              switch (tLength) {
                        case 1:
                          var t0 = temp[0]
                          tmp.value = currentConfigs[t0]
                          break
                        case 2:
                          var t0 = temp[0]
                          var t1 = temp[1]
                          tmp.value = currentConfigs[t0][t1]
                          break
                        case 3:
                          var t0 = temp[0]
                          var t1 = temp[1]
                          var t2 = temp[2]
                          tmp.value = currentConfigs[t0][t1][t2]
                          break
                        case 4:
                          var t0 = temp[0]
                          var t1 = temp[1]
                          var t2 = temp[2]
                          var t3 = temp[3]
                          tmp.value = currentConfigs[t0][t1][t2][t3]
                          break
                        case 5:
                          var t0 = temp[0]
                          var t1 = temp[1]
                          var t2 = temp[2]
                          var t3 = temp[3]
                          var t4 = temp[4]
                          tmp.value = currentConfigs[t0][t1][t2][t3][t4]
                          break
                        case 6:
                          var t0 = temp[0]
                          var t1 = temp[1]
                          var t2 = temp[2]
                          var t3 = temp[3]
                          var t4 = temp[4]
                          var t5 = temp[5]
                          tmp.value = currentConfigs[t0][t1][t2][t3][t4][t5]
                          break
                        case 7:
                          var t0 = temp[0]
                          var t1 = temp[1]
                          var t2 = temp[2]
                          var t3 = temp[3]
                          var t4 = temp[4]
                          var t5 = temp[5]
                          var t6 = temp[6]
                          tmp.value = currentConfigs[t0][t1][t2][t3][t4][t5][t6]
                      }

                          // for (jKEY in currentConfigs) {
                            // console.log('RESULT ==================')
              console.log(`currentConfigs.${jKEY} = ${currentConfigs[t0][t1]}`)
                            
                         // }

                         // console.log('Length ======> '+currentConfigs.length())
                     
                     // console.log('index 0:    '+temp[0])
                     // console.log('index 1:    '+temp[1])
                     // var obj5 = i
                      //var obj6 = valueOf(temp[1])
                      //console.log('Index find:    '+currentConfigs)

                     /* for (jKEY in currentConfigs) {
                        //if (currentConfigs.hasOwnProperty(jKEY)) {
                          //var t = valueOf(temp[0].temp[1])
                          console.log('value is :::::::'+ JSON.parse(currentConfigs.indexOf(temp[1])));
                          
                        //}
                      }*/
                      /*currentConfigs.forEach(function(obj){
                          console.log('value  =====>>>  '+obj)

                      })*/
              
                      //console.log('Splitted:   '+temp)
              /*console.log(typeof(desireConfig.fields[i].object))
              console.log(desireConfig.fields[i].property)

              var obj = desireConfig.fields[i].object
              var property = desireConfig.fields[i].property

              currentConfig.obj.property
              obj2 = {}
              console.log(obj)
              //'{"name":"John", "age":30, "city":"New York"}'
              //property = JSON.parse(property)

              tmp.value = currentConfigs.obj.property
              console.log(currentConfigs.remoteNotification)*/
              //getProperty( currentConfigs[jKEY], object )
              /*function getProperty( propertyName, object ) {
                var parts = propertyName.split( "." ),
                 length = parts.length,
                 i,
                  property = object || this;
              
                for ( i = 0; i < length; i++ ) {
                  property = property[parts[i]];
                }
                tmp.value = property
                //return property;
              }*/
            }else {
              tmp.value = currentConfigs[jKEY]
            }
          }
        })
        console.log(repoName)
      }
    })

    /*<div id="primaryColorDark-div" class="json-div">
                           <input type="checkbox" name="primaryColorDark" id="primaryColorDark">Change Accent Color:<br><br>
                                <input type="radio" value="Hex Color">Use HEX color:
                                <input id="primaryColorDark-hex" type="text" value=""><br>

                                <input type="radio" name="primaryColorDark-picker" value="Hex Color">Use color picker:
                                <input id="primaryColorDark-picker" type="color"><br>
                           </div>
    <hr> */

submit.addEventListener('click', function () {
        var jsonArr = []

        var pendToSendConfig
        for (var i = 0; i < desireConfig.fields.length; i++) {
          var currentConfigTmp = document.getElementById(desireConfig.fields[i].jsonKeyPath)
          var name = desireConfig.fields[i].jsonKeyPath
          var value = currentConfigTmp.value
          console.log(value)
          jsonArr.push({
            name: value
          })
        }

        // Works
        console.log('Length:   ' + jsonArr[0].name)



        // $(function(){
        var socket = io.connect('127.0.0.1:5001')
        // var imageSelected = false
        socket.emit('globalConfigChanged', jsonArr)
        socket.emit('iconPadding', { padding: paddingAmount })
        socket.on('connect', function () {
            var delivery = new Delivery(socket)

            delivery.on('delivery.connect', function (delivery) {
               console.log('TEST')
              // $("input[type=submit]").click(
                // file()
               // function file(evt){
               var file = $('input[type=file]')[0].files[0]

               // console.log(file.files[0].name)
               delivery.send(file, configuration)

               // ImageIsSent = true
                // socket.send({foo: 'bar'})
                // evt.preventDefault()
               // }
              // })
             })

            delivery.on('send.success', function (fileUID) {
              console.log('file was successfully sent.')
              FilePickerSection.innerHTML = 'File is now sent to the server!'
              FilePickerSection.style.transition = 'all 2s'
            })
          })

        var hexColor = document.getElementById('hexColor')
        console.log(hexColor.value)
        var field = hexColor.value
        var noTag = ''
        for (var i = 1; i <= 6; i++) {
          noTag += field.charAt(i)
        }
        console.log(noTag)
        var stringColor = hexColor.value
        var AARRGGBB = '0x'
        for (var i = 1; i <= 6; i++) {
          AARRGGBB += stringColor.charAt(i)
        }
        AARRGGBB += 'ff'
        console.log(AARRGGBB)

        $.ajax
              ({
                type: 'POST',
                url: 'http://localhost:8000',
                crossDomain: true,
                dataType: 'json',
                data: JSON.stringify({colorShortHex: AARRGGBB, color: hexColor.value, colorNoHashTag: noTag, iconName: file.files[0].name, targetRepo: configuration.repoNames}),
                configData: JSON.stringify(jsonArr)
              }).done(function (data) {
                console.log(configuration.repoNames)
                    /* alert("Your requested color is successfully sent.");*/
              })
      })
