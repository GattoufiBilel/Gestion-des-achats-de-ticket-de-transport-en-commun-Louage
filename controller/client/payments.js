var router = require('express').Router()
var { checkUserConnected, checkIsClient } = require('../../middleware/authorisation')
var { getVoyageById, addPaiement } = require('../../services/client/payments')

router.get('/', [checkUserConnected, checkIsClient], (req, res) => {
  getVoyageById(req, res)
})

router.post('/confirmer', [checkUserConnected, checkIsClient], (req, res) => {
  addPaiement(req, res)
})

module.exports = router