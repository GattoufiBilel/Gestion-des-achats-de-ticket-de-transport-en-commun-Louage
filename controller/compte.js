var express = require('express'),
  router = express.Router(),
  { checkUserConnected } = require('../middleware/authorisation'),
  multer = require('multer'), storage = multer.memoryStorage(), upload = multer({ storage: storage }),
  { getProfile, updateInfos, changePassword, changeAvatar, disbaleAccount } = require('../services/compte')

router.get('/profile', checkUserConnected, async (req, res) => {
  getProfile(req, res)
})

router.post('/profile', checkUserConnected, (req, res) => {
  updateInfos(req, res)
})

router.post('/profile/password', checkUserConnected, (req, res) => {
  changePassword(req, res)
})

router.post('/profile/avatar', [checkUserConnected, upload.single("avatar")], (req, res) => {
  changeAvatar(req, res)
})

router.post('/profile/desactiver', checkUserConnected, (req, res) => {
  disbaleAccount(req, res)
})

module.exports = router