var request = require('request')
module.exports = function checkValidCaptcha (req, res, next) {
  let captcha = req.body['g-recaptcha-response']

  const options = {
    uri: "https://www.google.com/recaptcha/api/siteverify",
    json: true,
    form: { secret: process.env.CAPTCHA_SECRET_KEY, response: captcha }
  }

  request.post(options, function (err, response, body) {
    if (err || !body.success) {
      res.render('contact', { msg: "Captcha invalide!" })
    }
    else next()
  })
}