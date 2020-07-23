
export class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
    this.parent = null;
    this.height = 0
  }

  toString() {
    return `Node <${this.value}> [${this.children.map((child) => child.toString())}]`
  }
}

export class NodeBin {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.left = null;
    this.right = null;
    this.height = 0
  }

  leftHeight() {
    return this.left ? this.left.height : 0
  }

  rightHeight() {
    return this.right ? this.right.height : 0
  }

  toString() {
    return `Node <${this.value}> { left: ${this.left ? this.left.toString() : 'null'} right: ${this.right ? this.right.toString() : 'null'} }`
  }
}

function isBinary(node) {
  return !node.children;
}

function recomputeHeight(node) {
  const binary = isBinary(node);
  const children = !binary ? node.children : [];
  if (binary && node.left) {
    children.push(node.left);
  }
  if (binary && node.right) {
    children.push(node.right);
  }
  node.height = 1 + (children.length ? Math.max(...children.map((child) => child.height)) : 0);
}

function recomputeTreeHeight(root) {
  const _dfs = isBinary(root) ? postorderBin : postorder;
  for (const node of _dfs(root, false)) recomputeHeight(node);
}

function isBalanced(node) {
  return Math.abs(node.leftHeight() - node.rightHeight()) <= 1;
}

// This function is only called from within tall_grandchild_bin.
// If children have equal height, chooses the left child if the input node is a left child,
// or the right child if the input node is the right child.
function tallChildBin(node) {
  if (node.leftHeight() > node.rightHeight()) {
    return node.left;
  } else if (node.rightHeight() > node.leftHeight()) {
    return node.right;
  } else { // left an right have equal height
    // it is assumed that when left and right children have equal heights
    // node has a parent
    return node === node.parent.left ? node.left : node.right;
  }
}

function tallGrandchildBin(node) {
  // when this function is called it is known that
  // node has grandchildren and is not balanced
  return tallChildBin(tallChildBin(node));
}

function relinkBin(parent, child, makeLeftChild=false) {
  // Relink parent node with child node (we allow child to be None).
  if (makeLeftChild) {
    parent.left = child;
  } else {
    parent.right = child;
  }
  if (child) {
    child.parent = parent;
  }
}

function rotateBin(node) {
  // Rotate node above its parent | swaps node with its parent
  const x = node;
  const y = x.parent;
  const z = y.parent; // grandparent z might be null

  if (z === null) {
    x.parent = null; // x becomes root
  } else {
    relinkBin(z, x, y === z.left); // x becomes a direct child of z
  }

  if (x === y.left) {
    relinkBin(y, x.right, true);
    relinkBin(x, y, false);
  } else {
    relinkBin(y, x.left, false);
    relinkBin(x, y, true);
  }
}

function restructureBin(x) {
  // Perform trinode restructure of node x with parent/grandparent
  const y = x.parent;
  const z = y.parent;

  if ((x === y.right) === (y === z.right)) { // matching alignments
    rotateBin(y); // single rotation (of y)
    return y;
  } else { // opposite alignments
    rotateBin(x); // double rotation (of x)
    rotateBin(x);
    return x;
  }
}

function restructureBin2(x) {
  const y = x.parent;
  const z = y.parent;
  let [a, b, c] = [null, null, null];

  if (z.value < x.value && x.value < y.value) { // RL
    [a, b, c] = [z, x, y];
  } else if (z.value > x.value && x.value > y.value) { // LR
    [a, b, c] = [y, x, z];
  } else if (z.value < y.value && y.value < x.value) { // RR
    [a, b, c] = [z, y, x];
  } else if (z.value > y.value && y.value > x.value) { // LL
    [a, b, c] = [x, y, z];
  }

  if (!z.parent) {
    b.parent = null; // b becomes root
  } else {
    relinkBin(z.parent, b, z.parent.left === z)
  }

  if(![x, y, z].includes(b.left)) {
    relinkBin(a, b.left, false);
  }
  if(![x, y, z].includes(b.right)) {
    relinkBin(c, b.right, true);
  }
  relinkBin(b, a, true);
  relinkBin(b, c, false);
  return b;
}

function rebalanceBin(node) {
  while (node) { // traverse up the tree, checking for imbalance
    const oldHeight = node.height  // trivially 0 if new node
    if (!isBalanced(node)) {
      // perform trinode restructuring, setting p to resulting root,
      // and recompute new local heights after the restructuring
      node = restructureBin(tallGrandchildBin(node));
      // node = restructureBin2(tallGrandchildBin(node));
      recomputeHeight(node.left);
      recomputeHeight(node.right);
      // rebalancing after insert only requires one trinode rotation
      // but rebalancing after delete might require more trinode rotations
    }
    recomputeHeight(node); // adjust for recent changes
    if (oldHeight === node.height) { // has height changed?
      node = null; // no further changes needed
      // old and new heights being equal happen when rebalancing once after an insert
    } else {
      node = node.parent; // repeat with parent
    }
  }
}

export function treeBuilder(struct, binary = false, node= null) {
  if (!node) {
    node = binary ? new NodeBin(struct.value) : new Node(struct.value);
    treeBuilder(struct, binary, node);
    recomputeTreeHeight(node);
    return node;
  } else {
    if (binary) {
      if (Object.keys(struct.left).length) {
        const left = new NodeBin(struct.left.value);
        left.parent = node;
        node.left = left;
        treeBuilder(struct.left, binary, left);
      }
      if (Object.keys(struct.right).length) {
        const right = new NodeBin(struct.right.value);
        right.parent = node;
        node.right = right;
        treeBuilder(struct.right, binary, right);
      }
    } else {
      for (let obj of struct.children) {
        const child = new Node(obj.value);
        child.parent = node;
        node.children.push(child);
        treeBuilder(obj, binary, child);
      }
    }

  }
}

export function printTree(node, path=null, printHeight=false, indent = 0) {
  const label = !path ? '' : path.join('.') + ': ';
  console.log('\t'.repeat(indent), label, node.value, printHeight ? `(${node.height})` : '');
  path && path.push(0);
  for (let child of node.children) {
    printTree(child, path, printHeight, indent + 1);
    if (path) path[path.length - 1] += 1;
  }
  path && path.pop();
}

export function printTreeBin(node, printHeight=false, indent = 0) {
  if (!node) {
    console.log('\t'.repeat(indent), '*');
    return;
  }
  printTreeBin(node.right, printHeight,indent + 1);
  console.log('\t'.repeat(indent), node.value, printHeight ? `(${node.height})` : '');
  printTreeBin(node.left, printHeight, indent + 1);
}

export function find(node, value) {
  if (node.value === value) return node;
  for (let child of node.children) {
    const result = find(child, value);
    if (result) return result;
  }
  return null;
}

export function findWithPath(node, value, path = []) {
  if (node.value === value) {
    path.push(node);
    return path;
  }
  for (let child of node.children) {
    const result = findWithPath(child, value, path);
    if (result.length) {
      result.push(node);
      return result;
    }
  }
  return [];
}

export function findIter(root, value) {
  // using BFS
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node.value === value) {
      return node;
    }
    for (let child of node.children) {
      queue.push(child);
    }
  }
}

export function findIterWithPath(root, value) {
  // using BFS
  // https://stackoverflow.com/questions/8922060/how-to-trace-the-path-in-a-breadth-first-search
  const queue = [[root]];
  while (queue.length) {
    const path = queue.shift();
    const node = path[0];
    if (node.value === value) {
      return path;
    }
    for (let child of node.children) {
      queue.push([child, ...path]);
    }
  }
  return [];
}

export function findBin(node, value) {
  if (node === null) return null;
  if (value === node.value) return node;
  if (value > node.value) {
    return findBin(node.right, value);
  } else {
    return findBin(node.left, value);
  }
}

export function findBinWithPath(node, value, path=[]) {
  if (node === null) return [];
  if (node.value === value) {
    path.push(node);
    return path;
  }
  if (value > node.value) {
    const result = findBinWithPath(node.right, value, path);
    result.length && result.push(node);
    return result;
  } else {
    const result = findBinWithPath(node.left, value, path);
    result.length && result.push(node);
    return result;
  }
}

export function findBinIter(node, value) {
  while (node && value !== node.value) {
    node = value > node.value ? node.right : node.left;
  }
  return node;
}

export function findBinIterWithPath(node, value) {
  const path = [node];
  while (node && value !== node.value) {
    node = value > node.value ? node.right : node.left;
    path.unshift(node);
  }
  return node ? path : [];
}

export function firstBin(node) {
  while (node.left) node = node.left;
  return node;
}

export function lastBin(node) {
  while (node.right) node = node.right;
  return node;
}

export function beforeBin(node) {
  if (node.left) { return lastBin(node.left); }
  let parent = node.parent;
  while(parent && parent.left === node) {
    node = parent;
    parent = node.parent;
  }
  return parent;
}

export function afterBin(node) {
  if (node.right) { return firstBin(node.right); }
  let parent = node.parent;
  while(parent && parent.right === node) {
    node = parent;
    parent = node.parent;
  }
  return parent;
}

export function depth(root, nodeVal) {
  return findWithPath(root, nodeVal).length - 1;
}

export function depthBin(root, nodeVal) {
  return findBinWithPath(root, nodeVal).length - 1;
}

export function depth2(node) {
  if (!node.parent) return 0;
  return 1 + depth2(node.parent);
}

export function height(node) {
  if (!node.children.length) return 0;
  return 1 + Math.max(...node.children.map(height));
}

export function heightBin(node) {
  if (!node || !node.left && !node.right) return 0;
  return 1 + Math.max(...[node.left, node.right].map(heightBin));
}

export function subtreeSearchBin(node, value) {
  if (node.value === value) { return node; }
  else if (value < node.value && node.left) { return subtreeSearchBin(node.left, value); }
  else if (node.right) { return subtreeSearchBin(node.right, value); }
  return node;
}

export function findGEBin(node, value) {
  let found = subtreeSearchBin(node, value);
  if (found.value < value) found = afterBin(found);
  return found;
}

export function findLEBin(node, value) {
  let found = subtreeSearchBin(node, value);
  if (found.value > value) found = beforeBin(found);
  return found;
}

export function findRange(node, startVal, stopVal) {
  let walk = [undefined, null].includes(startVal) ? firstBin(node) : findGEBin(node, startVal);
  const range = [];
  while (walk && ([undefined, null].includes(stopVal) || walk.value < stopVal)) {
    range.push(walk);
    walk = afterBin(walk);
  }
  return range;
}

export function insertBin(node, value, rebalance = false) {
  const place = subtreeSearchBin(node, value);
  if (place.value === value) { return; }
  const newNode = new NodeBin(value);
  if (place.value < value) {
    place.right = newNode;
  } else {
    place.left = newNode;
  }
  newNode.parent = place;
  rebalance && rebalanceBin(newNode);
  return newNode;
}

export function deleteBin(node, value, rebalance = false) {
  const found = findBin(node, value);
  if (!found) return;

  // handle one child or no child case
  if (!found.left || !found.right) {
    const onlyChild = found.left || found.right;
    // onlyChild might be null

    // link only_child with parent
    if (found.parent) {
      if (onlyChild) {
        onlyChild.parent = found.parent;
      }
      // if found node is left child of its parent
      if (found.parent.left === found) {
        found.parent.left = onlyChild;
      } else { // found node is right child of its parent
        found.parent.right = onlyChild;
      }
    }

    rebalance && rebalanceBin(found.parent);

    // cut all links
    found.parent = null;
    found.left = null;
    found.right = null;
    return found;
  } else { // found.left && found.right
    const prevInorder = lastBin(found.left); // the right most child from the left subtree.
    // it can also be the left most child from the right subtree
    // swap values between found and prev_inorder
    const prevInorderValue = prevInorder.value;
    prevInorder.value = found.value;
    found.value = prevInorderValue;
    // we know that prevInorder has no right child
    // because prevInorder is the right most child from the left subtree of found.

    // alternate recursive approach
    // return deleteBin(prevInorder, prevInorder.value);

    if (prevInorder.parent === found) {
      // last_bin was the found.left with no right descendants
      // (prev_inorder is left child of its parent)
      prevInorder.parent.left = prevInorder.left; // (left subtree or None) // prev_inorder has no right child
    } else {
      // prev_inorder is a right child of its whatever parent in the chain
      prevInorder.parent.right = prevInorder.left; // (left subtree or None) // prev_inorder has no right child
    }

    rebalance && rebalanceBin(prevInorder.parent);

    // cut all links
    prevInorder.parent = null;
    prevInorder.left = null;
    return prevInorder;
  }
}

export function *bfs(node) {
  const queue = [node];
  while (queue.length) {
    const n = queue.shift();
    yield n.value;
    for (let child of n.children) {
      queue.push(child);
    }
  }
}

export function bfs2(node, asc= true) {
  const result = [];
  const queue = [node];
  while (queue.length) {
    const level = [];
    const levelSize = queue.length;
    for (let i  = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.value);
      for (let child of node.children) {
        queue.push(child);
      }
    }
    result[asc ? 'push': 'unshift'](level);
  }
  return result;
}

export function *bfsBin(node) {
  const queue = [node];
  while (queue.length) {
    const n = queue.shift();
    n.left && queue.push(n.left);
    n.right && queue.push(n.right);
    yield n.value;
  }
}

export function bfsBin2(node, asc = true) {
  const queue = [node];
  const result = [];
  while (queue.length) {
    const level = [];
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const n = queue.shift();
      level.push(n);
      n.left && queue.push(n.left);
      n.right && queue.push(n.right);
    }
    result[asc ? 'push' : 'unshift'](level);
  }
  return result;
}

export function *preorder(node) {
  yield node.value;
  for (let child of node.children) {
    yield *preorder(child);
  }
}

export function *preorderIter(node) {
  const stack = [node];
  while (stack.length) {
    const n = stack.pop();
    yield n.value;
    for (let i = n.children.length; i--;) {
      stack.push(n.children[i]);
    }
  }
}

export function *preorderBin(node) {
  if (!node) return;
  yield node.value;
  yield *preorderBin(node.left);
  yield *preorderBin(node.right);
}

export function *preorderBinIter(node) {
  const stack = [node];
  while (stack.length) {
    const n = stack.pop();
    yield n.value;
    n.right && stack.push(n.right);
    n.left && stack.push(n.left);
  }
}

export function *postorder(node, yieldValue=true) {
  for (let child of node.children) {
    yield *postorder(child, yieldValue);
  }
  yield yieldValue ? node.value : node;
}

// https://www.geeksforgeeks.org/iterative-postorder-traversal/
export function *postorderIter(node) {
  const stack = [node];
  const stack2 = [];
  while (stack.length) {
    const n = stack.pop();
    stack2.push(n);
    for (let i = 0; i < n.children.length; i++) {
      // Push children left to right.
      // Creates a stack looking like preorder visited from right to left [root] [right] [left]
      // which represents postorder reversed.
      stack.push(n.children[i]);
    }
  }
  while (stack2.length) yield stack2.pop().value;
}

export function *postorderBin(node, yieldValue=true) {
  if (!node) return;
  yield *postorderBin(node.left, yieldValue);
  yield *postorderBin(node.right, yieldValue);
  yield yieldValue ? node.value : node;
}

export function *postorderBinIter(node) {
  const stack = [node];
  const stack2 = [];
  while (stack.length) {
    const n = stack.pop();
    stack2.push(n);
    n.left && stack.push(n.left);
    n.right && stack.push(n.right);
  }
  while (stack2.length) yield stack2.pop().value;
}

export function *inorder(node) {
  if (!node) return;
  yield *inorder(node.left);
  yield node.value;
  yield *inorder(node.right);
}

export function eulerTour(node, pre, post, depth = 0, path = []) {
  pre(node, depth, path);
  const results = node.children.map((child) => eulerTour(child, pre, post, depth + 1, path.concat(node)));
  return post(node, depth, path, results);
}

export function eulerTourBin(node, pre, post, invisit, depth = 0, path = []) {
  pre(node, depth, path);
  const results = [null, null];
  if (node.left) {
    results[0] = eulerTourBin(node.left, pre, post, invisit, depth + 1, [...path, node]);
  }
  invisit(node, depth, path);
  if (node.right) {
    results[1] = eulerTourBin(node.right, pre, post, invisit, depth + 1, [...path, node]);
  }
  const answer = post(node, depth, path, results);
  return answer
}

export function lca(node, a, b) {
  const path1 = findWithPath(node, a);
  const path2 = findWithPath(node, b);
  if (!path1.length || !path2.length) return null;
  let path1Idx = path1.length - 1;
  let path2Idx = path2.length - 1;
  while (path1Idx >= -1 && path2Idx >= -1) {
    if (path1[path1Idx] !== path2[path2Idx]) {
      path1Idx++;
      path2Idx++;
      break;
    }
    path1Idx--;
    path2Idx--;
  }
  // also we can return distance between a and b here if we want
  return findWithPath(node, path1[path1Idx].value)[0];
}

// lowest common ancestor bin
export function lcaBin(node, a, b) {
  if (!node) return null;
  if (a === b) return findBin(node, a);
  if (a < node.value && b < node.value) return lcaBin(node.left, a, b);
  if (a > node.value && b > node.value) return lcaBin(node.right, a, b);
  return findBin(node, a) && findBin(node, b) ? node : null;
}


export function buildExpressionTree(str) {
  const num = /\d/;
  const ops = new Set(['+', '-', '/', '*']);
  const closeParen = ')';

  return str.split('').reduce((acc, char) => {
    if (num.test(char)) {
      acc.push(new NodeBin(char));
      // acc.push(char);
    } else if (ops.has(char)) {
      acc.push(char);
    } else if (closeParen === char) {
      const [right, op, left] = [acc.pop(), acc.pop(), acc.pop()];
      const operation = new NodeBin(op);
      operation.left = left;
      operation.right = right;
      acc.push(operation);
    }
    return acc;
  }, [])[0];
}

export function evaluateExpressionTree(node) {
  if (!node.left) return node.value; // can be right too
  const left = evaluateExpressionTree(node.left);
  const right = evaluateExpressionTree(node.right);
  switch (node.value) {
    case '+': return left + right;
    case '-': return left - right;
    case '/': return left / right;
    case '*': return left * right;
  }
}

