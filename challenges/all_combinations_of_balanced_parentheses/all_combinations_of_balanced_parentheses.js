
// ()()() (()()) ((())) ()(()) (())()

/**
 *
 * @param total Number, how many '(' to use (read only).
 * @param iTotal Number, internal total (subtracting 1 when using '(').
 * @param currentStr String, current string built so far for current result.
 * @param opened Number, how many '(' were used so far.
 * @param balance Number, how many used '(' were not closed so far.
 * @return {IterableIterator<*>}
 */
function *allBalancedParentheses(total, iTotal=total, currentStr='', opened=0, balance=0) {
  const canOpen = !!iTotal;
  const canClose = !!balance;
  const mustClose = opened === total;
  const currentStrDone = !iTotal && !balance;

  if (currentStrDone) {
    yield currentStr;
    return;
  }

  if (mustClose) {
    yield *allBalancedParentheses(total, iTotal, currentStr + ')', opened, balance - 1);
  } else {
    if (canClose) {
      yield *allBalancedParentheses(total, iTotal, currentStr + ')', opened, balance - 1);
    }
    if (canOpen) {
      yield *allBalancedParentheses(total, iTotal - 1, currentStr + '(', opened + 1, balance + 1);
    }
  }
}

const result = [];
console.log([...allBalancedParentheses(3)]); // ()()() (()()) ((())) ()(()) (())()
console.log([...allBalancedParentheses(3)].length);
console.log([...allBalancedParentheses(4)].length);
console.log([...allBalancedParentheses(5)].length);