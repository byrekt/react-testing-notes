export default  {
  add: (a, b) => {
    if (isNaN(a) || isNaN(b)) {
      throw new TypeError(`value supplied to 'add' is not a valid number`)
    }
    return a + b
  }
}