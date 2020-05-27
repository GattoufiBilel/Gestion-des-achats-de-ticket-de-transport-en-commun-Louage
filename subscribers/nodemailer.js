var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
  service: 'zoho',
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: { user: process.env.GMAIL_EMAIL, pass: process.env.GMAIL_PASS }
})

function sendReinEmail (email, token) {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: `Louage 👻 <haikel.fazzani@zoho.com>`,
      to: email,
      subject: 'Réinitialiser de mot de passe, envoyé par Louage.com',
      text: 'Merci de valider votre email',
      html: `
      <div><img src="https://i.ibb.co/K7KK032/logo.png" alt="logo" ></div>
      <h3>Clé secrete de réinitialiser de mot de passe: </h3>
      <hr>
      <h3>${token}</h3>
      <hr>
      <div><small>louage.com</small></div>`
    }

    transporter.sendMail(mailOptions, function (e, info) {
      if (e) reject(e)
      else resolve(info)
    })
  })
}

function sendActivationEmail (email, d, token) {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: `"Louage 👻" <haikel.fazzani@zoho.com>`,
      to: email.trim(),
      subject: 'Clé d\'activation, envoyé par Louage.com',
      text: 'Merci de valider votre inscription',
      html: `
      <h3>Clé d'activation, envoyé par Louage.com</h3>
      <div><img src="https://i.ibb.co/K7KK032/logo.png" alt="logo" ></div>
      <p>Cliquez sur ce lien pour activer votre compte</p>
      <hr>
      <p>${d}/register/email/activation?key=${token}</p>
      <hr>
      <p>Merci et bonne journée.</p>
      <div><small>https://louage.herokuapp.com</small></div>`
    }

    transporter.sendMail(mailOptions, function (e, info) {
      if (e) reject(e)
      else resolve(info)
    })
  })
}

module.exports = { sendReinEmail, sendActivationEmail }