// require the User and Scooter classes - see where they can be used in ScooterApp.js
const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  // ScooterApp code here
  constructor(){
    this.stations = 
    {
      DeepEllum: [],
      OakCliff: [],
      UpTown: [],
    }
    this.registeredUsers = {}
  }

  registerUser(username, password, age){
    if(this.registeredUsers[username]){
      throw new Error('already registered')
    }
    else if(age < 18){
      throw new Error('too young to register')
    }
    else{
      let user = new User(username, password, age)
      this.registeredUsers["User"] = user
      console.log(this.registeredUsers)
    }
  }
}

const lime = new ScooterApp()

lime.registerUser('evanrosas', '1234', 24)
lime.registerUser('evanrosas', '1234', 24)

module.exports = ScooterApp
