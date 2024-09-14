// require the User and Scooter classes - see where they can be used in ScooterApp.js
const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  constructor() {
    this.stations = {
      DeepEllum: [],
      OakCliff: [],
      UpTown: [],
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (this.registeredUsers[username]) {
      throw new Error('already registered');
    }
    if (age < 18) {
      throw new Error('too young to register');
    }
    let user = new User(username, password, age);
    this.registeredUsers[username] = user;
    return user;
  }

  loginUser(username, password) {
    if (this.registeredUsers[username]) {
      const user = this.registeredUsers[username];
      user.login(password);
      console.log(`${username} has been logged in`);
    } else {
      throw new Error('Username or password is incorrect');
    }
  }

  logoutUser(username) {
    if (this.registeredUsers[username]) {
      const user = this.registeredUsers[username];
      user.logout();
      console.log(`${username} has been logged out`);
    } else {
      throw new Error('no such user is logged in');
    }
  }

  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error('No such station exists');
    }
    let newScooter = new Scooter(); // Initialize without a station
    this.stations[station].push(newScooter);
    console.log(`Created new scooter at ${station}:`, newScooter);
    return newScooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error('No such station exists');
    }
    if (scooter.station === station) {
      throw new Error('Scooter already at the station');
    }
    this.stations[station].push(scooter);
    scooter.dock(station); // Update scooter's internal state
    console.log(`Scooter ${scooter.serial} is docked at ${station}`);
  }

  rentScooter(scooter, user) {
    if (scooter.user !== null) {
      throw new Error('Scooter already rented');
    }
    let foundStation = null;
    for (const station in this.stations) {
      const index = this.stations[station].indexOf(scooter);
      if (index !== -1) {
        foundStation = station;
        this.stations[station].splice(index, 1);
        break;
      }
    }
    if (!foundStation) {
      throw new Error('Scooter not found at any station');
    }
    scooter.rent(user);
    console.log(`Scooter ${scooter.serial} is rented to ${user.username}`);
  }

  print() {
    console.log('--- Registered Users ---');
    for (const username in this.registeredUsers) {
      const user = this.registeredUsers[username];
      console.log(`Username: ${username}, Age: ${user.age}, Logged In: ${user.loggedIn}`);
    }

    console.log('\n--- Scooter Stations ---');
    for (const station in this.stations) {
      const scooters = this.stations[station];
      console.log(`Station: ${station}, Scooters Available: ${scooters.length}`);
    }
  }
}

module.exports = ScooterApp;
