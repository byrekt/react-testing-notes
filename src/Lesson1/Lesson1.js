export default function (n) {
  let x = 0
  let y = 1

  if (n < 0 || isNaN(n) || n % 1 !== 0) {
    return -1
  }
  if (n <= 2) {
    return n - 1
  }

  for (let i = 0; i < n; i++) {
    let tempY = y
    y = tempY + x
    x = tempY;
  }

  return y
}