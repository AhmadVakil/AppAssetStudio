document.body.style.backgroundImage = 'url(../images/viewport-bg.png)'
const socket = io.connect('127.0.0.1:5001')
const BR = document.createElement('BR')
const editJsonFilesbutton = document.getElementById('editJsonFilesButton')
var repoName
var configuration
var vt
const container = document.getElementById('containerDiv')
const msg = document.getElementById('msg')
var reader = new VTree.reader.Object()
vt = new VTree(container)

function popUp () {
  var popup = document.getElementById('myPopup')
  popup.classList.toggle('show')
}

function editJsonFilesButton () {
  var x = document.getElementById('configFilesDiv')
  if (x.style.display === 'none') {
    x.style.display = 'block'
    editJsonFilesbutton.style.backgroundColor = 'red'
  } else {
    x.style.display = 'none'
    editJsonFilesbutton.style.backgroundColor = '#6484ec'
  }
}

function viewJsonDivs (jsonDivName) {
  var x = document.getElementById(jsonDivName + '-div')
  var pressedButton = document.getElementById(jsonDivName)
  if (x.style.display === 'none') {
    x.style.display = 'inline'
    pressedButton.style.backgroundColor = 'red'
  } else {
    x.style.display = 'none'
    pressedButton.style.backgroundColor = '#6484ec'
  }
}

function openRepo () {
  var mainButtons = document.getElementById('main-buttons')
  var repos = document.getElementById('repositoriesDropDownMenu')
  document.getElementById('configFilesDiv').innerHTML = ''
  repoName = repos.value
  if (repoName === 'Select Repository') {
    mainButtons.style.display = 'none'
  } else if (repoName !== 'Select Repository') {
    mainButtons.style.display = 'block'
    configuration = { repoNames: repoName }
    console.log(configuration.repoNames)
    document.getElementById('jsonPathDiv').innerHTML = ''
    socket.emit('openThisRepo', { repoNames: repoName })
    console.log(repoName)
  }
}

socket.on('Repositories', function (data) {
  var repoInfoText = document.createElement('h4')
  var error = document.createElement('i')
  var failedToLoadRepoNotification = document.getElementById('failedToLoadRepoNotification')
  var selectRepoNotification = document.getElementById('selectRepoNotification')
  error.className = 'fas fa-exclamation-triangle'
  repoInfoText.innerHTML = 'Its seems like there is no mobile application repository on the system. Please clone or contact your system administrator.<br><br>'
  var resourceDiv = document.getElementById('resource-picker')
  if (data.length !== 0) {
    failedToLoadRepoNotification.style.display = 'none'
    repoInfoText.innerHTML = 'Select from existing resource directories'
    var repositoriesMenu = document.createElement('select')
    repositoriesMenu.addEventListener('change', openRepo)
    repositoriesMenu.id = 'repositoriesDropDownMenu'
    var defaultOption = document.createElement('option')
    defaultOption.innerHTML = 'Select Repository'
    repositoriesMenu.appendChild(defaultOption)
    for (var i = 0; i < data.length; i++) {
      var tempOption = document.createElement('option')
      tempOption.innerHTML = data[i]
      repositoriesMenu.appendChild(tempOption)
    }
    resourceDiv.appendChild(repoInfoText)
    resourceDiv.appendChild(repositoriesMenu)
  } else {
    failedToLoadRepoNotification.style.display = 'block'
    resourceDiv.appendChild(error)
    resourceDiv.appendChild(repoInfoText)
  }
})

socket.on('foundJson', function (file) {
  var jsonFileButton = document.createElement('BUTTON')
  var fancyIcon = document.createElement('i')
  fancyIcon.className = 'fa fa-cog'
  fancyIcon.aria = 'true'
  jsonFileButton.className = 'groupButtons'
  var buttonText = document.createTextNode(' ' + file.name)
  jsonFileButton.appendChild(fancyIcon)
  jsonFileButton.appendChild(buttonText)
  jsonFileButton.id = file.path
  jsonFileButton.title = file.path
  var buttonGroupDiv = document.getElementById('configFilesDiv')
  buttonGroupDiv.appendChild(jsonFileButton)
  jsonFileButton.addEventListener('click', function () {
    var filePathInput = document.createElement('input')
    filePathInput.type = 'text'
    filePathInput.value = file.path
    filePathInput.title = file.path
    filePathInput.id = 'myInput'
    filePathInput.style.width = '50%'
    filePathInput.style.margin = '15px'
    var tooltipDiv = document.createElement('div')
    tooltipDiv.className = 'tooltip'
    var tooltiptext = document.createElement('span')
    tooltiptext.className = 'tooltiptext'
    tooltiptext.id = 'myTooltip'
    var clipboardIcon = document.createElement('i')
    clipboardIcon.className = 'far fa-clipboard'
    var copyToClipboardButton = document.createElement('button')
    copyToClipboardButton.appendChild(tooltiptext)
    copyToClipboardButton.appendChild(clipboardIcon)
    tooltipDiv.appendChild(copyToClipboardButton)
    copyToClipboardButton.addEventListener('mouseout', function () {
      var tooltip = document.getElementById('myTooltip')
    })
    copyToClipboardButton.addEventListener('click', function () {
      var copyText = document.getElementById('myInput')
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      document.execCommand('copy')
      var tooltip = document.getElementById('myTooltip')
    })
    var jsonPathDiv = document.getElementById('jsonPathDiv')
    jsonPathDiv.innerHTML = '<br>Path to this configuration:<br>'
    jsonPathDiv.appendChild(filePathInput)
    jsonPathDiv.appendChild(copyToClipboardButton)
    jsonPathDiv.appendChild(BR)
    socket.emit('fetchConfigFile', { configPath: jsonFileButton.id })
  })
})

function updateTree() {
  var s = document.getElementById('jsonTextarea').value
  msg.innerHTML = ''
  try {
    var jsonData = JSON.parse(s)
  } catch (e) {
    msg.innerHTML = 'JSON parse error: ' + e.message
  }
  var data = reader.read(jsonData)
  vt.data(data)
    .update()
}

function createSvgString() {
  document.getElementById('svg-text').value = vt.createSvgString()
}

document.getElementById('go-button').onclick = updateTree
document.getElementById('svg-button').onclick = createSvgString

socket.on('configData', function (configData) {
  var mainView = document.getElementById('mainView')
  mainView.style.display='block'
  var jsonTextarea = document.getElementById('jsonTextarea')
  jsonTextarea.value = JSON.stringify(configData)
  var saveJsonFileButton = document.getElementById('saveJsonFileButton')
  jsonTextarea.addEventListener('change', function () {
    if (jsonTextarea.value === configData) {
      saveJsonFileButton.disabled = true
    } else {
      saveJsonFileButton.disabled = false
    }
  })
  var event = new Event('change');
  jsonTextarea.dispatchEvent(event)
  updateTree()
})

function saveJsonFile() {
  var jsonTextarea = document.getElementById('jsonTextarea').value
  var pathToJson = document.getElementById('myInput').value
  socket.emit('saveJsonFile', jsonTextarea)
  socket.emit('pathToJson', pathToJson)
}

socket.on('jsonFileSaved', function () {
  alert('Success!\nData has been received by the server.')
})
