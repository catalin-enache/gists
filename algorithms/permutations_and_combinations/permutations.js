
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

function *permutationNK(seq, k) {
  if (k === 1) {
    for (const e of seq) yield [e];
    // [1, 2, 3, 4]
    // [2] and [1, 3, 4]
    // for every <permutation> of [1, 3, 4]
    // new_perm = [2] + <permutation>
  } else {
    for (let i = 0; i < seq.length; i++) {
      const current = seq[i];
      const rest = [...seq.slice(0, i), ...seq.slice(i + 1)];
      for (const perm of permutationNK(rest, k - 1)) {
        yield [current, ...perm]
      }
    }
  }
}

function *permutations_nk_using_stack_2(seq, k=seq.length) {
    const stack = [[[], seq.reverse()]];
    while (stack.length) {
        const [head, tail] = stack.pop();
        if (head.length < k) {
            for (let i = 0; i < tail.length; i += 1) {
                const new_head = [...head, tail[i]];
                const new_tail = [...tail.slice(0, i), ...tail.slice(i + 1)];
                stack.push([new_head, new_tail]);
            }
        } else {
            yield head;
        }
    }
}

for (const perm of permutationNK([0, 1, 2], 3)) console.log(perm);
console.log('-'.repeat(10));
for (const perm of permutation([0, 1, 2])) console.log(perm);
console.log('-'.repeat(10));
for (const perm of permutations_nk_using_stack_2([0, 1, 2])) console.log(perm);
