'use strict';

// https://www.geeksforgeeks.org/binomial-coefficient-dp-9/
// C(n, k) = C(n-1, k-1) + C(n-1, k)
// C(n, 0) = C(n, n) = 1

function binomialCoefficient(n, k) {
  if (k === 0 || k === n) return 1;
  const table = Array.from({ length: n + 1 }).map((_) => Array(k + 1).fill(0));
  for (let _n = 1; _n <= n; _n++) {
    for (let _k = 1; _k <= k; _k++) {
      if (_k === 1) { table[_n][_k] = _n; }
      else if (_k === _n) { table[_n][_k] = 1; }
      else {
        table[_n][_k] = table[_n - 1][_k - 1] + table[_n - 1][_k];
      }
    }
  }
  return table[n][k];
}

console.log(binomialCoefficient(5, 2)); // 10
console.log(binomialCoefficient(4, 2)); // 6