
socket.on('app_Design2', function (data) {
    //console.log(data.fields)
    app_Design2 = data
  
   for (var i = 0; i < data.fields.length; i++) {
      var allJsonHolder = document.getElementById('AppDesignTwo')
      var fancyLine = document.createElement('hr')
      var lineBreaker = document.createElement('br')
  
      var jsonDiv = document.createElement('div')
      jsonDiv.id = data.fields[i].jsonKeyPath + '-div'
      jsonDiv.className = 'json-div'
      jsonDiv.innerHTML = data.fields[i].title + '<br>'
  
      var textInputOne = document.createElement('input')
      textInputOne.addEventListener('change', divChanger)
      function divChanger () {
        textInputOne.style.color = 'green'
      }
      var textInputTwo = document.createElement('input')
      if (data.fields[i].type === 'color') {
        textInputOne.type = 'text'
        textInputOne.id = data.fields[i].jsonKeyPath
  
        textInputTwo.type = 'color'
        textInputTwo.id = data.fields[i].jsonKeyPath
        jsonDiv.appendChild(textInputOne)
        jsonDiv.appendChild(textInputTwo)
      }
  
      if (data.fields[i].type === 'number') {
        textInputOne.type = 'number'
        textInputOne.id = data.fields[i].jsonKeyPath
        textInputOne.style.width = '50px'
        jsonDiv.appendChild(textInputOne)
      }
  
      if (data.fields[i].type === 'text') {
        textInputOne.type = 'text'
        textInputOne.id = data.fields[i].jsonKeyPath
        jsonDiv.appendChild(textInputOne)
      }
  
      if (data.fields[i].type === 'boolean') {
        var booleanSelector = document.createElement('form')
        booleanSelector.id = data.fields[i].jsonKeyPath + ''
  
        var br = document.createElement('br')
        var yes = document.createElement('input')
        yes.type = 'radio'
        yes.innerHTML = 'Yes'
        yes.value = 'yes'
  
  
        var no = document.createElement('input')
        no.type = 'radio'
        no.innerHTML = 'No'
        no.value = 'no'
  
        booleanSelector.insertAdjacentText('beforeend', 'Yes')
        booleanSelector.appendChild(yes)
        booleanSelector.appendChild(br)
        booleanSelector.insertAdjacentText('beforeend', 'No')
        booleanSelector.appendChild(no)
  
        jsonDiv.appendChild(booleanSelector)
  
        yes.addEventListener('change', noUncheck)
  
        no.addEventListener('change', yesUncheck)
  
        function noUncheck () {
          if (yes.checked === true) {
              no.checked = false
            }
        }
  
        function yesUncheck () {
          if (no.checked === true) {
            yes.checked = false
          }
        }
      }
      allJsonHolder.appendChild(jsonDiv)
      allJsonHolder.appendChild(fancyLine)
    }
  
  // Gettign values from server and put them in their fields
  var repos = document.getElementById('repositories')
    repos.addEventListener('change', myfunction2)
    function myfunction2 () {
      repoName = repos.value
      configuration = { repoNames: repoName }
      socket.emit('openThisRepo', { repoNames: repoName })
     
      socket.on('pathTo_app_design2' , function (pathTo_app_Design2) {
        
        for (var i = 0; i < app_Design2.fields.length; i++) {
          var jKEY = app_Design2.fields[i].jsonKeyPath
          var subPath = app_Design2.fields[i].subPath
          var tmp = document.getElementById(jKEY)
  
          if (app_Design2.fields[i].type === 'boolean') {
            console.log(app_Design2.fields[i])
          }
  
          if (subPath === true) {
            var temp = jKEY.split('.')
            var tLength = temp.length
            switch (tLength) {
                      case 1:
                        var t0 = temp[0]
                        tmp.value = pathTo_app_Design2[t0]
                        break
                      case 2:
                        var t0 = temp[0]
                        var t1 = temp[1]
                        tmp.value = pathTo_app_Design2[t0][t1]
                        break
                      case 3:
                        var t0 = temp[0]
                        var t1 = temp[1]
                        var t2 = temp[2]
                        tmp.value = pathTo_app_Design2[t0][t1][t2]
                        break
                      case 4:
                        var t0 = temp[0]
                        var t1 = temp[1]
                        var t2 = temp[2]
                        var t3 = temp[3]
                        tmp.value = pathTo_app_Design2[t0][t1][t2][t3]
                        break
                      case 5:
                        var t0 = temp[0]
                        var t1 = temp[1]
                        var t2 = temp[2]
                        var t3 = temp[3]
                        var t4 = temp[4]
                        tmp.value = pathTo_app_Design2[t0][t1][t2][t3][t4]
                        break
                      case 6:
                        var t0 = temp[0]
                        var t1 = temp[1]
                        var t2 = temp[2]
                        var t3 = temp[3]
                        var t4 = temp[4]
                        var t5 = temp[5]
                        tmp.value = pathTo_app_Design2[t0][t1][t2][t3][t4][t5]
                        break
                      case 7:
                        var t0 = temp[0]
                        var t1 = temp[1]
                        var t2 = temp[2]
                        var t3 = temp[3]
                        var t4 = temp[4]
                        var t5 = temp[5]
                        var t6 = temp[6]
                        tmp.value = pathTo_app_Design2[t0][t1][t2][t3][t4][t5][t6]
                    }
           // console.log(`currentConfigs.${jKEY} = ${currentConfigs[t0][t1]}`)
          }else {
            tmp.value = pathTo_app_Design2[jKEY]
          }
        }
      })
     // console.log(repoName)
    }
  })