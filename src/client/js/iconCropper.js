var socket = io.connect('127.0.0.1:5001')

$(document).ready(function(){
    $('#formID input[type=checkbox]').attr('checked',false);
    document.getElementById('roundCorner').disabled = true;
    document.getElementById('dropShadow').disabled = true;
    document.getElementById('iconCropperSubmitButton').disabled = true;
    document.getElementById('roundCorner').style.opacity = 0.5;
    document.getElementById('dropShadow').style.opacity = 0.5;
    document.getElementById('dropShadowText').style.opacity = 0.5;
    document.getElementById('roundCornerText').style.opacity = 0.5;
    document.getElementById('iconSizesDiv').style.opacity = 0.5;
    document.getElementById('iconCropperSubmitButton').style.display = "none";
    document.getElementById('radiusTextValue').value = "Disabled";
    document.getElementById('shadowTextValue').value = "Disabled";
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
        //console.log($('#blah')[0].toDataURL());

        // Now our file is loaded into browser therefore we enable elements
        document.getElementById('roundCorner').disabled = false;
        document.getElementById('dropShadow').disabled = false;
        document.getElementById('roundCorner').style.opacity = 1;
        document.getElementById('dropShadow').style.opacity = 1;
        document.getElementById('dropShadowText').style.opacity = 1;
        document.getElementById('roundCornerText').style.opacity = 1;
        document.getElementById('iconCropperSubmitButton').style.display = "inline-block";

        // Enabling Checkboxes for icon sizes
        document.getElementById('iOSCheckbox').disabled = false;
        document.getElementById('hdpiCheckbox').disabled = false;
        document.getElementById('mdpiCheckbox').disabled = false;
        document.getElementById('xhdpiCheckbox').disabled = false;
        document.getElementById('xxhdpiCheckbox').disabled = false;
        document.getElementById('xxxhdpiCheckbox').disabled = false;
        document.getElementById('iconSizesDiv').style.opacity = 1;
    } else {
        document.getElementById('roundCorner').disabled = true;
        document.getElementById('dropShadow').disabled = true;
    }
}

function giveRadius(range) {
     document.getElementById("blah").style.borderRadius = range.value;
     document.getElementById("radiusTextValue").value = range.value;
}

function dropShadow(range) {
     document.getElementById("blah").style.borderRadius = range.value;
     document.getElementById("shadowTextValue").value = range.value;
}

document.getElementById('roundCorner').addEventListener("change", function(){
  if (this.checked) {
    console.log("checked")
    document.getElementById('radiusTextValue').value = "0";
    document.getElementById('roundCornerDiv').style.opacity = 1;
    document.getElementById('radiusTextValue').disabled = false;
    document.getElementById('vol').disabled = false;

  } else {
    console.log("unchecked")
    document.getElementById('radiusTextValue').value = "Disabled";
    document.getElementById('vol').value = 0;
    document.getElementById('radiusTextValue').disabled = true;
    document.getElementById('vol').disabled = true;
    document.getElementById('roundCornerDiv').style.opacity = 0.5;
  }
});

document.getElementById('dropShadow').addEventListener("change", function(){
  if (this.checked) {
    console.log("checked")
    document.getElementById('shadowTextValue').value = "0";
    document.getElementById('dropShadowDiv').style.opacity = 1;
    document.getElementById('shadowTextValue').disabled = false;
    document.getElementById('shadowVol').disabled = false;
  } else {
    console.log("unchecked")
    document.getElementById('shadowTextValue').value = "Disabled";
    document.getElementById('shadowVol').value = 0;
    document.getElementById('shadowTextValue').disabled = true;
    document.getElementById('shadowVol').disabled = true;
    document.getElementById('dropShadowDiv').style.opacity = 0.5;
  }
});

document.getElementById('iconCropperSubmitButton').addEventListener("click", function(){
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    async function sendIc() {
        const file = document.getElementById("readURL").files[0];
        var imgBuffer = (await toBase64(file))
        var icDetails = {
            borderRadiusAmount : document.getElementById('radiusTextValue').value,
            shadowAmount : document.getElementById('shadowTextValue').value,
            ios : document.getElementById("iOSCheckbox").checked,
            hdpi : document.getElementById("hdpiCheckbox").checked,
            mdpi : document.getElementById("mdpiCheckbox").checked,
            xhdpi : document.getElementById("xhdpiCheckbox").checked,
            xxhdpi : document.getElementById("xxhdpiCheckbox").checked,
            xxxhdpi : document.getElementById("xxxhdpiCheckbox").checked,
            repo : document.getElementById("repositoriesDropDownMenu").value+"/",
            imgBuffer : imgBuffer
        }
        socket.emit('cropIcon', icDetails)
    }
    sendIc()
})
