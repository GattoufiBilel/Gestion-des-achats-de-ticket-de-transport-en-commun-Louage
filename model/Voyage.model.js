module.exports = class Voayge {
  constructor (
    uidVoyage, 
    arrive,
    heureDepart,
    heureArrive, 
    dateDepart,   
    prixPlace,
    nbPlaces, 
    idStation, 
    numSerieVehicule
  ) {
    this.uidVoyage = uidVoyage || ''
    this.arrive = arrive.toLowerCase() || ''
    this.heureDepart = heureDepart || ''
    this.heureArrive = heureArrive || ''
    this.dateDepart = dateDepart || ''
    this.prixPlace = prixPlace || ''
    this.nbPlaces = nbPlaces || ''
    this.idStation = idStation || ''
    this.numSerieVehicule = numSerieVehicule || ''
  }
}