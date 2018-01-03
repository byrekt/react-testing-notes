import MathUtils from './Lesson4'

describe('MathUtils', () => {

  expect.assertions(4)

  describe('MathUtils.add', () => {
    it('adds two integers', () => {
      expect(MathUtils.add(5, 9)).toBe(14)
    })
    it('adds two floats', () => {
      expect(MathUtils.add(5.24, 9.72)).toBe(14.96)
    })
    it('adds an integer and a float', () => {
      expect(MathUtils.add(5.24, 9)).toBe(14.24)
    })
    it('throws an error whenever a non-numeric value is passed', () => {
      // TODO Write a test case that verifies that an error is thrown with bad input
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


//     it('throws an error whenever a non-numeric value is passed', () => {

//       function badInput() {
//         MathUtils.add('purple', 7)
//       }
//       expect(badInput).toThrow(`value supplied to 'add' is not a valid number`)
//       expect(badInput).toThrow(TypeError)
//       expect(badInput).toThrow(/not a valid number/)

//       expect(badInput).toThrowErrorMatchingSnapshot()
//     })
//   })
// })