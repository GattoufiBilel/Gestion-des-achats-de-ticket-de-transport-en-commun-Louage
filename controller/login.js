var router = require('express').Router()
var { isConnected } = require('../middleware/authorisation')
var checkValidEmail = require('../middleware/checkValidEmail')
var checkUserExist = require('../middleware/checkUserExist')
var login = require('../services/login')

router.get('/', isConnected, (req, res) => { res.render('login') })

router.post('/', [isConnected, checkValidEmail, checkUserExist], (req, res) => {
  login(req, res)
})
module.exports = router