var Station = require('../../model/Station.model')
var stationDao = require('../../dao/stations.dao')
var utilisateurDao = require('../../dao/utilisateurs.dao')

var villeTunisie = require('../../util/ville')

function getStations (req, res) {
  stationDao.getStations()
    .then(stations => { res.render('admin/station/lister', { stations }) })
    .catch(e => { res.render('admin/station/lister') })
}

function getUserByRole (req, res) {
  utilisateurDao.getUserByRole('chef_station')
    .then(chefStations => {
      req.session.chefStations = chefStations
      res.render('admin/station/ajout', { chefStations, villeTunisie })
    })
    .catch(e => { res.redirect('/admin') })
}

function addStation (req, res) {
  let { chef, nom, ville, tel } = req.body
  let station = new Station(nom, ville, tel, chef)
  stationDao.addStation(station)
    .then(r => {
      res.render('admin/station/ajout', { msg: 'une station a été bien ajoutée', villeTunisie })
    })
    .catch(e => {
      res.render('admin/station/ajout', { msg: 'Station deja existe!', villeTunisie, e: 'error' })
    })
}

function deleteStation (req, res) {
  let nomStation = req.query.nom
  stationDao.deletStation(nomStation.trim())
    .then(r => { res.status(200).json({ msg: 'Une station a été bien supprimer' }) })
    .catch(e => { res.status(404).json({ msg: 'vous ne pouvez pas supprimer cette station' }) })
}

function getStationByName (req, res) {
  stationDao.getStation(req.query.nom)
    .then(station => { res.render('admin/station/modifier', { station: station[0] }) })
    .catch(e => { res.redirect('/404') })
}

function updateStation (req, res) {
  let { idstation, nom, ville, tel } = req.body
  let newStation = new Station(nom, ville, tel, '')
  stationDao.updateStation(newStation, idstation)
    .then(r => { res.redirect('/admin/stations') })
    .catch(e => { res.redirect('/404') })
}
module.exports = { getStations, getUserByRole, addStation, deleteStation, getStationByName, updateStation }