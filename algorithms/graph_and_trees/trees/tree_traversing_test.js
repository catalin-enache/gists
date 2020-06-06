import {
  treeBuilder,
  afterBin,
  beforeBin,
  bfs, bfsBin, bfsBin2, buildExpressionTree,
  depth, eulerTour, evaluateExpressionTree,
  find,
  findBin,
  findBinIter,
  printTree, printTreeBin,
  findPath, subtreeSearchBin, findGEBin, findRange, insertBin, deleteBin,
  firstBin,
  height, inorder, lastBin, lowestCommonAncestor, lowestCommonAncestorBin,
  Node,
  NodeBin, postorder, postorderBin, postorderIter,
  preorder, preorderBin,
  preorderIter
} from "./tree_traversing.js";

const tree_one = {
    'value': 1, 'children': [
        {'value': 2, 'children': [
            {'value': 5, 'children': []},
            {'value': 6, 'children': []},
            {'value': 7, 'children': []},
        ]},
        {'value': 3, 'children': [
            {'value': 8, 'children': []},
            {'value': 9, 'children': []},
            {'value': 10, 'children': []},
        ]},
        {'value': 4, 'children': [
            {'value': 11, 'children': []},
            {'value': 12, 'children': []},
            {'value': 13, 'children': []},
        ]},
    ]
}

const root = treeBuilder(tree_one);

const rootBin = new NodeBin(10);
rootBin.left = new NodeBin(5);
rootBin.right = new NodeBin(15);
rootBin.left.parent = rootBin;
rootBin.right.parent = rootBin;
findBin(rootBin, 5).left = new NodeBin(3);
findBin(rootBin, 3).parent = findBin(rootBin, 5);
findBinIter(rootBin, 5).right = new NodeBin(8);
findBin(rootBin, 8).parent = findBin(rootBin, 5);
findBin(rootBin, 15).left = new NodeBin(13);
findBin(rootBin, 13).parent = findBin(rootBin, 15);
findBinIter(rootBin, 15).right = new NodeBin(20);
findBin(rootBin, 20).parent = findBin(rootBin, 15);



// console.log(depth(root, 7));
// console.log(height(root));
// console.log(find(root, 7));
// console.log(findPath(root, 7).path);
// console.log([...bfs(root)]);
// console.log([...preorder(root)]);
// console.log([...preorderIter(root)]);
// console.log([...postorder(root)]);
// console.log([...postorderIter(root)]);
// console.log(eulerTour(root, (node, depth, path) => {
//   // console.log('    '.repeat(depth), node.value);
//   console.log('pre', node.value, ' => ', path.map((node) => node.value).join(', '));
// }, (node, depth, path, results) => {
//   return [node.value].concat(results).reduce((acc, num) => acc + num);
// }));
// console.log(lowestCommonAncestor(root, 6, 7).value);



// console.log(findBin(rootBin, 5).value);
// console.log(findBinIter(rootBin, 5).value);
// console.log(subtreeSearchBin(rootBin, 4).value); // 3
// console.log(subtreeSearchBin(rootBin, 6).value); // 8
// console.log(findGEBin(rootBin, 4).value); // 5
// console.log(findRange(rootBin, 5, 11).map((node) => node.value)); // 5, 8, 10
// console.log([...bfsBin(rootBin)]);
// console.log([...bfsBin2(rootBin, false)].map((level) => level.map((n) => n.value)));
// console.log([...preorderBin(rootBin)]);
// console.log([...postorderBin(rootBin)]);
// console.log([...inorder(rootBin)]);
// console.log(lowestCommonAncestorBin(rootBin, 3, 13).value);
// console.log(evaluateExpressionTree(buildExpressionTree('(((3+1)*4)/((9-3)+2))')));
// console.log(firstBin(rootBin).value);
// console.log(lastBin(rootBin).value);
// console.log(beforeBin(findBin(rootBin, 10)).value);
// console.log(beforeBin(findBin(rootBin, 20)).value);
// console.log(afterBin(findBin(rootBin, 10)).value);
// console.log(afterBin(findBin(rootBin, 8)).value);
// var node = insertBin(rootBin, 14);
// console.log(node.parent); // 13
// deleteBin(rootBin, 10);
// console.dir(rootBin, { depth: null });
// printTreeBin(rootBin);
// printTree(root);