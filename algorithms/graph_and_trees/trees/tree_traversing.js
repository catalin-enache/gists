
export class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
    this.parent = null;
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
  }
  toString() {
    return `Node <${this.value}> { left: ${this.left ? this.left.toString() : 'null'} right: ${this.right ? this.right.toString() : 'null'} }`
  }
}

export function treeBuilder(struct, binary = false, node= null) {
  if (!node) {
    node = binary ? new NodeBin(struct.value) : new Node(struct.value);
    treeBuilder(struct, binary, node);
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

export function printTree(node, indent = 0) {
  console.log('\t'.repeat(indent), node.value);
  for (let child of node.children) {
    printTree(child, indent + 1)
  }
}

export function printTreeBin(node, indent = 0) {
  if (!node) {
    console.log('\t'.repeat(indent), '*');
    return;
  }
  printTreeBin(node.right, indent + 1);
  console.log('\t'.repeat(indent), node.value);
  printTreeBin(node.left, indent + 1);
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
  let walk = null;
  if ([undefined, null].includes(startVal)) { walk = firstBin(node); }
  else {
    walk = findGEBin(node, startVal)
  }
  const range = [];
  while (walk && ([undefined, null].includes(stopVal) || walk.value < stopVal)) {
    range.push(walk);
    walk = afterBin(walk);
  }
  return range;
}

export function insertBin(node, value) {
  const place = subtreeSearchBin(node, value);
  if (place.value === value) { return; }
  const newNode = new NodeBin(value);
  if (place.value < value) {
    place.right = newNode;
  } else {
    place.left = newNode;
  }
  newNode.parent = place;
  return newNode;
}

export function deleteBin(node, value) {
  const found = findBin(node, value);
  if (!found) return;

  if (!found.left || !found.right) {
    const onlyChild = found.left || found.right;
    // onlyChild might be null
    onlyChild && (onlyChild.parent = found.parent);

    if(found.parent.value > found.value) {
      found.parent.left = onlyChild;
    } else {
      found.parent.right = onlyChild;
    }

    found.parent = null;
    return found;
  } else { // found.left && found.right
    const replacement = lastBin(found.left); // the right most child from the left subtree.
    // it can also be the left most child from the right subtree
    const replacementValue = replacement.value;
    replacement.value = found.value;
    found.value = replacementValue;
    // we know that replacement has no right child because
    // replacement is the right most child from the left subtree of found.
    replacement.parent.right = replacement.left;
    replacement.parent = null;
    return replacement;
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

export function *postorder(node) {
  for (let child of node.children) {
    yield *postorder(child);
  }
  yield node.value;
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

export function *postorderBin(node) {
  if (!node) return;
  yield *postorderBin(node.left);
  yield *postorderBin(node.right);
  yield node.value;
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

export function lowestCommonAncestor(node, a, b) {
  const path1 = findWithPath(node, a);
  const path2 = findWithPath(node, b);
  if (!path1.length || !path2.length) return null;
  let path1Idx = path1.length - 1;
  let path2Idx = path2.length - 1;
  while (path1Idx >= 0 && path2Idx >= 0) {
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

export function lowestCommonAncestorBin(node, a, b) {
  if (node === null) return null;
  if (node.value === a || node.value === b) return node;
  const left = lowestCommonAncestorBin(node.left, a, b);
  const right = lowestCommonAncestorBin(node.right, a, b);
  if (left && right) return node;
  if (left) return left;
  return right;
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

