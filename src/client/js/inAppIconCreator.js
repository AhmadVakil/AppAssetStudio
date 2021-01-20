var socket = io.connect('127.0.0.1:5001')

function inAppIconUpdateView(){
    console.log()

    /*socket.emit('inAppIconUpdateView', {
      inAppIconWidth: document.getElementById().value,
      inAppIconHeight: iconHeight.value,
      inAppIconBgColor: iconBgColor.value,
      inAppIconBgAlpha: iconBgAlpha.value,
      inAppIconOnTopIcon: null,
      inAppIconOnTopIconX: null,
      inAppIconOnTopIconY: null,
      inAppIconOnTopIconScale: null,
      inAppIconBorderRadius: null
    })*&
}

socket.on("inAppIconUpdated", function(data) {
    console.log(data.result)
    //console.log(inAppIconImgObj.src)

    document.getElementById(data.inAppIconImgId).src = data.result

    //$data.imgObj.attr('src', data.result)
})

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

function createNewInAppIcons() {
  inAppIconImg = document.createElement('IMG'),
  iconName = document.createElement('input'),
  iconWidth = document.createElement('input'),
  iconHeight = document.createElement('input'),
  iconBgColor = document.createElement('input'),
  iconBgAlpha = document.createElement('input'),
  path = document.createElement('span'),
  width = document.createElement('span'),
  height = document.createElement('span'),
  color = document.createElement('span'),
  opacity = document.createElement('span'),
  inAppIconOnTopIconLabel = document.createElement('span'),
  inAppIconOnTopIconXLabel = document.createElement('span'),
  inAppIconOnTopIconYLabel = document.createElement('span'),
  inAppIconOnTopIconScaleLabel = document.createElement('span'),
  inAppIconBorderRadiusLabel = document.createElement('span'),
  inAppIconOnTopIcon = document.createElement('input'),
  inAppIconOnTopIconX = document.createElement('input'),
  inAppIconOnTopIconY = document.createElement('input'),
  inAppIconOnTopIconScale = document.createElement('input'),
  inAppIconBorderRadius = document.createElement('input');

  iconWidth.addEventListener("change", function(){
    inAppIconUpdateView(inAppIconImg)
  })

  iconHeight.addEventListener("change", function() {
    inAppIconUpdateView(inAppIconImg)
  })

  path.innerHTML = 'Path '
  width.innerHTML = 'Width '
  height.innerHTML = 'Height '
  color.innerHTML = 'Color '
  opacity.innerHTML = 'Opacity '
  inAppIconOnTopIconLabel.innerHTML = 'Icon on top '
  inAppIconOnTopIconXLabel.innerHTML = 'On top X '
  inAppIconOnTopIconYLabel.innerHTML = 'On top Y '
  inAppIconOnTopIconScaleLabel.innerHTML = 'On top scale '
  inAppIconBorderRadiusLabel.innerHTML = 'Border radius '

  iconName.setAttribute("type", "text");
  iconWidth.setAttribute("type", "number");
  iconHeight.setAttribute("type", "number");
  iconBgColor.setAttribute("type", "color");
  iconBgAlpha.setAttribute("type", "number");
  inAppIconOnTopIcon.setAttribute("type", "file");
  inAppIconOnTopIconX.setAttribute("type", "number");
  inAppIconOnTopIconY.setAttribute("type", "number");
  inAppIconOnTopIconScale.setAttribute("type", "number");
  inAppIconBorderRadius.setAttribute("type", "number");

  iconWidth.setAttribute("max", "150");
  iconHeight.setAttribute("max", "150");
  iconBgAlpha.setAttribute("max", "10");
  inAppIconOnTopIconX.setAttribute("max", "99");
  inAppIconOnTopIconY.setAttribute("max", "99");
  inAppIconOnTopIconScale.setAttribute("max", "99");
  inAppIconBorderRadius.setAttribute("max", "10");

  iconWidth.setAttribute("min", "20");
  iconHeight.setAttribute("min", "20")
  iconBgAlpha.setAttribute("min", "1");;
  inAppIconOnTopIconX.setAttribute("min", "0");
  inAppIconOnTopIconY.setAttribute("min", "0");
  inAppIconOnTopIconScale.setAttribute("min", "-99");
  inAppIconBorderRadius.setAttribute("min", "0");

  iconWidth.setAttribute("value", "20");
  iconHeight.setAttribute("value", "20");
  iconBgAlpha.setAttribute("value", "1");
  inAppIconOnTopIconX.setAttribute("value", "0");
  inAppIconOnTopIconY.setAttribute("value", "0");
  inAppIconOnTopIconScale.setAttribute("value", "0");
  inAppIconBorderRadius.setAttribute("value", "0");

  iconWidth.style.width = "50px"
  iconHeight.style.width = "50px"
  iconBgAlpha.style.width = "50px"
  iconWidth.style.height = "10px"
  iconHeight.style.height = "10px"
  iconBgAlpha.style.height = "10px"
  inAppIconOnTopIconX.style.width = "50px"
  inAppIconOnTopIconY.style.width = "50px"
  inAppIconOnTopIconScale.style.width = "50px"
  inAppIconBorderRadius.style.width = "50px"
  inAppIconOnTopIconX.style.height = "10px"
  inAppIconOnTopIconY.style.height = "10px"
  inAppIconOnTopIconScale.style.height = "10px"
  inAppIconBorderRadius.style.height = "10px"

  inAppIconImg.style.margin = '10px'
  iconName.style.margin = '10px'
  iconWidth.style.margin = '10px'
  iconHeight.style.margin = '10px'
  iconBgColor.style.margin = '10px'
  iconBgAlpha.style.margin = '10px'
  inAppIconOnTopIconX.style.margin = '10px'
  inAppIconOnTopIconY.style.margin = '10px'
  inAppIconOnTopIconScale.style.margin = '10px'
  inAppIconBorderRadius.style.margin = '10px'





  document.getElementById('inAppIconsDetails').appendChild(path);
  document.getElementById('inAppIconsDetails').appendChild(iconName);
  document.getElementById('inAppIconsDetails').appendChild(width);
  document.getElementById('inAppIconsDetails').appendChild(iconWidth);
  document.getElementById('inAppIconsDetails').appendChild(height);
  document.getElementById('inAppIconsDetails').appendChild(iconHeight);
  document.getElementById('inAppIconsDetails').appendChild(color);
  document.getElementById('inAppIconsDetails').appendChild(iconBgColor);
  document.getElementById('inAppIconsDetails').appendChild(opacity);
  document.getElementById('inAppIconsDetails').appendChild(iconBgAlpha);
  document.getElementById('inAppIconsDetails').appendChild(document.createElement('br'));
  document.getElementById('inAppIconsDetails').appendChild(inAppIconOnTopIconLabel);
  document.getElementById('inAppIconsDetails').appendChild(inAppIconOnTopIcon);
  document.getElementById('inAppIconsDetails').appendChild(inAppIconOnTopIconXLabel);
  document.getElementById('inAppIconsDetails').appendChild(inAppIconOnTopIconX);
  document.getElementById('inAppIconsDetails').appendChild(inAppIconOnTopIconYLabel);
  document.getElementById('inAppIconsDetails').appendChild(inAppIconOnTopIconY);
  document.getElementById('inAppIconsDetails').appendChild(inAppIconOnTopIconScaleLabel);
  document.getElementById('inAppIconsDetails').appendChild(inAppIconOnTopIconScale);
  document.getElementById('inAppIconsDetails').appendChild(inAppIconBorderRadiusLabel);
  document.getElementById('inAppIconsDetails').appendChild(inAppIconBorderRadius);
  document.getElementById('inAppIconsDetails').appendChild(document.createElement('br'));
  document.getElementById('inAppIconsDetails').appendChild(inAppIconImg);
  document.getElementById('inAppIconsDetails').appendChild(document.createElement('hr'));

  //inAppIconImg.id = 'newb'
}
