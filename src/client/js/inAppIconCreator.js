var socket = io.connect('127.0.0.1:5001')

function inAppIconUpdateView(){
    socket.emit('inAppIconUpdateView', {
      inAppIconPath: document.getElementById("inAppIconPath").value,
      inAppIconWidth: document.getElementById("inAppIconWidth").value,
      inAppIconHeight: document.getElementById("inAppIconHeight").value,
      inAppIconBgColor: document.getElementById("inAppIconBgColor").value,
      inAppIconOpacity: document.getElementById("inAppIconOpacity").value,
      inAppIconOnTopIcon: sessionStorage.getItem("inAppIconOnTopIcon") === "" || sessionStorage.getItem("inAppIconOnTopIcon") === null ? null : sessionStorage.getItem("inAppIconOnTopIcon"),
      inAppIconOnTopIconX: document.getElementById("inAppIconOnTopIconX").value,
      inAppIconOnTopIconY: document.getElementById("inAppIconOnTopIconY").value,
      inAppIconOnTopIconScale: document.getElementById("inAppIconOnTopIconScale").value,
      inAppIconOnTopOpacity: document.getElementById("inAppIconOnTopOpacity").value,
      inAppIconBorderRadius: document.getElementById("inAppIconBorderRadius").value
    })
}

socket.on('loadingImage', function (data) {
  document.getElementById("inAppIconResultImg").style.height = document.getElementById("inAppIconHeight").value+'px'
  document.getElementById("inAppIconResultImg").src = "../images/loading.gif"
})

socket.on("inAppIconUpdated", function(data) {
  document.getElementById("inAppIconResultImg").src = data.result
})

function uploadOnTopImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            sessionStorage.setItem("inAppIconOnTopIcon", e.target.result);
            inAppIconUpdateView()
        }
        reader.readAsDataURL(input.files[0]);
    }

}
