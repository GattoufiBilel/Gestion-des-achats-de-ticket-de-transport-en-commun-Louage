var express = require('express')
var router = express.Router()
var { checkUserConnected, checkAdminOrChef } = require('../../middleware/authorisation')
var { getUsers, getStations } = require('../../services/admin/index')

router.get('/', [checkUserConnected, checkAdminOrChef], async (req, res) => {
  await res.render('admin/index')
})

router.get('/utilisateurs.json', [checkUserConnected, checkAdminOrChef], async (req, res) => {
  await getUsers(req, res)
})

router.get('/stations.json', [checkUserConnected, checkAdminOrChef], async (req, res) => {
  await getStations(req, res)
})

module.exports = router