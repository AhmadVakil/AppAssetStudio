var socket = io.connect('127.0.0.1:5001')

$(document).ready(function(){
    if (sessionStorage.getItem('imgBuffer') !== "") {
        var imgBuffer = sessionStorage.getItem('imgBuffer')
        $('#mainImgPreview').attr('src', imgBuffer);
        $('#ios').attr('src', imgBuffer);
        $('#xxxhdpi').attr('src', imgBuffer);
        $('#xxhdpi').attr('src', imgBuffer);
        $('#xhdpi').attr('src', imgBuffer);
        $('#hdpi').attr('src', imgBuffer);
        $('#mdpi').attr('src', imgBuffer);
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
        $('#formID input[type=checkbox]').attr('checked',false);
        document.getElementById('roundCorner').disabled = true;
        document.getElementById('roundCorner').checked = false;
        document.getElementById('dropShadow').disabled = true;
        document.getElementById('dropShadow').checked = false;
        document.getElementById('iconCropperSubmitButton').disabled = true;
        document.getElementById('roundCorner').style.opacity = 0.5;
        document.getElementById('dropShadow').style.opacity = 0.5;
        document.getElementById('dropShadowText').style.opacity = 0.5;
        document.getElementById('roundCornerText').style.opacity = 0.5;
        document.getElementById('iconSizesDiv').style.opacity = 0.5;
        document.getElementById('iconCropperSubmitButton').style.display = "none";
        document.getElementById('radiusTextValue').value = "Disabled";
        document.getElementById('radiusTextValue').disabled = true;
        document.getElementById('shadowTextValue').value = "Disabled";
        document.getElementById('shadowTextValue').disabled = true;
        $('#readURL').val('');
    }
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
            $('#mainImgPreview').attr('src', e.target.result);
            $('#ios').attr('src', e.target.result);
            $('#xxxhdpi').attr('src', e.target.result);
            $('#xxhdpi').attr('src', e.target.result);
            $('#xhdpi').attr('src', e.target.result);
            $('#hdpi').attr('src', e.target.result);
            $('#mdpi').attr('src', e.target.result);
        };
        sessionStorage.setItem("imgBuffer", "");
        reader.readAsDataURL(input.files[0]);

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
    document.getElementById("mainImgPreview").style.borderRadius = range.value*10+"px";
    document.getElementById("xxxhdpi").style.borderRadius = range.value*10+"px";
    document.getElementById("xxhdpi").style.borderRadius = range.value*7+"px";
    document.getElementById("xhdpi").style.borderRadius = range.value*5+"px";
    document.getElementById("hdpi").style.borderRadius = range.value*3+"px";
    document.getElementById("mdpi").style.borderRadius = range.value*2+"px";
    document.getElementById("radiusTextValue").value = range.value;
}

function dropShadow(range) {
    document.getElementById("mainImgPreview").style.boxShadow = "0px 0px "+range.value+"px black";
    document.getElementById("xxxhdpi").style.boxShadow = "0px 0px "+range.value+"px black";
    document.getElementById("xxhdpi").style.boxShadow = "0px 0px "+range.value+"px black";
    document.getElementById("xhdpi").style.boxShadow = "0px 0px "+range.value+"px black";
    document.getElementById("hdpi").style.boxShadow = "0px 0px "+range.value+"px black";
    document.getElementById("mdpi").style.boxShadow = "0px 0px "+range.value+"px black";
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
        var zeroRadius = "0px"
        document.getElementById('radiusTextValue').value = "Disabled";
        document.getElementById('vol').value = 0;
        document.getElementById('radiusTextValue').disabled = true;
        document.getElementById('vol').disabled = true;
        document.getElementById('roundCornerDiv').style.opacity = 0.5;
        document.getElementById("mainImgPreview").style.borderRadius = zeroRadius;
        document.getElementById("xxxhdpi").style.borderRadius = zeroRadius;
        document.getElementById("xxhdpi").style.borderRadius = zeroRadius;
        document.getElementById("xhdpi").style.borderRadius = zeroRadius;
        document.getElementById("hdpi").style.borderRadius = zeroRadius;
        document.getElementById("mdpi").style.borderRadius = zeroRadius;
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
        var zeroShadow = "0px 0px 0px"
        document.getElementById('shadowTextValue').value = "Disabled";
        document.getElementById('shadowVol').value = 0;
        document.getElementById('shadowTextValue').disabled = true;
        document.getElementById('shadowVol').disabled = true;
        document.getElementById('dropShadowDiv').style.opacity = 0.5;
        document.getElementById("mainImgPreview").style.boxShadow = zeroShadow;
        document.getElementById("xxxhdpi").style.boxShadow = zeroShadow;
        document.getElementById("xxhdpi").style.boxShadow = zeroShadow;
        document.getElementById("xhdpi").style.boxShadow = zeroShadow;
        document.getElementById("hdpi").style.boxShadow = zeroShadow;
        document.getElementById("mdpi").style.boxShadow = zeroShadow;
    }
});

document.getElementById('iconCropperSubmitButton').addEventListener("click", function(){
    var ios, hdpi, mdpi, xhdpi, xxhdpi, xxxhdpi
    ios = document.getElementById("iOSCheckbox").checked
    hdpi = document.getElementById("hdpiCheckbox").checked
    mdpi = document.getElementById("mdpiCheckbox").checked
    xhdpi = document.getElementById("xhdpiCheckbox").checked
    xxhdpi = document.getElementById("xxhdpiCheckbox").checked
    xxxhdpi = document.getElementById("xxxhdpiCheckbox").checked
    if (document.getElementById("repositoriesDropDownMenu").value === "Select resource or repository") {
        alert("Please choose a resource");
        document.getElementById("repositoriesDropDownMenu").style.backgroundColor = "red"
    } else if (!(ios || hdpi || mdpi || xhdpi || xxhdpi || xxxhdpi)) {
        alert("Please choose at least one size to proceed!");
    } else {
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
        const file = document.getElementById("readURL").files[0];
        async function sendIc() {
            var imgBuffer = sessionStorage.getItem('imgBuffer') !== "" ? sessionStorage.getItem('imgBuffer') : (await toBase64(file))
            var icDetails = {
                borderRadiusAmount : document.getElementById('radiusTextValue').value,
                dropShadow : document.getElementById("dropShadow").checked,
                shadowAmount : document.getElementById('shadowTextValue').value,
                ios : ios,
                hdpi : hdpi,
                mdpi : mdpi,
                xhdpi : xhdpi,
                xxhdpi : xxhdpi,
                xxxhdpi : xxxhdpi,
                repo : document.getElementById("repositoriesDropDownMenu").value+"/",
                imgBuffer : imgBuffer
            }
            socket.emit('cropIcon', icDetails)
        }
        sendIc()
    }
})

function resetIcons(){
    if (confirm('Do you want to delete your image?\nThis will delete your image from the browser.\n')) {
        sessionStorage.setItem("imgBuffer", "");
        location.reload();
    }
}
