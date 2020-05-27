var router = require('express').Router()
var { checkUserConnected, checkUserRoleChef } = require('../../middleware/authorisation')
var { getNotifisByChefStation, sendNotif, getNotifisById, updateNotif, deletNotif } = require('../../services/chefstation/notifs')

router.get('/', [checkUserConnected, checkUserRoleChef], (req, res) => {
  getNotifisByChefStation(req, res)
})

router.get('/envoyer', [checkUserConnected, checkUserRoleChef], (req, res) => {
  res.render('chefstation/notifs/ajout')
})

router.post('/envoyer', [checkUserConnected, checkUserRoleChef], (req, res) => {
  sendNotif(req, res)
})

router.get('/modifier', [checkUserConnected, checkUserRoleChef], (req, res) => {
  getNotifisById(req, res)
})

router.post('/modifier', [checkUserConnected, checkUserRoleChef], (req, res) => {
  updateNotif(req, res)
})

router.get('/supprimer', [checkUserConnected, checkUserRoleChef], (req, res) => {
  deletNotif(req, res)
})

module.exports = router