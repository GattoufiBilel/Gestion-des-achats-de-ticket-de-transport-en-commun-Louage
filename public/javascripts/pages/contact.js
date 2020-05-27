/** Contact Page Form */
let btnSend = document.getElementById('btn-send-mail'), r = '';
if (btnSend) {
  btnSend.disabled = true;
  let check = (s) => /^[a-z0-9\xBF-\xFF\;\.\,\+\-\s+ ]+$/gmi.test(s);
  document.getElementById('message').onkeyup = (e) => {
    r = e.target.value;
    if (check(r.replace(/\r|\n/g, ''))) {
      if (r.length > 50) btnSend.disabled = false;
      else btnSend.disabled = true;
    }
    else {
      btnSend.disabled = true
    }
  }
}

window.addEventListener('load', () => {
  function checkContactInput (str) { return /^[a-z\xBF-\xFF ]+$/gi.test(str) }

  let formContact = document.getElementById('form-contact')
  formContact.addEventListener('submit', (e) => {
    let nom = e.target.nom.value;
    let sujet = e.target.sujet.value;
    let email = e.target.email.value;
    let message = e.target.message.value;
    if (checkContactInput(nom.toLowerCase()) && checkContactInput(sujet)) {
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
})