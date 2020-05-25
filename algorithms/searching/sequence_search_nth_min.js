
function quickSelect(seq, k) {
  if (seq.length === 1) return seq[0];
  // const pivot = Math.floor(seq.length / 2);
  const pivot = seq[Math.floor(Math.random() * seq.length)];
  const [less, equal, greater] = [[], [], []];
  seq.forEach((item) => {
    if (item < pivot) less.push(item);
    if (item === pivot) equal.push(item);
    if (item > pivot) greater.push(item);
  });
  if (k <= less.length) {
    return quickSelect(less, k);
  } else if (k <= less.length + equal.length) {
    return pivot;
  } else {
    return quickSelect(greater, k - less.length - equal.length);
  }
}

console.log(quickSelect([12, 11, 14, 13], 3)); // 13