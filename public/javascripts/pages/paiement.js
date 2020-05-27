window.addEventListener('load', () => {
  let btnPayment = document.getElementById('btn-payment')
  let datexp = document.getElementById('datexp')

  btnPayment.disabled = true
  datexp.onkeyup = () => {
    if (datexp.value.length === 5 && /\d{2}\/\d{2}/g.test(datexp.value)) {
      let d = datexp.value.split('/')
      btnPayment.disabled = +d[1] > 14 && +d[0] > 0 && +d[0] < 13 ? false : true
    }
    else { btnPayment.disabled = true }
  }

  function checkPaiementInput (str) { return /^[0-9]+$/gi.test(str) }

  let formPaiement = document.getElementById('form-paiement')
  formPaiement.addEventListener('submit', (e) => {
    let numcarte = e.target.numcarte.value;
    let cvc = e.target.cvc.value;
    if (checkPaiementInput(numcarte) && checkPaiementInput(cvc)) {
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