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
    }
});

function uploadBackgroundImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            sessionStorage.setItem("iconHasBackgroundImage", true);
            sessionStorage.setItem("iconHasBackgroundColor", false);
            sessionStorage.setItem("iconHasBackgroundTransparent", false);
            sessionStorage.setItem("iconBackgroundImage", e.target.result);
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
    }
}

function imageBackground(radio) {
    if (radio.checked === true) {
        sessionStorage.setItem("iconHasBackgroundImage", true);
        sessionStorage.setItem("iconHasBackgroundColor", false);
        sessionStorage.setItem("iconHasBackgroundTransparent", false);
    } else {
        document.getElementById("uploadBackgroundImage").disabled = true
    }
}

function colorBackground(color) {
    sessionStorage.setItem("iconHasBackgroundImage", false);
    sessionStorage.setItem("iconHasBackgroundColor", true);
    sessionStorage.setItem("iconHasBackgroundTransparent", false);
    sessionStorage.setItem("iconBackgroundColor", color.value);
}

function transparentBackground(radio) {
    if (radio.checked === true) {
        sessionStorage.setItem("iconHasBackgroundImage", false);
        sessionStorage.setItem("iconHasBackgroundColor", false);
        sessionStorage.setItem("iconHasBackgroundTransparent", true);
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
