import repeater from './Lesson5'

describe('repeater', () => {
  it('throws an error whenever a non-integer value is passed as the first argument', () => {
    function badCall () {
      repeater('purple', () => { })
    }
    expect(badCall).toThrowErrorMatchingSnapshot()
  })
  it('throws an error whenever the second argument is not a function', () => {
    function badCall () {
      repeater(5, 7)
    }
    expect(badCall).toThrowErrorMatchingSnapshot()
  })
  it('repeats the function 5 times', () => {

  })
})


























































// describe('repeater', () => {
//   it('throws an error whenever a non-integer value is passed as the first argument', () => {
//     function badCall () {
//       repeater('purple', () => { })
//     }
//     expect(badCall).toThrowErrorMatchingSnapshot()
//   })
//   it('throws an error whenever the second argument is not a function', () => {
//     function badCall () {
//       repeater(5, 7)
//     }
//     expect(badCall).toThrowErrorMatchingSnapshot()
//   })
//   it('repeats the function 5 times', () => {
//     const mockFunction = jest.fn()
//     repeater(5, mockFunction)
//     expect(mockFunction).toHaveBeenCalledTimes(5)
//   })
// })


// Could have also written the test:
// it('repeats the function 5 times', () => {
//   let callbackCallCount = 0
//   repeater(5, () => {
//     callbackCallCount = callbackCallCount + 1
//   })
//   expect(callbackCallCount).toBe(5)
// })
