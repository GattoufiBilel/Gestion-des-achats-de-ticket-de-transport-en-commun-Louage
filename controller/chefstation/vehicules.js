var router = require('express').Router()
var { checkUserConnected, checkUserRoleChef } = require('../../middleware/authorisation')
var { getVehicules, addVehicule, deleteVehicule, getVehicule, updateVehicule } = require('../../services/chefstation/vehicules')

router.get('/', (req, res) => { getVehicules(req, res) })

router.get('/ajout', [checkUserConnected, checkUserRoleChef], (req, res) => {
  res.render('chefstation/vehicule/ajout')
})

router.post('/ajout', [checkUserConnected, checkUserRoleChef], (req, res) => {
  addVehicule(req, res)
})

router.get('/supprimer', [checkUserConnected, checkUserRoleChef], function (req, res) {
  deleteVehicule(req, res)
})

router.get('/modifier', [checkUserConnected, checkUserRoleChef], function (req, res) {
  getVehicule(req, res)
})

router.post('/modifier', [checkUserConnected, checkUserRoleChef], function (req, res) {
  updateVehicule(req, res)
})

module.exports = router