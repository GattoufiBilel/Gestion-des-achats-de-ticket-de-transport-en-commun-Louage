var mailgun = require("mailgun-js")
function sendContactEmail (nom, email, sujet, message) {
  return new Promise((resolve, reject) => {
    let data = {
      from: `Louage : ${nom} <${email.toLowerCase()}>`,
      to: "haikel.fazzani@zoho.com",
      subject: sujet,
      text: message
    };

    let mg = mailgun({ apiKey: process.env.MAILJET_SECRET_KEY, domain: process.env.MAILJET_API_KEY });
    mg.messages().send(data, function (e, body) {
      if (e) reject(e)
      else resolve(body)
    })
  })
}

function sendEmailActivation (mailOptions) {
  const sender = 'haykelfezzani@gmail.com'
  let { to, domain, token } = mailOptions
  return new Promise((resolve, reject) => {
    let data = {
      from: `Louage <${sender}>`, to,
      subject: 'Clé d\'activation, envoyé par Louage.com',
      text: 'Merci de valider votre inscription',
      html: `
      <h3>Clé d'activation, envoyé par Louage.com</h3>
      <div><img src="https://i.ibb.co/K7KK032/logo.png" alt="logo" ></div>
      <p>Cliquez sur ce lien pour activer votre compte</p>
      <hr>
      <p>${domain}/register/email/activation?key=${token}</p>
      <hr>
      <p>Merci et bonne journée.</p>
      <div><small>https://louage.herokuapp.com</small></div>`
    };

    let mg = mailgun({ apiKey: process.env.MAILJET_SECRET_KEY, domain: process.env.MAILJET_API_KEY });
    mg.messages().send(data, function (e, body) {
      if (e) reject(e)
      else resolve(body)
    })
  })
}

module.exports = { sendContactEmail, sendEmailActivation }