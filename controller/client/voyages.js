var router = require('express').Router()
var getVoyagesStations=require('../../services/client/voyages')

router.post('/', async (req, res) => {
  await getVoyagesStations(req,res)
})

module.exports = router