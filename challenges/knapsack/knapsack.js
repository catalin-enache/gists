

function knapsackRec(values, weights, totalWeight, n) {
  if (n < 0 || totalWeight === 0) {
    return 0;
  }

  if (weights[n] > totalWeight) {
    return knapsackRec(values, weights, totalWeight, n - 1);
  }

  const include = values[n] + knapsackRec(values, weights, totalWeight - weights[n], n - 1);
  const exclude = knapsackRec(values, weights, totalWeight, n - 1);

  const max = Math.max(include, exclude);
  return max;
}

// https://www.youtube.com/watch?v=nLmhmB6NzcM
// https://www.techiedelight.com/0-1-knapsack-problem/
function knapsackDP(values, weights, totalWeight) {
  const table = Array.from({ length: values.length + 1 }).map(() => {
    return Array(totalWeight + 1).fill(0);
  });

  for (let i = 1; i <= values.length; i++) {
    for (let w = 0; w <= totalWeight; w++) {
      const selfWeight = weights[i - 1];
      const selfValue = values[i - 1];
      const prevRow = table[i - 1];

      // if current item doesn't fit
      if (selfWeight > w) {
        // We cannot include self yet. Prev objects are best so far.
        // So, we copy same column from prev row.
        table[i][w] = prevRow[w];
      } else {
        // Include self or not.
        // Take what's greater between prev row same column (existing objects excluding self) and
        // self value added to values of objects existing before self could be added.

        table[i][w] = Math.max(
          prevRow[w - selfWeight] + selfValue, // include
          prevRow[w] // exclude
        );
      }
    }
  }

  console.log(table);

  const maxVal = table[values.length][totalWeight];

  let currVal = maxVal;
  let [rIdx, cIdx] = [table.length - 1, table[0].length - 1];
  const take = [];

  console.log('Determining items to take:');
  while (rIdx > 1 && cIdx > 0) {
    while (table[rIdx - 1][cIdx] === currVal) { // peek
      console.log(`value ${currVal} exists in prev row ${rIdx - 1}, moving to it`);
      // Moving to previous item.
      rIdx = rIdx - 1;
    }

    console.log(`taking row ${rIdx}`);
    const itemIndex = rIdx - 1;
    take.push({ idx: itemIndex, val: values[itemIndex], weight: weights[itemIndex] });
    // Subtracting current item weight from current column and moving to corresponding column.
    cIdx = cIdx - weights[itemIndex];
    // Moving to previous item.
    rIdx = rIdx - 1;
    currVal = table[rIdx][cIdx];
    console.log(`moving up to row ${rIdx} column ${cIdx} having value ${currVal}`);
  }

  return { maxVal, take };
}

// console.log(knapsackRec([20, 5, 10, 40, 15, 25], [1, 2, 3, 8, 7, 4], 10, 5)); // 60
// console.log(knapsackRec([4, 5, 10, 11, 13], [3, 4, 7, 8, 9], 16, 4)); // 23
// console.log(knapsackRec([1, 2, 5, 6], [2, 3, 4, 5], 8, 3)); // 8

console.log(knapsackDP([20, 5, 10, 40, 15, 25], [1, 2, 3, 8, 7, 4], 10)); // 60
// console.log(knapsackDP([4, 5, 10, 11, 13], [3, 4, 7, 8, 9], 16)); // 23
// console.log(knapsackDP([1, 2, 5, 6], [2, 3, 4, 5], 8)); // 8
// console.log(knapsackDP([2, 5, 1, 6], [3, 4, 2, 5], 8)); // 8
// console.log(knapsackDP([1, 2, 3], [1, 1, 1], 2)); // 5
