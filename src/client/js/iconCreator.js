var socket = io.connect('127.0.0.1:5001')

$(document).ready(function(){
    /*if (sessionStorage.getItem('imgBuffer') !== "") {
        var imgBuffer = sessionStorage.getItem('imgBuffer')
        $('#mainImgPreview').attr('src', imgBuffer);
        $('#ios').attr('src', imgBuffer);
        $('#xxxhdpi').attr('src', imgBuffer);
        $('#xxhdpi').attr('src', imgBuffer);
        $('#xhdpi').attr('src', imgBuffer);
        $('#hdpi').attr('src', imgBuffer);
        $('#mdpi').attr('src', imgBuffer);
    }*/
})

function uploadBackgroundImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            sessionStorage.setItem("iconBackgroundImage", e.target.result);
            //socket.emit("iconBackgroundImage", e.target.result)
            var icDetails = {
                backgroundImage: sessionStorage.getItem("iconBackgroundImage"),
                useBackgroundColor: document.getElementById("colorBackground").checked,
                backgroundColor: document.getElementById("favcolor").value,
                transparentBackground: document.getElementById("transparentBackground").checked,
                onTopImage: sessionStorage.getItem("onTopImage"),
                scaleAmount: document.getElementById("scaleVol").value
            }
            socket.emit("manipulateIcon", icDetails)
        };
        //sessionStorage.setItem("imgBuffer", "");
        reader.readAsDataURL(input.files[0]);
    }
}

function uploadOnTopImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            sessionStorage.setItem("onTopImage", e.target.result);
            //console.log(e.target.result)
            var icDetails = {
                backgroundImage: sessionStorage.getItem("iconBackgroundImage"),
                useBackgroundColor: document.getElementById("colorBackground").checked,
                backgroundColor: document.getElementById("favcolor").value,
                transparentBackground: document.getElementById("transparentBackground").checked,
                onTopImage: sessionStorage.getItem("onTopImage"),
                scaleAmount: document.getElementById("scaleVol").value
            }
            socket.emit("manipulateIcon", icDetails)
        }
        //sessionStorage.setItem("imgBuffer", "");
        reader.readAsDataURL(input.files[0]);
    }
}

socket.on("loadingImage", function(msg) {
    $('#mainImgPreview').attr('src', "../images/loading.gif");
    $('#ios').attr('src', "../images/loading.gif");
    $('#xxxhdpi').attr('src', "../images/loading.gif");
    $('#xxhdpi').attr('src', "../images/loading.gif");
    $('#xhdpi').attr('src', "../images/loading.gif");
    $('#hdpi').attr('src', "../images/loading.gif");
    $('#mdpi').attr('src', "../images/loading.gif");
})

socket.on('iconUpdates', function (finalResult) {
  sessionStorage.setItem("imgBuffer", finalResult);
  $('#mainImgPreview').attr('src', finalResult);
  $('#ios').attr('src', finalResult);
  $('#xxxhdpi').attr('src', finalResult);
  $('#xxhdpi').attr('src', finalResult);
  $('#xhdpi').attr('src', finalResult);
  $('#hdpi').attr('src', finalResult);
  $('#mdpi').attr('src', finalResult);
})

function imageBackground(radio) {
   if (radio.checked) {
        uploadBackgroundImage(document.getElementById("uploadBackgroundImage"))
    }

}

function colorBackground(color) {
console.log(document.getElementById("favcolor").value)
    if (document.getElementById("colorBackground").checked) {
        sessionStorage.setItem("iconBackgroundImage", "transparent");
        var icDetails = {
                backgroundImage: "transparent",
                useBackgroundColor: document.getElementById("colorBackground").checked,
                backgroundColor: document.getElementById("favcolor").value,
                transparentBackground: document.getElementById("transparentBackground").checked,
                onTopImage: sessionStorage.getItem("onTopImage"),
                scaleAmount: document.getElementById("scaleVol").value
        }
        socket.emit("manipulateIcon", icDetails)
    }
}

function transparentBackground(radio) {
    console.log(sessionStorage.getItem("onTopImage"))
    if (radio.checked ) {
        var icDetails = {
            useBackgroundColor: document.getElementById("colorBackground").checked,
            transparentBackground: document.getElementById("transparentBackground").checked,
            onTopImage: sessionStorage.getItem("onTopImage"),
            scaleAmount: document.getElementById("scaleVol").value
        }
        socket.emit("manipulateIcon", icDetails)
    }
}

document.getElementById('sendToIconCropper').addEventListener("click", function(){
    window.location.replace('iconCropper.html');
})

function resetIcons(){
    if (confirm('Do you want to delete your image?\nThis will delete your image from the browser.\n')) {
        sessionStorage.setItem("imgBuffer", "");
        location.reload();
    }
}

function scaleIcon(scaleAmount) {
    document.getElementById("scaleAmountText").innerHTML = scaleAmount.value;
    var icDetails = {
        backgroundImage: document.getElementById("imageBackground").checked ? sessionStorage.getItem("iconBackgroundImage") : "transparent",
        useBackgroundColor: document.getElementById("colorBackground").checked,
        backgroundColor: document.getElementById("favcolor").value,
        transparentBackground: document.getElementById("transparentBackground").checked,
        onTopImage: sessionStorage.getItem("onTopImage"),
        scaleAmount: document.getElementById("scaleVol").value
    }
    socket.emit("manipulateIcon", icDetails)
}
