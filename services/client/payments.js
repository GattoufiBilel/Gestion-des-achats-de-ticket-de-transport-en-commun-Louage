var uniqid = require('uniqid')
var reservDao = require('../../dao/reservations.dao')
var voyageDao = require('../../dao/voyages.dao')
var paymentDao = require('../../dao/payments.dao')
var Payment = require('../../model/Payment.model')
var Reservation = require('../../model/Reservation')

function getVoyageById (req, res) {
  let reservInfo = JSON.parse(req.cookies.vosreservations)
  let { nbplaces, total, uidvoyage } = reservInfo
  voyageDao.getVoyageById(uidvoyage)
    .then(voyages => {
      res.render('client/payments', {
        nbplacesreserv: nbplaces, total, voyage: voyages[0], uidvoyage
      })
    })
    .catch(e => { res.redirect('/404') })
}

function addPaiement (req, res) {
  let { numcarte, nbplacesreserv, total, nb_places, uidvoyage } = req.body
  let { id } = req.session.userInfo
  let uid = uniqid()

  let newReserv = new Reservation(uid, nbplacesreserv, total, 'payer', id, uidvoyage)
  let newPayment = new Payment(uid, numcarte, uid)

  Promise.all([
    voyageDao.updateNbPlaces(((+nb_places) - (+nbplacesreserv)), uidvoyage),
    reservDao.addReservation(newReserv),
    paymentDao.addPayment(newPayment)
  ])
    .then(values => {
      res.cookie('payment',
        JSON.stringify({ newReserv, numcarte, uidvoyage }), { maxAge: 1000 * 60 * 30, httpOnly: true })
      res.redirect('/ticket')
    })
    .catch(error => { res.redirect('/404') })
}

module.exports = { getVoyageById, addPaiement }