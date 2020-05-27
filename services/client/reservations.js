var reservDao = require('../../dao/reservations.dao')
var voyageDao = require('../../dao/voyages.dao')
var paymentDao = require('../../dao/payments.dao')

function getVoyageById (req, res) {
  voyageDao.getVoyageById(req.query.v)
    .then(r => { res.render('client/confirmer', { voyage: r[0] }) })
    .catch(e => { res.redirect('/404') })
}

function getReservByUser (req, res) {
  let { email } = req.session.userInfo
  reservDao.getReservByUser(email)
    .then(reservations => {

      let current = Date.parse(new Date());
      reservations = reservations.map(v => {
        let hToMilli = (1000 * 60 * 60 * (parseInt(v.heure_depart, 10) - 1))
        let d = Date.parse(v.date_depart) + hToMilli - (1000 * 60 * 15)
        v.out = current > d
        return v
      })

      res.render('client/reservations', { reservations })
    })
    .catch(e => { res.redirect('/utilisateur/profile') })
}

function addResvCookie (req, res) {
  res.cookie('vosreservations', JSON.stringify(req.body), { maxAge: 1000 * 60 * 10 })
  res.redirect('/payments')
}

function cancelReserv (req, res) {
  let { r, v, nb } = req.query
  Promise.all([
    voyageDao.updateNbPlaces(nb, v, 'inc'),
    reservDao.updateEtatReserv('annuler', r),
    paymentDao.cancelPayment(r)
  ])
    .then(v => { res.status(200).json({ msg: 'Une réservation a été bien annulée' }) })
    .catch(e => { res.status(404).json({ msg: 'erreur' }) })
}
module.exports = { getVoyageById, getReservByUser, addResvCookie, cancelReserv }