/*var socket = io.connect('127.0.0.1:5001')
var foto;
var toolboxWindow = document.getElementById("toolboxWindow");
*/
function sendtoIconCropper(){
    if (confirm("Are you sure you want to leave this page?\nPress Ok to send your image to crop page inorder to use in mobile application resources")){
        var canvas = document.getElementById('canvas');
        var dataURL = canvas.toDataURL();
        sessionStorage.setItem("imgBuffer", dataURL);
        window.location.replace('iconCropper.html');
    }
}