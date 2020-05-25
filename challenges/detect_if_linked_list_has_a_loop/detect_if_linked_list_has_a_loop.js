
// from cracking the code interview book Linked Lists

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const nodes = [1, 2, 3, 4, 5, 6].map((n) => new Node(n));
for (let n = 1; n < nodes.length; n++) {
  nodes[n - 1].next = nodes[n];
}
nodes[nodes.length - 1].next = nodes[3];

function detectCycle(head) {
  let slowRunner = head;
  let fastRunner = head;

  while(fastRunner && fastRunner.next) {
    slowRunner = slowRunner.next;
    fastRunner = fastRunner.next.next;
    if (slowRunner === fastRunner) {
      // we detected the cycle
      slowRunner = head;
      while (slowRunner !== fastRunner) {
        slowRunner = slowRunner.next;
        fastRunner = fastRunner.next;
      }
      return slowRunner; // or fastRunner it doesn't matter
    }
  }
  return false;
}

console.log(detectCycle(nodes[0]));