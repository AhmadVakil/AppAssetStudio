var socket = io.connect('127.0.0.1:5001')

$(document).ready(function(){
    $('#formID input[type=checkbox]').attr('checked',false);
    document.getElementById('roundCorner').disabled = true;
    document.getElementById('dropShadow').disabled = true;
    document.getElementById('roundCorner').style.opacity = 0.5;
    document.getElementById('dropShadow').style.opacity = 0.5;
    document.getElementById('dropShadowDiv').style.opacity = 0.5;
    document.getElementById('radiusLabel').style.opacity = 0.5;
    $('#readURL').val('');
});

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
    repoInfoText.innerHTML = 'Available Resources'
    var repositoriesMenu = document.createElement('select')
    // repositoriesMenu.addEventListener('change', openRepo)
    repositoriesMenu.id = 'repositoriesDropDownMenu'
    var defaultOption = document.createElement('option')
    defaultOption.innerHTML = 'Select resource or repository'
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

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
        document.getElementById('roundCorner').disabled = false;
        document.getElementById('dropShadow').disabled = false;

    } else {
        document.getElementById('roundCorner').disabled = true;
        document.getElementById('dropShadow').disabled = true;
    }
}

function giveRadius(range) {
     document.getElementById("blah").style.borderRadius = range.value+"px";
     document.getElementById("radiusTextValue").value = range.value+"px";
}

function dropShadow(range) {
     document.getElementById("blah").style.borderRadius = range.value+"px";
     document.getElementById("shadowTextValue").value = range.value+"px";
}

document.getElementById('roundCorner').addEventListener("change", function(){
  if (this.checked) {
    console.log("checked")
    document.getElementById('roundCornerDiv').style.opacity = 1;
    document.getElementById('radiusTextValue').disabled = false;
    document.getElementById('vol').disabled = false;

  } else {
    console.log("unchecked")
    document.getElementById('radiusTextValue').value = "0px";
    document.getElementById('vol').value = 0;
    document.getElementById('radiusTextValue').disabled = true;
    document.getElementById('vol').disabled = true;
    document.getElementById('roundCornerDiv').style.opacity = 0.5;
  }
});

document.getElementById('dropShadow').addEventListener("change", function(){
  if (this.checked) {
    console.log("checked")
    document.getElementById('dropShadowDiv').style.opacity = 1;
    document.getElementById('shadowTextValue').disabled = false;
    document.getElementById('shadowVol').disabled = false;
  } else {
    console.log("unchecked")
    document.getElementById('shadowTextValue').value = "0px";
    document.getElementById('shadowVol').value = 0;
    document.getElementById('shadowTextValue').disabled = true;
    document.getElementById('shadowVol').disabled = true;
    document.getElementById('dropShadowDiv').style.opacity = 0.5;
  }
});