const Scooter = require('../src/Scooter')

// typeof scooter === object
describe('Scooter class', () => {
  test('Scooter class should create a Scooter instance', () => {
    const scooter = new Scooter('DeepEllum')
    expect(scooter).toBeInstanceOf(Scooter)
  })

  // Testing Scooter properties
  test('Scooter should have correct initial properties', () => {
    const scooter = new Scooter('DeepEllum')
    expect(scooter.station).toBe('DeepEllum')
    expect(scooter.user).toBeNull()
    expect(scooter.charge).toBe(100)
    expect(scooter.isBroken).toBe(false)
  })
})

// Method tests
describe('Scooter methods', () => {
  // tests here!
  // rent method
  test('rent method should assign user if scooter is in good condition', () => {
    const scooter = new Scooter('DeepEllum')
    const user = { username: 'johnDoe' }
    
    scooter.rent(user)
    expect(scooter.user).toBe(user)
    expect(scooter.station).toBeNull()
  })
  test('rent method should throw error if charge is less than 20', () => {
    const scooter = new Scooter('DeepEllum')
    const user = { username: 'johnDoe' }
    scooter.charge = 10

    expect(() => scooter.rent(user)).toThrow('scooter needs to charge or scooter needs repair')
  })

  // dock method
  test('dock method should set the station and clear the user', () => {
    const scooter = new Scooter('DeepEllum')
    const user = { username: 'johnDoe' }

    scooter.rent(user) // Rent it first
    scooter.dock('OakCliff') // Now dock it

    expect(scooter.station).toBe('OakCliff')
    expect(scooter.user).toBeNull()
  })

  // requestRepair method

  // charge method

})
