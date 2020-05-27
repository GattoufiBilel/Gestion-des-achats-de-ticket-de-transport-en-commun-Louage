var voyageDao = require('../../dao/voyages.dao')

function getVoyageById (req, res) {
  let { nom, prenom, email } = req.session.userInfo
  let paymentInfo = JSON.parse(req.cookies.payment)

  voyageDao.geFulltVoyageById(paymentInfo.uidvoyage)
    .then(voyages => {
      res.render('client/ticket', { paymentInfo, email, voyage: voyages[0], nom, prenom })
    })
    .catch(e => { res.redirect('/404') })
}
module.exports = getVoyageById