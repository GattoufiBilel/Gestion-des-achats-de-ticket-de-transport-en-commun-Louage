var router = require('express').Router()
var { isConnected } = require('../middleware/authorisation')
var checkValidEmail = require('../middleware/checkValidEmail')
var { sendReinitialiserEmail, getUserEmail, reinitialiser } = require('../services/pass-oublie')
var jwt = require('jsonwebtoken')

router.get('/', isConnected, (req, res) => { res.render('pass-oublie') })

router.post('/', [isConnected, checkValidEmail], (req, res) => {
  sendReinitialiserEmail(req, res)
})

router.get('/reinitialiser', isConnected, (req, res) => {
  getUserEmail(req, res)
})

function checkKey (req, res, next) {
  let { key } = req.body

  jwt.verify(key, 'shhhhh', function (errJwt, decoded) {
    if (errJwt) {
      res.render('pass-oublie/reinitialiser', { msg: 'Votre clé secrete n\'est pas valide' })
      return
    }
    else { next() }
  })
}

router.post('/reinitialiser', [isConnected, checkKey], (req, res) => {
  reinitialiser(req, res)
})
module.exports = router