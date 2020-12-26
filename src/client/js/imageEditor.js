var socket = io.connect('127.0.0.1:5001')
var foto;
window.onload = function() {
 foto = new Foto();
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
    var imgBuffer = $('#can')[0].toDataURL();
    sessionStorage.setItem("imgBuffer", imgBuffer);
    window.location.replace('iconCropper.html');
    //socket.emit('sendForCrop', imgBuffer);
}

socket.on('imgBuffer', function (imgBuffer) {
    console.log(imgBuffer)
})

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


//Make the DIV element draggagle:
dragElement(document.getElementById("toolboxWindow"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function openCloseToolBox() {
  var x = document.getElementById("toolboxWindow");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}