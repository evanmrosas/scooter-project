const User = require('../src/User')

const user = new User('Joe Bloggs', 'test123', 21)

// User tests here
describe('User property tests', () => {
  // test username
  test('username should be a string', () => {
    expect(typeof user.username).toBe('string')
  })
  // test password
  test('password should be string', () =>{
    expect(typeof user.password).toBe('string')
  })
  // test age
  test('age should be a number', () =>{
    expect(typeof user.age).toBe('number')
  })
})

describe('User methods tests', () =>{
  // test login
  test('should log in successfully with correct password', () => {
    user.login('test123')
    expect(user.loggedIn).toBe(true)
  })

  test('should throw error with incorrect password', () => {
    expect(() => {
      user.login('wrongPassword')
    }).toThrow('incorrect password')
  })

  // test logout
  test('should log out successfully', () => {
    user.logout() // logs out the user
    expect(user.loggedIn).toBe(false)
  })
})