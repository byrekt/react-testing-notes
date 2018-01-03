export default function repeater(n, functionToRepeat) {
  if (isNaN(n) || n % 1 !== 0 || n < 1) {
    throw new TypeError(`${n} is not a valid positive integer`)
  }
  if (typeof functionToRepeat !== 'function') {
    throw new TypeError('2nd argument should be a function to repeat')
  }

  for (let i = 0; i < n; ++i) {
    functionToRepeat()
  }
}