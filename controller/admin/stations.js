var router = require('express').Router()
var { checkUserConnected, checkUserRoleAdmin } = require('../../middleware/authorisation')
var { getStations, getUserByRole, addStation, deleteStation, getStationByName, updateStation } = require('../../services/admin/stations')

router.get('/', [checkUserConnected, checkUserRoleAdmin], async (req, res) => {
  await getStations(req, res)
})

router.get('/ajout', [checkUserConnected, checkUserRoleAdmin], async (req, res) => {
  await getUserByRole(req, res)
})

router.post('/ajout', [checkUserConnected, checkUserRoleAdmin], async (req, res) => {
  await addStation(req, res)
})

router.get('/supprimer', [checkUserConnected, checkUserRoleAdmin], async (req, res) => {
  await deleteStation(req, res)
})

router.get('/modifier', [checkUserConnected, checkUserRoleAdmin], async (req, res) => {
  await getStationByName(req, res)
})

router.post('/modifier', [checkUserConnected, checkUserRoleAdmin], async (req, res) => {
  await updateStation(req, res)
})
module.exports = router