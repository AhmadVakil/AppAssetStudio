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

function fitBorder() {
    document.getElementById("img-container").style.width = document.getElementById("foto-image").offsetWidth+"px";
    document.getElementById("img-container").style.height = document.getElementById("foto-image").offsetHeight+"px";
    document.getElementById("img-container").style.borderRadius = document.getElementById("radius-amount").value+"px";
    document.getElementById("foto-image").style.borderRadius = document.getElementById("radius-amount").value+"px";
}

function resetImage() {
    console.log("resetImage")
}

function closeImage() {
    console.log("closeImage")
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
