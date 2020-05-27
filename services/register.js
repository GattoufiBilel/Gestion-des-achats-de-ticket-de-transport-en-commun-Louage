var knex = require('../database/knex')
var { sendActivationEmail } = require('../subscribers/nodemailer')
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10;

function register (req, res) {

  let { nom, prenom, email, password } = req.body

  bcrypt.hash(password, saltRounds)
    .then(function (hash) {
      let token = jwt.sign({ email }, 'shhhhh')
      let d = req.protocol + "://" + req.headers.host;

      sendActivationEmail(email, d, token)
        .then(r => {
          knex('utilisateurs').insert({
            nom, prenom,
            email,
            password: hash, role: 'client',
            timestamp_utilisateur: new Date().toISOString()
          })
            .then(kr => {
              res.render('register', { msg: 'Un lien a été envoyé vers ton email, veuillez vérifier votre boîte de réception.' })
            })
            .catch(ke => {
              res.render('register', { msg: 'Vous êtes deja inscrit!', e: 'error' })
            })
        })
        .catch(e => {
          res.render('register', { msg: 'Email invalide, veillez verifier votre email!', e: 'error' })
        })
    })
    .catch(errHash => { res.redirect('/404') });
}

function activateAccount (req, res) {
  jwt.verify(req.query.key, 'shhhhh', function (err, decoded) {
    if (!err) {
      knex('utilisateurs').where({ email: decoded.email }).update({ etat_email: 1 })
        .then(r => { res.render('login', { msg: 'votre compte a été activé avec succès.', c: 'ok' }) })
        .catch(e => { res.render('register-valider', { msg: 'Clé secrete invalide.', e: 'error' }) })
    }
    else {
      res.render('register-valider', { msg: 'Clé n\'est pas valide! veuillez vérifier votre boîte de réception.', e: 'error' })
    }
  })
}

module.exports = { register, activateAccount }