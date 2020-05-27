var router = require('express').Router()
var validContactForm = require('../middleware/validContactForm')
var checkValidCaptcha = require('../middleware/checkValidCaptcha')
var sendEmail = require('../services/contact')

router.get('/', async (req, res) => {
  await res.render('contact')
})

router.post('/', [checkValidCaptcha, validContactForm], async (req, res) => {
  await sendEmail(req, res)
})

module.exports = router