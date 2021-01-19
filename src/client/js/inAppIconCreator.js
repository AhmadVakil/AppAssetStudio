var socket = io.connect('127.0.0.1:5001')

function createNewInAppIcons() {
  var para = document.createElement("P"),
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
  opacity = document.createElement('span');

  path.innerHTML = 'Path '
  width.innerHTML = 'Width '
  height.innerHTML = 'Height '
  color.innerHTML = 'Color '
  opacity.innerHTML = 'Opacity '

  iconName.setAttribute("type", "text");
  iconWidth.setAttribute("type", "number");
  iconHeight.setAttribute("type", "number");
  iconBgColor.setAttribute("type", "color");
  iconBgAlpha.setAttribute("type", "number");

  iconWidth.setAttribute("max", "150");
  iconHeight.setAttribute("max", "150");
  iconBgAlpha.setAttribute("max", "10");
  iconWidth.setAttribute("min", "20");
  iconHeight.setAttribute("min", "20")
  iconBgAlpha.setAttribute("min", "1");;
  iconWidth.setAttribute("value", "20");
  iconHeight.setAttribute("value", "20");

  iconWidth.style.width = "50px"
  iconHeight.style.width = "50px"
  iconBgAlpha.style.width = "50px"
  iconWidth.style.height = "10px"
  iconHeight.style.height = "10px"
  iconBgAlpha.style.height = "10px"

  inAppIconImg.style.margin = '10px'
  iconName.style.margin = '10px'
  iconWidth.style.margin = '10px'
  iconHeight.style.margin = '10px'
  iconBgColor.style.margin = '10px'
  iconBgAlpha.style.margin = '10px'

  inAppIconImg.style.width = '20px';
  inAppIconImg.style.height = '20px';

  para.innerText = "This is a paragraph.";

  iconWidth.addEventListener("change", function() {
    inAppIconImg.style.width = iconWidth.value+'px'
  })

  iconHeight.addEventListener("change", function() {
    inAppIconImg.style.height = iconHeight.value+'px'
  })
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
  document.getElementById('inAppIconsDetails').appendChild(inAppIconImg);
  document.getElementById('inAppIconsDetails').appendChild(document.createElement('hr'));
}
