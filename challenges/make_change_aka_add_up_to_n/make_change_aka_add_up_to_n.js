
/*
Given an infinite number of
quarters (25 cents), dimes (10 cents), nickels (5 cents) and pennies (1 cent),
write code to calculate the number of ways of representing n cents.
*/

// const Q = 25;
// const D = 10;
// const N = 5;
// const P = 1;
const Q = 25;
const D = 10;
const N = 5;
const P = 1;

function makeChange(n, denom) {
  let nextDenom = 0;
  switch (denom) {
    case 25:
      nextDenom = 10;
      break;
    case 10:
      nextDenom = 5;
      break;
    case 5:
      nextDenom = 1;
      break;
    case 1:
      return 1;
  }
  let ways = 0;
  for (let i = 0; i * denom <= n; i++) {
    ways += makeChange(n - i * denom, nextDenom);
  }
  return ways;
}

function makeChange1(sum, print) {
  let ways = 0;
  for (let q = 0; q * 25 <= sum; q++) {
    for (let d = 0; d * 10 <= sum - q * 25; d++) {
      for (let n = 0; n * 5 <= sum - q * 25 - d * 10; n++) {
        const p = sum - q * 25 - d * 10 - n * 5;
        ways += 1;
        print && console.log({ q, d, n, p });
      }
    }
  }
  return ways;
}

function makeChange2(rest, print, denom = 25, str = '') {
  const nextDenom = {
    25: 10,
    10: 5,
    5: 1
  }[denom];

  if (denom === 1) {
    print && console.log(str + '1:', rest);
    return 1;
  }

  let ways = 0;
  for (let m = 0; m * denom <= rest; m++) {
    if (denom === 25) {
      str = `${denom}: ${m}  `;
    } else {
      str = str.replace(new RegExp(` ${denom}: \\d+\\s*`), ' ');
      str += `${denom}: ${m}  `;
    }
    ways += makeChange2(rest - m * denom, print, nextDenom, str);
  }
  return ways;
}

/*
sum: 25

[
25,             0,
25, 15, 5,
25, 20, 15, 10, 5, 0,    15, 10, 5, 0,     5, 0,
0,0,0,0,0                0,0,0             0
]

sum: 30
[
30, 5,
30, 20, 10, 0,           5,
30, 25, 20, 15, 10, 5, 0,     20, 15, 10, 5, 0     10, 5, 0,     5, 0
0,0,0,0,0,0                   0,0,0,0             0,0,             0
]

total ways === count the zeroes

*/

function makeChange3(sum) {
  let ways = 0;
  const queue = [];
  const coins = [25, 10, 5, 1];
  const rest = sum;
  const coin = coins.shift();

  // seed the queue
  for (let j = 0; j * coin <= rest; j++) {
    const newEntry = rest - j * coin;
    queue.push(newEntry);
    if (newEntry === 0) ways++;
  }

  while(coins.length) {
    let i = queue.length;
    const coin = coins.shift();
    while (i > 0) {
      const rest = queue.shift();
      if (!rest) {
        i -= 1;
        continue;
      }
      for (let j = 0; j * coin <= rest; j++) {
        const newEntry = rest - j * coin;
        queue.push(newEntry);
        if (newEntry === 0) ways++;
      }
      i -= 1;
    }
  }

  return ways;
}

console.log(makeChange1(30, true));
console.log(makeChange2(30, true));
console.log(makeChange3(30, 25));
