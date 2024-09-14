const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')
const Scooter = require('../src/Scooter')

const scooterApp = new ScooterApp()

// register user
describe('registerUser method tests', () => {
  test('Should return instance of User', () => {
    const response = scooterApp.registerUser('Joe Bloggs', 'test123', 21)
    expect(response).toBeInstanceOf(User)
  })

  test('Should throw error for already registered user', () => {
    expect(() => scooterApp.registerUser('Joe Bloggs', 'test123', 21)).toThrow('already registered')
  })

  test('Should throw error for underage user', () => {
    expect(() => scooterApp.registerUser('John Doe', 'test123', 17)).toThrow('too young to register')
  })
})

// login user
describe('loginUser method tests', () => {
  test('Should log user in successfully', () => {
    scooterApp.registerUser('Jane Doe', 'password123', 25)
    const consoleSpy = jest.spyOn(console, 'log')
    scooterApp.loginUser('Jane Doe', 'password123')
    expect(consoleSpy).toHaveBeenCalledWith('Jane Doe has been logged in')
  })

  test('Should throw error for incorrect password', () => {
    expect(() => scooterApp.loginUser('Jane Doe', 'wrongPassword')).toThrow('incorrect password')
  })

  test('Should throw error for unregistered user', () => {
    expect(() => scooterApp.loginUser('NonExistentUser', 'password')).toThrow('Username or password is incorrect')
  })
})

// logout user
describe('logoutUser method tests', () => {
  test('Should log user out successfully', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    scooterApp.logoutUser('Jane Doe')
    expect(consoleSpy).toHaveBeenCalledWith('Jane Doe has been logged out')
  })

  test('Should throw error for unregistered user', () => {
    expect(() => scooterApp.logoutUser('NonExistentUser')).toThrow('no such user is logged in')
  })
})

// rent scooter
describe('rentScooter method tests', () => {
  test('Should dock a scooter successfully', () => {
    const scooter = scooterApp.createScooter('DeepEllum');
    scooterApp.rentScooter(scooter, scooterApp.registeredUsers['Jane Doe']); // Rent first
    const consoleSpy = jest.spyOn(console, 'log');
    scooterApp.dockScooter(scooter, 'DeepEllum'); // Dock the scooter
    expect(consoleSpy).toHaveBeenCalledWith(`Scooter ${scooter.serial} is docked at DeepEllum`);
  });


  test('Should throw error if scooter is already rented', () => {
    const scooter = scooterApp.createScooter('DeepEllum')
    const user = scooterApp.registeredUsers['Jane Doe']
    scooterApp.rentScooter(scooter, user)
    expect(() => scooterApp.rentScooter(scooter, user)).toThrow('Scooter already rented')
  })
})

// dock scooter
describe('dockScooter method tests', () => {
  test('Should dock a scooter successfully', () => {
    const scooter = scooterApp.createScooter('DeepEllum');
    scooterApp.rentScooter(scooter, scooterApp.registeredUsers['Jane Doe']); // Rent first
    const consoleSpy = jest.spyOn(console, 'log');
    scooterApp.dockScooter(scooter, 'DeepEllum'); // Dock the scooter
    expect(consoleSpy).toHaveBeenCalledWith(`Scooter ${scooter.serial} is docked at DeepEllum`);
  });
  
  test('Should throw error if scooter is already at the station', () => {
    const scooter = scooterApp.createScooter('DeepEllum');
    // The scooter needs to be docked first
    scooterApp.dockScooter(scooter, 'DeepEllum');
  
    // Now try docking it again
    expect(() => scooterApp.dockScooter(scooter, 'DeepEllum')).toThrow('Scooter already at the station');
  });
  
  

  test('Should throw error if station does not exist', () => {
    const scooter = scooterApp.createScooter('DeepEllum')
    expect(() => scooterApp.dockScooter(scooter, 'NonExistentStation')).toThrow('No such station exists')
  })
})
