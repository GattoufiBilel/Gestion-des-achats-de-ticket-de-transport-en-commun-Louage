var router = require('express').Router()
var { checkUserConnected, checkIsClient } = require('../../middleware/authorisation')
var getNotifications = require('../../services/client/notifs')

router.get('/', [checkUserConnected, checkIsClient], async (req, res) => {
  await getNotifications(req, res)
})

module.exports = router