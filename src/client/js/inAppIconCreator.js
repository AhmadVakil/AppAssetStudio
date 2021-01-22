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
      inAppIconOnTopColor: document.getElementById("inAppIconOnTopColor").value,
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
                console.log(e.target.result)

            inAppIconUpdateView()
        }
        reader.readAsDataURL(input.files[0]);
    }

}

socket.on('Repositories', function (data) {
    var repoInfoText = document.createElement('h4')
    var error = document.createElement('i')
    var failedToLoadRepoNotification = document.getElementById('failedToLoadRepoNotification')
    var selectRepoNotification = document.getElementById('selectRepoNotification')
    error.className = 'fas fa-exclamation-triangle'
    repoInfoText.innerHTML = 'Its seems like there is no mobile application repository on the system.<br>'
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

function getIconBase64(path) {
    function toDataURL(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    }

    toDataURL(path, function(dataUrl) {
        sessionStorage.setItem("inAppIconOnTopIcon", dataUrl);
        inAppIconUpdateView()
        console.log('RESULT:', dataUrl)
    })
}


var folder = "images/icons/";

$.ajax({
    url : folder,
    success: function (data) {
        $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpe?g|png|gif)$/) ) {

                $(".form-image-clipart-list").append( "<img class='form-image-clipart-item' src='"+ val +"' style='height:35px; width:35px; margin:4px;' onclick='getIconBase64(this.src)'>" );
            }
        });
    }
});

function clicked(){
    console.log("clicked")
}

inAppIconUpdateView()
getIconBase64("/images/icons/missed-call-phone-receiver-with-left-arrow.png")
document.getElementById("inAppIconOnTopColor").value = "#FFFF00";