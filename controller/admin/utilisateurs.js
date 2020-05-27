var router = require('express').Router()
var { checkUserConnected, checkUserRoleAdmin } = require('../../middleware/authorisation')
var { getUsers, addUser, deleteUser } = require('../../services/admin/utilisateurs')

router.get('/', [checkUserConnected, checkUserRoleAdmin], async (req, res) => {
  await getUsers(req, res)
})

router.get('/ajout', [checkUserConnected, checkUserRoleAdmin], async (req, res) => {
  await res.render('admin/utilisateur/ajout')
})

router.post('/ajout', [checkUserConnected, checkUserRoleAdmin], async (req, res) => {
  await addUser(req, res)
})

router.post('/modifier', [checkUserConnected, checkUserRoleAdmin], async (req, res) => {
  await res.render('admin/utilisateur')
})

router.get('/supprimer', [checkUserConnected, checkUserRoleAdmin], async (req, res) => {
  await deleteUser(req, res)
})

module.exports = router