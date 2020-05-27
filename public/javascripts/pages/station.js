function checkStationInput (str) { return /^[a-z0-9\xBF-\xFF ]+$/gi.test(str) }

let formAjoutStation = document.getElementById('form-station')
formAjoutStation.addEventListener('submit', (e) => {
  let nom = e.target.nom.value;
  let ville = e.target.ville.value;
  if (checkStationInput(nom.toLowerCase()) && checkStationInput(ville)) {
    return true
  }
  e.preventDefault()
  let alert = document.querySelector('[role=alert]')
  alert.classList.remove('dnone')
  alert.classList.add('dblock')
  alert.textContent = 'Données invalides, n\'utilisez pas des caractères spéciaux dans les champs!'
  setTimeout(() => { alert.classList.add('dnone') }, 5000)
  return false
})