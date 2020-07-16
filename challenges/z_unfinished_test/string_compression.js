
const _appendToEncoded = (encoded, str, i, count) => {
    if (count === 1) {
        encoded.push(str[i]);
    } else {
        encoded.push(count);
        encoded.push(str[i])
    }
}

// O(N)
const encode = (str) => {
    if (str.length <= 1) {
        return str;
    }

    let encoded = [];
    let count = 1;
    for (let i = 1; i < str.length; i += 1) {
        if (str[i] === str[i - 1]) {
            count += 1;
        } else {
            // encoded is always one char behind
            _appendToEncoded(encoded, str, i - 1, count);
            count = 1; // reset
        }
        // last char triggers final append unconditionally
        if (i === str.length - 1) {
            _appendToEncoded(encoded, str, i, count);
        }
    }
    return encoded.join('');
}

// tries to find and index in str such that
// index - 1 is the same char as index + range
// in order to remove the discontinuity
// O(N)
const _findIndexWhereToCutFrom = (str, range) => {
    if (range == 0) return 0; // don't bother to iterate if nothing to remove
    if (str.length === 1) return 0; // to get rid of annoying case where str.length is 1
    // now we're sure str.length > 1
    let lastChar = str[0];
    let i = 1;
    for (; i < str.length - range; i += 1) {
        if (str[i] !== lastChar) { // discontinuity detected
            if (str[i - 1] === str[i + range]) { // char before sliding window === char after sliding window
                // found the place where if we remove the discontinuity/range
                // the string in left/right proximity will have the same chars
                return i;
            }
        }
        lastChar = str[i];
    }
    return i;
}

// O(N)
const removeSlice = (str, range) => {
    const index = _findIndexWhereToCutFrom (str, range);
    return str.slice(0, index) + str.slice(index + range)
}

// O(N)
function solution(S, K) {
    const slicedString = removeSlice(S, K);
    const encodedSlicedString = encode(slicedString);
    // console.log({ S, K, slicedString, encodedSlicedString }, encodedSlicedString.length);
    return encodedSlicedString.length;
}

const problems = [
  ['AAAAAAAAAAABXXAAAAAAAAAA', 3], // 'AAAAAAAAAAAAAAAAAAAAA', '21A', 3
  ['ABBBCCDDCCC', 3], // 'ABBBCCCC', 'A3B4C', 5
  ['ABCDDDEFG', 2] // 'ABCDDDE', 'ABC2DE', 6
]

for (const prob of problems) {
    console.log(solution(...prob))
}