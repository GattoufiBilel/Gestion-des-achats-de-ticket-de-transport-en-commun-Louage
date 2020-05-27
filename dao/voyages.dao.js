var db = require('../database/connection');
var SqlString = require('sqlstring');
var knex = require('../database/knex')

const table = {
  name: 'voyages',
  uidVoyage: 'uid_voyage',
  arrive: 'arrive',
  heureDepart: 'heure_depart',
  heureArrive: 'heure_arrive',
  dateDepart: 'date_depart',
  prixPlace: 'prix_place',
  nbPlaces: 'nb_places',
  idStation: 'id_station',
  numSerieVehicule: 'num_serie_vehicule',
  timestamp: 'timestamp_voyage'
}

module.exports = VoyagesDao = {

  addVoyage (Voyage) {
    let { uidVoyage, arrive, heureDepart, heureArrive, dateDepart, prixPlace, nbPlaces, idStation, numSerieVehicule } = Voyage

    return knex(table.name).insert({
      uid_voyage: uidVoyage, arrive,
      heure_depart: heureDepart, heure_arrive: heureArrive, date_depart: dateDepart,
      prix_place: prixPlace, nb_places: nbPlaces,
      id_station: idStation,
      num_serie_vehicule: numSerieVehicule,
      timestamp_voyage: new Date().toISOString()
    })
  },
  updateVoyage (Voyage) {
    let { uidVoyage, arrive, heureDepart, heureArrive, dateDepart, prixPlace, nbPlaces } = Voyage

    const rq = `update ${table.name} 
    set ${table.arrive} = ? ,
        ${table.heureDepart} = ?,${table.heureArrive} = ?,
        ${table.dateDepart} = ?,
        ${table.prixPlace} = ?,
        ${table.nbPlaces} = ?
    where ${table.uidVoyage} = ? `;

    const sql = SqlString.format(rq,
      [arrive, heureDepart, heureArrive, dateDepart, prixPlace, nbPlaces, uidVoyage]
    );

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },
  updateNbPlaces (nbPlaces, uidVoyage, flag = 'dec') {
    let sql = '';
    if (flag === 'inc') {
      sql = `update ${table.name} set ${table.nbPlaces} = ${table.nbPlaces} + ${nbPlaces} 
      where ${table.uidVoyage} = '${uidVoyage}' `;
    }
    else {
      const rq = `update ${table.name} set ${table.nbPlaces} = ? where ${table.uidVoyage} = ? `;
      sql = SqlString.format(rq, [nbPlaces, uidVoyage]);
    }

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },
  deletVoyage (uidVoyage) {
    return knex(table.name).where(table.uidVoyage, '=', uidVoyage).del()
  },
  getVoyageByStation (idStation) {
    const rq = `SELECT * FROM ${table.name} v JOIN vehicules s 
    ON v.num_serie_vehicule = s.num_serie WHERE v.id_station = ?`;

    const sql = SqlString.format(rq, idStation)

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },
  getVoyageByNomStation (nomStation) {
    const rq = `SELECT * FROM ${table.name} v 
    JOIN vehicules ON vehicules.num_serie = v.num_serie_vehicule
    JOIN stations s ON v.id_station = s.id_station    
    WHERE s.nom_station = ? `;

    const sql = SqlString.format(rq, nomStation);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },
  getVoyages () {
    return knex(table.name).join('stations', 'voyages.id_station', '=', 'stations.id_station')
  },
  getVoyageById (uidVoyage) {
    return knex(table.name)
      .join('stations', 'voyages.id_station', '=', 'stations.id_station')
      .where({ uid_voyage: uidVoyage })
  },
  geFulltVoyageById (uidVoyage) {
    const rq = `SELECT * FROM ${table.name} v 
    JOIN vehicules ON vehicules.num_serie = v.num_serie_vehicule
    JOIN stations s ON v.id_station = s.id_station    
    WHERE v.uid_voyage = ? `;

    const sql = SqlString.format(rq, uidVoyage);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  },
  nbPlacesByDestination (arrive, timestampVoyage, station) {
    const rq = `SELECT sum(v.nb_places) as nb
    FROM ${table.name} v join stations s
    on v.id_station = s.id_station
    where v.arrive = ? and v.timestamp_voyage = ? and s.nom_station = ? 
    GROUP BY v.nb_places`;

    const sql = SqlString.format(rq, [arrive, timestampVoyage, station]);

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}