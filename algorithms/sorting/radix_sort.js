// https://stackoverflow.com/questions/14368392/radix-sort-vs-counting-sort-vs-bucket-sort-whats-the-difference
// https://brilliant.org/wiki/radix-sort/
// https://www.geeksforgeeks.org/radix-sort/

function log(num, base){
  return Math.log(num) / Math.log(base);
}

function countingSort(A, digit, radix) {
  // "A" is a list to be sorted, radix is the base of the number system,
  // digit is the digit we want to sort by

  // create a list B which will be the sorted list
  const B = Array.from({ length: A.length }).map(() => 0);
  const C = Array.from({ length: radix }).map(() => 0);

  const getDigit = (num, idx) => {
    const digits = Math.ceil(log(num, radix));
    return idx >= digits ? 0 : Math.floor((num / (radix ** digit)) % radix);
  }

  // counts the number of occurrences of each digit in A
  for (let i = 0; i < A.length; i++) {
    const digitOfAi = getDigit(A[i], digit);
    C[digitOfAi] += 1;
  }

  // this FOR loop changes C to show the cumulative # of digits up to that index of C
  for (let j = 1; j < radix; j++) {
    C[j] = C[j] + C[j - 1];
  }

  for (let i = A.length - 1; i >= 0; i--) { // # to count down (go through A backwards)
    const digitOfAi = getDigit(A[i], digit);
    C[digitOfAi] -= 1;
    B[C[digitOfAi]] = A[i];
  }

  return B;
}

function radixSort(A, radix) {
  // radix is the base of the number system
  // k is the largest number in the list
  const k = Math.max(...A);
  // output is the result list we will build
  let output = A;
  // compute the number of digits needed to represent k
  // Math.ceil(log(k, radix)) || Math.floor(log(k, radix) + 1)
  const digits = Math.ceil(log(k, radix));
  for (let digit = 0; digit < digits; digit++) {
    output = countingSort(output, digit, radix);
  }

  return output;
}

function countingSortString(A, charIdx) {
  const radix = 256; // alphabet ASCII radix
  // all strings must have same length (padding right with space if not)
  const charAt = (s, i) => s.length - 1 < i ? ' ' : s[i];
  const B = Array.from({ length: A.length }).map(() => 0);
  const C = Array.from({ length: radix }).map(() => 0);

  for (let i = 0; i < A.length; i += 1) {
    const str = A[i];
    const char = charAt(str, charIdx);
    const charCodeAtIdx = char.charCodeAt(0);
    C[charCodeAtIdx] += 1;
  }

  for (let j = 1; j < radix; j++) {
    C[j] = C[j] + C[j - 1];
  }

  // Reading from the end to account for charCodeAtIdx being the same for multiple entries
  // and we need to insert those entries in right order as they were already sorted to the right of charIdx.
  for (let i = A.length - 1; i >= 0; i -= 1) {
    const str = A[i];
    const char = charAt(str, charIdx);
    const charCodeAtIdx = char.charCodeAt(0);
    B[--C[charCodeAtIdx]] = str;
  }

  return B;
}

function bucketSpreadCollect(A, charIdx) {
  const radix = 256; // alphabet ASCII radix
  // all strings must have same length (padding right with space if not)
  const charAt = (s, i) => s.length - 1 < i ? ' ' : s[i];
  const B = [];
  const C = Array.from({ length: radix }).map(() => []);

  for (let i = 0; i < A.length; i += 1) {
    const str = A[i];
    const char = charAt(str, charIdx);
    const charCodeAtIdx = char.charCodeAt(0);
    C[charCodeAtIdx].push(str);
  }

  for (let i = 0; i < C.length; i += 1) {
    const bucket = C[i];
    while (bucket.length) {
      B.push(bucket.shift())
    }
  }

  return B;
}

function radixSortString(A) {
  const maxLength = Math.max(...A.map((s) => s.length));
  let output = A;
  for (let charIdx = maxLength - 1; charIdx >= 0; charIdx -= 1) {
    output = countingSortString(output, charIdx)
    // output = bucketSpreadCollect(output, charIdx)
  }
  return output;
}

const list = [111, 321, 332, 89, 3245, 45, 2, 7];
const sorted = radixSort(list, 10);
console.log(sorted);

const listStr = ['za', 'a', 'ab', 'az', 'fit', 'fis', 'cc', 'cccc', 'bcd',  'c', 'b'];
// const listStr = ['az', 'ab'];
const sortedStr = radixSortString(listStr);
console.log(sortedStr);
