var Utilisateur = require('../../model/Utilisateur.model')
var utilisateurDao = require('../../dao/utilisateurs.dao')
var bcrypt = require('bcrypt')
var saltRounds = 10;

function getUsers (req, res) {
  utilisateurDao.getUsers()
    .then(function (utilisateurs) { res.render('admin/utilisateur/lister', { utilisateurs }) })
    .catch(e => { res.render('admin/utilisateur/lister') })
}

function addUser (req, res) {
  let { nom, prenom, email, password, role } = req.body;
  email = email.toLowerCase()
  bcrypt.hash(password, saltRounds)
    .then(function (hash) {
      let utilisateur = new Utilisateur(nom, prenom, email, hash, '', '', role)
      utilisateurDao.addUser(utilisateur)
        .then(result => {
          utilisateurDao.updateEtat(email)
            .then(resultEtat => {
              res.render('admin/utilisateur/ajout', { msg: 'Un utilisateur a été bien ajouté' });
            })
            .catch(errUpdate => {
              res.redirect('/404')
            })
        })
        .catch(e => {
          res.render('admin/utilisateur/ajout', { msg: 'Utilisateur deja existe', e: 'error' })
        })
    })
    .catch(errHash => { res.redirect('/404') })
}

function deleteUser (req, res) {
  utilisateurDao.deleteUserByEmail(req.query.email)
    .then(r => { res.status(200).json({ msg: 'Un utilisateur a été bien supprimer' }) })
    .catch(e => { res.status(404).json({ msg: 'vous ne pouvez pas supprimer cet utilisateur' }) })
}

module.exports = { getUsers, addUser, deleteUser }