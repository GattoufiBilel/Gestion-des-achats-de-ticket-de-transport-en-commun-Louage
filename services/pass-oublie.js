var utilisateurDao = require('../dao/utilisateurs.dao')
var { sendReinEmail } = require('../subscribers/nodemailer')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt'), saltRounds = 10;

function sendReinitialiserEmail (req, res) {
  let { email } = req.body, token = jwt.sign({ email }, 'shhhhh');
  sendReinEmail(email.trim(), token)
    .then(r => {
      res.cookie('passoublieemail', email, { maxAge: 1000 * 60 * 5, httpOnly: true })
      res.redirect('/pass-oublie/reinitialiser')
    })
    .catch(e => { res.render('pass-oublie', { msg: 'Veillez vérifier votre email!', e: 'error' }) })
}

function getUserEmail (req, res) {
  let email = req.cookies.passoublieemail;
  res.cookie('passoublieemail', email, { maxAge: 1000 * 60 * 5, httpOnly: true })
  res.render('pass-oublie/reinitialiser')
}

function reinitialiser (req, res) {
  let { password } = req.body
  let email = req.cookies.passoublieemail
  bcrypt.hash(password, saltRounds)
    .then(hash => {
      utilisateurDao.updateUserPassword(email, hash)
        .then(result => {
          if (Object.keys(result).length < 1 && result.affectedRows !== 1) throw 404
          res.render('pass-oublie/reinitialiser', { msg: 'Votre mot de passe a été reintialisé avec succès ' })
        })
        .catch(er => {
          res.render('pass-oublie/reinitialiser', { msg: 'Votre clé secrete ou adresse email n\'est pas valide', e: 'error' })
        })
    })
    .catch(e => {
      res.render('pass-oublie/reinitialiser', { msg: 'Votre clé secrete ou adresse email n\'est pas valide', e: 'error' })
    })
}
module.exports = { sendReinitialiserEmail, getUserEmail, reinitialiser }