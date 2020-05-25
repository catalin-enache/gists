
const prices = [
  [0, 10, 15, 20],
  [5,  0,  9, 10],
  [6, 13,  0, 12],
  [8,  8,  9, 0]
];

function travelNodesRec(start, rest) {
  if (rest.length === 0) return prices[start][0];

  return Math.min(
    ...rest.map(
      (_, idx) =>
        prices[start][rest[idx]] +
        travelNodesRec(rest[idx], rest.filter((_, i) => i !== idx))
    )
  );
}

// console.log(travelNodesRec(0, [1, 2, 3])); // 35

function* permutation(arr) {
  if (arr.length === 1) {
    yield arr; return;
  }

  const [head, tail] = [arr[0], arr.slice(1)];

  for (const perm of permutation(tail)) {
    for (let i = 0; i <= perm.length; i++) {
      yield [...perm.slice(0, i), head, ...perm.slice(i)];
    }
  }
}

function travelNodesDP(start = 0) {

  let bestPrice = Infinity;
  let bestPath = null;

  for (const perm of permutation(
    Array.from({ length: prices.length }).map((_, i) => i).filter((i) => i !== start )
  )) {
      const path = [start, ...perm, start];
      let price = 0;
      for (let i = 1; i < path.length; i++) {
        price += prices[path[i-1]][path[i]];
      }
      if (price < bestPrice) {
        bestPrice = price;
        bestPath = path;
      }
  }

  return { bestPath, bestPrice };
}

console.log(travelNodesDP());
