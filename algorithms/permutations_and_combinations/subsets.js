
// all possible subsets is a power of 2 => 2 ** set.length
function *generateSubsets(set) {
  const max = 1 << set.length;
  for (let config = 0; config < max; config++) {
    const subset = [];
    // cursor does to things
    // Is cursor in set and cursor in config (binary representation).
    for (let cursor = 0; cursor < set.length; cursor++) {
      if ((config & (1 << cursor))) subset.push(set[cursor])
    }
    yield '{' + subset.join(',') + '}';
  }
}

function generateSubsets2(n) {
  let currentSubset = [[]]; // subset for 0
  if (n === 0) return currentSubset;
  for (let i = 1; i <= n; i++) {
    currentSubset = [...currentSubset, ...currentSubset.map((entry) => [...entry, i])];
  }
  return currentSubset;
}

for (let subset of generateSubsets([1, 2, 3])) console.log(subset);
let count = 0;
for (let _ of generateSubsets([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])) count += 1;
console.log(count);
console.log(generateSubsets2(3));
