var reservDao = require('../../dao/reservations.dao')

function getReservsVoyagesUsers (req, res) {
  let { id_station, nom_station } = req.session.chefStationInfo
  reservDao.getReservsVoyagesUsers(id_station)
    .then(reservations => {

      let current = Date.parse(new Date());
      reservations = reservations.map(v => {
        let hToMilli = (1000 * 60 * 60 * (parseInt(v.heure_depart, 10) - 1))
        let d = Date.parse(v.date_depart) + hToMilli - (1000 * 60 * 15)
        v.out = current > d
        return v
      })

      reservations.sort((i, j) => Date.parse(j.timestamp_reservation) - Date.parse(i.timestamp_reservation))
      res.render('chefstation/reservation/index', { reservations, nom_station })
    })
    .catch(e => { res.render('chefstation/reservation/index') })
}

module.exports = getReservsVoyagesUsers