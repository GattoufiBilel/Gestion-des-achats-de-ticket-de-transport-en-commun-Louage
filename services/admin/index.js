var utilisateurDao = require('../../dao/utilisateurs.dao')
var stationDao = require('../../dao/stations.dao')

function getUsers (req, res) {
  utilisateurDao.getUsers()
    .then(function (utilisateurs) { res.status(200).json(utilisateurs) })
    .catch(e => { res.status(404).json(utilisateurs) })
}

function getStations (req, res) {
  stationDao.getAllStations()
    .then(function (stations) { res.status(200).json(stations) })
    .catch(e => { res.status(404).json(stations) })
}

module.exports = { getUsers, getStations }