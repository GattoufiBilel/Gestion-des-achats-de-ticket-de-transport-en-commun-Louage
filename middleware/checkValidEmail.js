var UtilisateurDao = require('../dao/utilisateurs.dao');
module.exports = function checkValidEmail (req, res, next) {
  UtilisateurDao.getUser(req.body.email)
    .then(result => {
      if (result && result.length > 0) {
        if (result[0].etat_email === 1) { next() }
        else {
          res.render(req.originalUrl.slice(1), {
            msg: `Vous devez valider votre email avant de se connecter!`, c: 1, e: 'error'
          })
        }
      }
      else {
        res.render(req.originalUrl.slice(1), { msg: 'Ce compte n\'existe pas!', e: 'error' })
      }
    })
    .catch(e => {
      res.render(req.originalUrl.slice(1), { msg: 'vous devez s\'inscire avant de se connecter!', e: 'error' })
    })
}