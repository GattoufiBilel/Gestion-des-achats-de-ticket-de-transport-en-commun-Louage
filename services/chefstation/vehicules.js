var vehiculeDao = require('../../dao/vehicules.dao')
var Vehicule = require('../../model/Vehicule.model')

function getVehicules (req, res) {
  vehiculeDao.getVehicules()
    .then(vehicules => { res.render('chefstation/vehicule/lister', { vehicules }) })
    .catch(e => { res.render('chefstation/vehicule/lister') })
}

function addVehicule (req, res) {
  let { numSerie, proprietaire, nbPlaces } = req.body
  let newVehicule = new Vehicule(numSerie, proprietaire, nbPlaces)
  vehiculeDao.addVehicule(newVehicule)
    .then(r => { res.redirect('/chefstation/vehicules') })
    .catch(e => { res.render('chefstation/vehicule/ajout', { msg: 'Vehicule deja existe', e: 'error' }) })
}

function deleteVehicule (req, res) {
  vehiculeDao.deletVehicule(req.query.numserie)
    .then(r => { res.status(200).json({ msg: 'Une véhicule a été bien supprimer' }) })
    .catch(e => { res.status(404).json({ msg: 'vous ne pouvez pas supprimer cette véhicule' }) })
}

function getVehicule (req, res) {
  vehiculeDao.getVehicule(req.query.numserie)
    .then(vehicule => { res.render('chefstation/vehicule/modifier', { vehicule }) })
    .catch(e => { res.redirect('/404') })
}

function updateVehicule (req, res) {
  let { numserie, proprietaire, nbPlaces } = req.body
  let newVehicule = new Vehicule(numserie, proprietaire, nbPlaces)
  vehiculeDao.updateVehicule(newVehicule)
    .then(r => { res.redirect('/chefstation/vehicules') })
    .catch(e => { res.redirect('/404') })
}

module.exports = { getVehicules, addVehicule, deleteVehicule, getVehicule, updateVehicule }