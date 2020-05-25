import { insertionSort } from './insertionSort.js';

// https://stackoverflow.com/questions/14368392/radix-sort-vs-counting-sort-vs-bucket-sort-whats-the-difference
// https://en.wikipedia.org/wiki/Bucket_sort
// https://www.geeksforgeeks.org/bucket-sort-2/
function bucketSort(list) {
  const out = [];
  const slotNum = 10;
  const arr = Array.from({ length: slotNum }).map(() => []);

  for (const num of list) arr[Math.floor(num * slotNum)].push(num);

  for (const bucket of arr) insertionSort(bucket);

  for (const bucket of arr) out.push(...bucket);

  return out;
}

const list = [0.11, 0.33, 0.12, 0.33, 0.45, 0.54, 0.53, 0.44];
const sorted = bucketSort(list);
console.log(sorted);