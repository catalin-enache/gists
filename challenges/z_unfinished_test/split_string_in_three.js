
// ~O(N^2)
function *subsets(seq, k, head=[]) {
  if (k === 1) {
    yield [seq];
  } else {
    while (seq.length > 1) {
      head.push(seq.shift())
      const rest = [...seq];
      for (let _subsets of subsets(rest, k - 1)) {
        // console.log([head, ..._subsets])
        yield [head, ..._subsets];
      }
    }
  }
}

// for (let s of subsets('abcde'.split(''), 3)) console.log(s);

// O(N)
const findIndexesOfA = (str) => {
  const a_indexes = Array.from(str).reduce((acc, char, idx) => {
    if (char === 'a') {
      acc.push(idx);
    }
    return acc;
  }, []);
  return a_indexes;
}
//    *      *  *      * // the four a positions we're interested in
//      ||||  ..  |||| => possible split positions // total is first times second
// ..aa bbbb a..a bbbb aa..
// O(N^2) due to the case where we have no 'a' and we have to find all possible three groups
function solution(S) {
  const a_indexes = findIndexesOfA(S);
  if (!a_indexes.length) return [...subsets(S.split(''), 3)].length; // all possible three groups
  if (a_indexes.length % 3) return 0; // not possible to split in three groups having same amount of 'a' chars
  // now we're sure that it can be splitted in three
  // and there are same number of 'a' chars in each group
  const measureUnit = a_indexes.length / 3;
  const firstGroupLastA = a_indexes[measureUnit - 1];
  const middleGroupFirstA = a_indexes[measureUnit];
  const middleGroupLastA = a_indexes[2 * measureUnit - 1];
  const lastGroupFirstA = a_indexes[2 * measureUnit];

  return  (middleGroupFirstA - firstGroupLastA) * (lastGroupFirstA - middleGroupLastA);
}


const problems = [
  'aaa', // 1
  'babaa', // 2
  'ababa', // 4
  'aba', // 0
  'bbbbb', // 6
]

for (let prob of problems) console.log(solution(prob));