var router = require('express').Router()
var { checkUserConnected, checkUserRoleChef } = require('../../middleware/authorisation')

var getReservsVoyagesUsers = require('../../services/chefstation/reservations')

router.get('/', [checkUserConnected, checkUserRoleChef], (req, res) => {
  getReservsVoyagesUsers(req, res)
})

module.exports = router