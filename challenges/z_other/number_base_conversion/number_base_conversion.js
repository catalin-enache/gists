
const map = [
  '0', '1', '2', '3', '4', '5', '6', '7',
  '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'
];

function baseConvert(n, base) {
  const res = [];
  let quotient = n;
  while (quotient) {
    const reminder = map[quotient % base];
    quotient = Math.floor(quotient / base);
    res.push(reminder);
  }

  return res.reverse().join('');
}

console.log(baseConvert(9, 2));
console.log(baseConvert(15, 16));