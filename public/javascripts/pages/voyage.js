function checkVoyageInput (str) { return /^[a-z0-9\xBF-\xFF ]+$/gi.test(str) }

let formVoyage = document.getElementById('form-voyage')
formVoyage.addEventListener('submit', (e) => {
  let heureDepart = +(e.target.heureDepart.value);
  let heureArrive = +(e.target.heureArrive.value);
  let prixPlace = parseFloat(e.target.prixPlace.value) > 0;
  let dateDepart = e.target.dateDepart.value;
  let today = Date.parse(new Date());
  if (prixPlace && heureArrive > heureDepart && (Date.parse(dateDepart)+(1000 * 60 * 60 * heureDepart)) >= today) {
    return true
  }
  e.preventDefault()
  let alert = document.querySelector('[role=alert]')
  alert.classList.remove('dnone')
  alert.classList.add('dblock')
  alert.innerHTML = `Le prix doit étre supérieur à 0 
  <br>L\'heure de d\'arrivée doit étre supérieur à l\'heure de départ
  <br>Date de départ doit étre supérieur à la date actuelle`
  setTimeout(() => { alert.classList.add('dnone') }, 7000)
  return false
})