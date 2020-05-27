fetch('/search')
  .then(r => r.json())
  .then(r => {
    var selectSIdx = document.getElementById('select-stations-i')
    var selectSIdxTwo = document.getElementById('select-stations-iv')
    if (selectSIdx && selectSIdxTwo) {
      r.forEach(v => { selectSIdx.innerHTML += `<option value="${v.nom_station}">${v.nom_station}</option>` })
      r.reverse().forEach(v => { selectSIdxTwo.innerHTML += `<option value="${v.nom_station}">${v.nom_station}</option>` })
    }
    var selectS = document.getElementById('select-stations')
    var selectSTwo = document.getElementById('select-stations-v')
    r.forEach(v => { selectS.innerHTML += `<option value="${v.nom_station}">${v.nom_station}</option>` })
    r.reverse().forEach(v => { selectSTwo.innerHTML += `<option value="${v.nom_station}">${v.nom_station}</option>` })
  })
  .catch(e => { })