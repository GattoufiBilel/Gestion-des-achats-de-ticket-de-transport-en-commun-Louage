var utilisateurDao = require('../dao/utilisateurs.dao'),
  UtilisateurModel = require('../model/Utilisateur.model'),
  objectTrim = require('../util/objectTrim');

var bcrypt = require('bcrypt'), saltRounds = 10;
var sharp = require('sharp')

function getProfile (req, res) {
  utilisateurDao.getUserById(req.session.userInfo.id).then(users => {
    let encode = 'data:image/png;base64,' + users[0].avatar
    req.session.avatar = encode
    res.render('compte/index', { user: users[0], avatar: encode })
  })
    .catch(e => { res.render('compte/index', { user: users[0] }) })
}

function updateInfos (req, res) {
  let { nom, prenom, email, tel } = req.body;
  let { id } = req.session.userInfo
  let User = new UtilisateurModel(nom, prenom, email, '', tel)

  utilisateurDao.updateUser(id, objectTrim(User))
    .then(r => { res.json({ msg: 'Votre profile a été bien modifiée' }) })
    .catch(e => { res.json({ msg: 'erreur de modification!' }) })
}

function changePassword (req, res) {
  let { npassword, ancien } = req.body
  let { email, password } = req.session.userInfo

  bcrypt.compare(ancien, password, function (err, cmpRes) {
    if (cmpRes) {
      bcrypt.hash(npassword, saltRounds)
        .then(function (hash) {
          utilisateurDao.updateUserPassword(email, hash)
            .then(r => { res.json({ msg: 'Votre mot de passe a été bien modifiée' }) })
            .catch(e => { res.json({ msg: 'Veuillez verifier votre mot de passe ' }) })
        })
        .catch(e => { res.redirect('/404') })
    }
    else res.json({ msg: 'Veuillez verifier votre mot de passe ' })
  })
}

function changeAvatar (req, res) {
  sharp(req.file.buffer)
    .resize(300, 300)
    .jpeg()
    .toBuffer()
    .then(function (data) {
      const encoded = data.toString("base64")
      utilisateurDao.updateAvatar(encoded, req.session.userInfo.email)
        .then(r => { res.redirect('/utilisateur/profile') })
        .catch(e => { res.render('compte/index', { msg: 'Erreur de modification' }) })
    })
    .catch(e => { res.redirect('/404') })
}

function disbaleAccount (req, res) {
  let userPassword = req.session.userInfo.password
  bcrypt.compare(req.body.password, userPassword)
    .then(function (hashRes) {

      if (hashRes) {
        utilisateurDao.deleteUser(userPassword)
          .then(r => {
            req.session.destroy()
            req.session = null
            res.locals = null
            res.status(200).json({ msg: 'ok' })
          })
          .catch(e => { res.json({ msg: 'Veuillez verifier votre mot de passe' }) })
      }
      else { res.json({ msg: 'Veuillez verifier votre mot de passe' }) }
    })
    .catch(e => {
      res.json({ msg: 'Pour désactiver votre compte, vous devez contacter le service client.' })
    })
}

module.exports = { getProfile, updateInfos, changePassword, changeAvatar, disbaleAccount }