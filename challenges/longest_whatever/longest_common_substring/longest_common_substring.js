
function lcs(str1, str2) {
  const str1Length = str1.length;
  const str2Length = str2.length;
  let maxLen = 0;
  let endingIdx = 0;

  const table = Array.from({ length: str1Length + 1 }).map(() => {
    return Array(str2Length + 1).fill(0);
  });

  for (let r = 1; r <= str1Length; r++) {
    for (let c = 1; c <= str2Length; c++) {
      const c1 = str1[r - 1];
      const c2 = str2[c - 1];
      if (c1 === c2) {
        const count = table[r - 1][c - 1] + 1;
        table[r][c] = count;

        if (count > maxLen) {
          maxLen = count;
          endingIdx = r;
        }

      }
    }
  }
  console.log(table);
  return str1.substr(endingIdx - maxLen, maxLen);
}

// console.log(lcs('abc', 'baba')); // ab
console.log(lcs('bcadaas', 'raav')); // aa