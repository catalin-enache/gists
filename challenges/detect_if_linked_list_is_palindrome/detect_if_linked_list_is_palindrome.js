
// from cracking the code interview book Linked Lists

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const nodes = [1, 2, 3, 4, 3, 2, 1].map((n) => new Node(n));
for (let n = 1; n < nodes.length; n++) {
  nodes[n - 1].next = nodes[n];
}


function isPalindrome(head) {
  let slowRunner = head;
  let fastRunner = head;
  const stack = [];

  while (fastRunner && fastRunner.next) {
    stack.push(slowRunner.value);
    slowRunner = slowRunner.next;
    fastRunner = fastRunner.next.next;
  }
  // If fastRunner is null then the list is even
  // else is the list is odd.
  if (fastRunner !== null) slowRunner = slowRunner.next;

  while (slowRunner !== null) {
    const stackVal = stack.pop();
    if (stackVal !== slowRunner.value) return false;
    slowRunner = slowRunner.next;
  }

  return true;
}

console.log(isPalindrome(nodes[0]));