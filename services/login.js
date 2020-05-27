var bcrypt = require('bcrypt')

function login (req, res) {
  let { email, password, connectedUser } = req.body
  bcrypt.compare(password, connectedUser.password)
    .then(async (hashRes) => {
      if (hashRes && email === connectedUser.email) {
        req.session.userInfo = connectedUser
        res.redirect('/')
      }
      else {
        res.render('login', { msg: 'Veuillez vérifier votre adresse e-mail ou mot de passe' })
      }
    })
    .catch(e => { res.render('login', { msg: 'Vous devez s\'inscire avant de se connecter!' }) })
}
module.exports = login