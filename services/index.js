var stationDao = require('../dao/stations.dao')

function getStations (req, res) {
  stationDao.getStations()
    .then(stations => { res.status(200).json(stations) })
    .catch(e => { res.status(404).json([]) })
}
module.exports = getStations