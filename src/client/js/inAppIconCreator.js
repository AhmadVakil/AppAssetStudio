var socket = io.connect('127.0.0.1:5001')

function createNewInAppIcons() {
  document.getElementById('inAppIconsDetails').style.display = 'inline'
  var para = document.createElement("P"),
  inAppIconImg = document.createElement('IMG'),
  iconName = document.createElement('input');
  iconName.setAttribute("type", "number");
  para.innerText = "This is a paragraph.";
  document.getElementById('inAppIconsDetails').appendChild(para);
  document.getElementById('inAppIconsDetails').appendChild(iconName);
  document.getElementById('imageView').appendChild(inAppIconImg);
}
