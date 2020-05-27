var router = require('express').Router()
var { checkUserConnected, checkUserRoleChef } = require('../../middleware/authorisation')
var { getVoyageByStation, getVehiculesStation, addVoyage, deleteVoyage, getVoyageById, updateVoyage } = require('../../services/chefstation/voyages')

router.get('/', [checkUserConnected, checkUserRoleChef], (req, res) => {
  getVoyageByStation(req, res)
})

router.get('/ajout', [checkUserConnected, checkUserRoleChef], (req, res) => {
  getVehiculesStation(req, res)
})

router.post('/ajout', [checkUserConnected, checkUserRoleChef], (req, res) => {
  addVoyage(req, res)
})

router.get('/supprimer', [checkUserConnected, checkUserRoleChef], function (req, res) {
  deleteVoyage(req, res)
})

router.get('/modifier', [checkUserConnected, checkUserRoleChef], (req, res) => {
  getVoyageById(req, res)
})

router.post('/modifier', [checkUserConnected, checkUserRoleChef], (req, res) => {
  updateVoyage(req, res)
})
module.exports = router