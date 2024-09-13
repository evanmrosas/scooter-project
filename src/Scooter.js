class Scooter {
  // scooter code here
  static nextSerial = 1
  constructor(station){
    this.station = station
    this.user = null
    Scooter.nextSerial++
    this.serial = nextSerial
    this.charge = 100
    this.isBroken = false
  }
  /* 
  Assigns a user to a scooter while checking the condition of the scooter.
  Scooter needs to be above 20 and in good condition
  */
  rent(user){
    if(this.charge > 20 && this.isBroken == false){
      this.user = user
      this.station = null
    } else{
      throw new Error('scooter needs to charge or scooter needs repair');
    }
  }

  //Returns the scooter back to station and unassigns user
  dock(station){
    this.station = station
    this.user = null
  }
}

module.exports = Scooter
