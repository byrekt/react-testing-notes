import MathUtils from './Lesson2'

describe('MathUtils', () => {

  expect.hasAssertions()

  describe('MathUtils.add', () => {
    it('adds two integers', () => {

    })
    it('adds two floats', () => {

    })
    it('adds an integer and a float', () => {

    })
    it('returns null if one of the values is not a number', () => {

    })
  })
  describe('MathUtils.subtract', () => {
    it('subtracts one integer from another', () => {

    })
    it('subtracts one float from another', () => {

    })
    it('subtracts an integer from a float', () => {

    })
    it('subtracts a float from an integer', () => {

    })
    it('returns null if one of the values is not a number', () => {

    })
  })
})





























































// describe('MathUtils', () => {

//   expect.hasAssertions()

//   describe('MathUtils.add', () => {
//     it('adds two integers', () => {
//       expect(MathUtils.add(5, 9)).toBe(14)
//     })
//     it('adds two floats', () => {
//       expect(MathUtils.add(5.24, 9.72)).toBe(14.96)
//     })
//     it('adds an integer and a float', () => {
//       expect(MathUtils.add(5.24, 9)).toBe(14.24)
//     })
//     it('returns null if one of the values is not a number', () => {
//       expect(MathUtils.add('five', 9.72)).toBe(null)
//     })
//   })
//   describe('MathUtils.subtract', () => {
//     it('subtracts one integer from another', () => {
//       expect(MathUtils.subtract(5, 9)).toBe(-4)
//     })
//     it('subtracts one float from another', () => {
//       expect(MathUtils.subtract(5.24, 9.72)).toBe(-4.48)
//     })
//     it('subtracts an integer from a float', () => {
//       expect(MathUtils.subtract(5.24, 9)).toBe(-3.76)
//     })
//     it('subtracts a float from an integer', () => {
//       expect(MathUtils.subtract(5, 9.72).toFixed(2)).toEqual('-4.72')
//     })
//     it('returns null if one of the values is not a number', () => {
//       expect(MathUtils.subtract('five', 9.72)).toBe(null)
//     })
//   })
// })