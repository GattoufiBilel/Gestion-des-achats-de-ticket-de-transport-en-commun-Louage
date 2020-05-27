var router = require('express').Router()
var { isConnected } = require('../middleware/authorisation')
var { register, activateAccount } = require('../services/register')

router.get('/', isConnected, function (req, res) { res.render('register') })

router.post('/', isConnected, function (req, res) {
  register(req, res)
})

router.get('/email', isConnected, (req, res) => {
  res.render('register-valider')
})

router.get('/email/activation', isConnected, (req, res) => {
  activateAccount(req, res)
})

module.exports = router