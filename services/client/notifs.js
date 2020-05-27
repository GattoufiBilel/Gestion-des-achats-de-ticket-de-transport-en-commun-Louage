var notifDao = require('../../dao/notifications.dao')

function getNotifications (req, res) {
  notifDao.getNotifications()
    .then(notifications => {

      let current = Date.parse(new Date().toISOString())

      notifications = notifications.map(v => {
        let d = Date.parse(v.timestamp_notification)
        let m = ((current - d) / (1000 * 60) | 0)
        let h = ((current - d) / (1000 * 60 * 60) | 0)
        let days = ((current - d) / (1000 * 60 * 60 * 24) | 0)

        v.timestamp_notification = 'depuis ' + (m < 61 ? m + ' minutes' : h < 25 ? h + ' heures' : days + ' jours')
        return v
      })
      res.render('client/notifs', { notifications })
    })
    .catch(e => { res.render('client') })
}
module.exports = getNotifications