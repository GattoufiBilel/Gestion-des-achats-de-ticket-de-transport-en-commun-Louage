var router = require('express').Router()
var { checkUserConnected, checkIsClient } = require('../../middleware/authorisation')
var getVoyageById = require('../../services/client/ticket')

router.get('/', [checkUserConnected, checkIsClient], async (req, res) => {
  await getVoyageById(req, res)
})
module.exports = router