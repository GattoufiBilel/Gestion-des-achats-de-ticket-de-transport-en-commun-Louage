var voyageDao = require('../../dao/voyages.dao')
var reservDao = require('../../dao/reservations.dao')
var vehiculeDao = require('../../dao/vehicules.dao')
var stationDao = require('../../dao/stations.dao')

function geStats (req, res) {
    stationDao.getStationByChef(req.session.userInfo.email)
        .then(r => {
            req.session.chefStationInfo = r[0]
            let { id_station, nom_station } = r[0]

            const promises = [
                vehiculeDao.getVehicules(),
                voyageDao.getVoyageByNomStation(nom_station),
                reservDao.getAllReservationsByStation(id_station),
            ]

            Promise.all(promises)
                .then((values) => {
                    let data = { vehicules: values[0], voyages: values[1], reservations: values[2] }
                    res.render('chefstation/index', { data })
                })
                .catch(error => { res.render('chefstation/index') })
        })
        .catch(e => { res.redirect('/404') })
}

function getVoyageByNomStation (req, res) {
    voyageDao.getVoyageByNomStation(req.session.chefStationInfo.nom_station)
        .then(function (voyages) { res.status(200).json(voyages) })
        .catch(e => { res.status(404).json(voyages) })
}

function getAllReservationsByStation (req, res) {
    reservDao.getAllReservationsByStation(req.session.chefStationInfo.id_station)
        .then(function (resvs) { res.status(200).json(resvs) })
        .catch(e => { res.status(404).json(resvs) })
}

module.exports = { geStats, getVoyageByNomStation, getAllReservationsByStation }