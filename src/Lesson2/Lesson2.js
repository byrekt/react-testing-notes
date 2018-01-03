export default  {
  add: (a, b) => (isNaN(a) || isNaN(b)) ? null : a + b,
  subtract: (a, b) => (isNaN(a) || isNaN(b)) ? null : a - b
}