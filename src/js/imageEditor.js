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
    // Find a solution to fit the image with the border
    document.getElementById("img-container").style.width = document.getElementById("foto-image").offsetWidth+"px";
    document.getElementById("img-container").style.height = document.getElementById("foto-image").offsetHeight+"px";
    console.log(document.getElementById("foto-image").offsetWidth)
    // Delete until here if no solution found
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
