var foto;
window.onload = function() {
 foto = new Foto();
}

if (!$.browser.mozilla) {
    window.alert("We suggest using Firefox browser for the best result. Otherwise some functionality might not work so correctly.")
}

function selectImage() {
  document.getElementById("foto-file").click();
  document.getElementById("img-container").style.width = "400px";
  document.getElementById("img-container").style.height = "400px";
}

function makeGrayScale() { foto.grayscale(); }
function makeBright() { foto.makeBright(); }
function makeDark() { foto.makeDark(); }
function makeBlur() { foto.applyBlurFilter(); }
function makeEmboss() { foto.applyEmbossFilter(); }
function makeSharp() { foto.applySharpFilter(); }
function download() { foto.export(); }
function openColorpicker(){
    document.getElementById("color-picker").click();
}
function makeColorize(elem){
    var color = elem.value;
    foto.colorize(color);
}
function openColorizeColorPicker(){
    document.getElementById("colorize-color-picker").click();
}

function applyColorFilter(elem){
    var color = elem.value;
    foto.applyColorFilter(color);
}

function makeTransparent() {
    foto.makeTransparent();
}

function crop() {
    foto.cropSelected();
}

function viewIcon() {
    var img=document.getElementById("foto-image");
    var canvas=document.getElementById("can");

    // Use the width for both width and height, most common icon launchers has the same width and height
    var squareLength = img.width;
    canvas.width = squareLength;
    canvas.height = squareLength;
    ctx=canvas.getContext("2d");

    // Shadow & Glow
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 5;

    // Fit my image into the canvas
    var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

    // Get radius from my range and apply my changes
    var radius = document.getElementById("radius-range").value;

    ctx.save();
    ctx.globalCompositeOperation="destination-out";
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(10,0);
    ctx.arcTo(0,0,0,10,radius);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(squareLength,0);
    ctx.lineTo(90,0);
    ctx.arcTo(squareLength,0,squareLength,10,radius);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0,squareLength);
    ctx.lineTo(0,90);
    ctx.arcTo(0,squareLength,10,squareLength,radius);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(squareLength,squareLength);
    ctx.lineTo(90,squareLength);
    ctx.arcTo(squareLength,squareLength,squareLength,90,radius);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}
function saveIcon() {
    var socket = io.connect('127.0.0.1:5001')
    var imgBuffer = $('#can')[0].toDataURL();
    socket.emit('imgBuffer', imgBuffer);
}

function fitBorder() {
    document.getElementById("img-container").style.width = document.getElementById("foto-image").offsetWidth+"px";
    document.getElementById("img-container").style.height = document.getElementById("foto-image").offsetHeight+"px";
    document.getElementById("img-container").style.borderRadius = document.getElementById("radius-amount").value+"px";
    document.getElementById("foto-image").style.borderRadius = document.getElementById("radius-amount").value+"px";
}

function resetImage() {
    console.log("resetImage")
}

function updatesRadiusText(){
    document.getElementById("radius-range").addEventListener("input", function(){
        document.getElementById("radius-amount").value = this.value;
    });
}

function updateRadiusRange(){
    document.getElementById("radius-amount").addEventListener("input", function(){
        document.getElementById("radius-range").value = this.value;
    });
}

function flipVertically() {
    foto.flipVertically();
}

function rotate(elem) {
    foto.rotate(elem.value);
}

// document.body.style.backgroundImage = 'url(../image/white.png)'
$(document).ready(function () {
  $('body').append('<div style=\'\' id=\'loadingDiv\'><div class=\'loader\'>Loading...</div></div>')
  $(window).on('load', function () {
    setTimeout(removeLoader, 500)
  })
  function removeLoader () {
    $('#loadingDiv').fadeOut(500, function () {
      $('#loadingDiv').remove()
    })
  }
});
