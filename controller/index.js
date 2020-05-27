var router = require('express').Router()
var getStations = require('../services/index')

router.get('/', (req, res) => { res.render('index') })

router.get('/search', (req, res) => {
  getStations(req, res)
})
module.exports = router