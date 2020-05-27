var express = require('express')
var router = express.Router()
var { checkUserConnected, checkAdminOrChef } = require('../../middleware/authorisation')
var { geStats, getVoyageByNomStation, getAllReservationsByStation } = require('../../services/chefstation/index')

router.get('/', [checkUserConnected, checkAdminOrChef], async (req, res) => {
    await geStats(req, res)
})

router.get('/voyages.json', [checkUserConnected, checkAdminOrChef], async (req, res) => {
    await getVoyageByNomStation(req, res)
})

router.get('/reservations.json', [checkUserConnected, checkAdminOrChef], async (req, res) => {
    await getAllReservationsByStation(req, res)
})

module.exports = router