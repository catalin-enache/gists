// https://stackoverflow.com/questions/14368392/radix-sort-vs-counting-sort-vs-bucket-sort-whats-the-difference
// https://brilliant.org/wiki/counting-sort/
// https://www.programiz.com/dsa/counting-sort

function countingSort(arr, max) {
  // If max not given then find out max.
  const out = Array.from({ length: arr.length });
  // Initialize count array with all zeros.
  const count = Array.from({ length: max + 1 }).map(() => 0);
  // Find the total count of each unique element and
  // store the count at jth index in count array.
  arr.forEach((e) => count[e]++);
  // Find the cumulative sum and store it in count array itself.
  for (let i = 1; i < count.length; i++) {
    count[i] = count[i] + count[i - 1];
  }
  // Restore the elements to array
  // decrease count of each element restored by 1
  for (let i = 0; i < arr.length; i++){
      // out[count[arr[i]] - 1] = arr[i];
      // count[arr[i]]--;
      out[--count[arr[i]]] = arr[i];
  }

  return out;
}

const list = [7, 9, 1, 4, 6, 7, 1, 0, 3, 2, 8, 0];
const sorted = countingSort(list, 9);
console.log(sorted);