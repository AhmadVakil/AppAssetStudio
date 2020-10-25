var socket = io.connect('127.0.0.1:5001')
function sendFeedBack () {
  socket.emit('feedBack', { firstname: document.getElementById('firstname').value,
    lastname: document.getElementById('lastname').value,
    feedback: document.getElementById('feedback').value})
}
socket.on('feedbackSaved', function () {
  document.getElementById('closeFeedback').click()
  document.getElementById('firstname').value = ''
  document.getElementById('lastname').value = ''
  document.getElementById('feedback').value = ''
  document.getElementById('popup2').style.display = 'block'
  console.log('Feedback saved by the server')
})