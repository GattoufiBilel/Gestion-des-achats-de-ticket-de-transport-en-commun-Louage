var router = require('express').Router()
var { checkUserConnected, checkIsClient } = require('../../middleware/authorisation')
var { getVoyageById, getReservByUser, addResvCookie, cancelReserv } = require('../../services/client/reservations')

router.get('/', [checkUserConnected, checkIsClient], (req, res) => {
  getVoyageById(req, res)
})

router.get('/all', [checkUserConnected, checkIsClient], (req, res) => {
  getReservByUser(req, res)
})

router.post('/ajout', [checkUserConnected, checkIsClient], (req, res) => {
  addResvCookie(req, res)
})

router.get('/annuler', [checkUserConnected, checkIsClient], (req, res) => {
  cancelReserv(req, res)
})
module.exports = router