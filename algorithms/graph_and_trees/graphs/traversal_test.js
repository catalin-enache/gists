import { Graph } from './graph.js';
import { bfs, constructPath, dfs } from './traversal.js';


var graph = new Graph(true);
var [v1, v2, v3, v4, v5, v6] = [1, 2, 3, 4, 5, 6].map(graph.addVertex.bind(graph));
[
  [v1, v2, 2],
  [v1, v3, 4],
  [v2, v3, 1],
  [v2, v4, 7],
  [v3, v5, 3],
  [v5, v4, 2],
  [v5, v6, 5],
  [v4, v6, 1]
].forEach((entry) => graph.addEdge(...entry));

var discovered = dfs(graph, v1);
console.log(discovered.keys()); // 1, 2, 3, 5, 4, 6
console.log(constructPath(v1, v6, discovered)); // 1, 2, 3, 5, 4, 6

var discovered = bfs(graph, v1);
console.log(discovered.keys()); // 1, 2, 3, 4, 5, 6
console.log(constructPath(v1, v6, discovered)); // 1, 2, 4, 6
console.log(constructPath(v1, v5, discovered)); // 1, 3, 5