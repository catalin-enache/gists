import { stronglyConnectedComponents } from './strongly_connected_components.js';
import { Graph } from './graph.js';


var graph = new Graph(true);
var [v0, v1, v2, v3, v4] = [0, 1, 2, 3, 4].map(graph.addVertex.bind(graph));
[
  [v1, v0, null],
  [v0, v2, null],
  [v2, v1, null],
  [v0, v3, null],
  [v3, v4, null]
].forEach((entry) => graph.addEdge(...entry));


console.log(stronglyConnectedComponents(graph, v0).ssc);


var graph = new Graph(true);
var [v14, v15, v17, v13, v3, v1, v2, v10, v6, v7] =
  [14, 15, 17, 13, 3, 1, 2, 10, 6, 7].map(graph.addVertex.bind(graph));
[
  [v14, v17, null],
  [v14, v15, null],
  [v15, v13, null],
  [v13, v14, null],
  [v17, v13, null],

  [v15, v3, null],
  [v13, v2, null],

  [v3, v1, null],
  [v3, v2, null],
  [v2, v3, null],
  [v1, v2, null],

  [v1, v10, null],
  [v1, v6, null],
  [v1, v7, null],
  [v10, v7, null],

  [v7, v6, null],
  [v6, v7, null],
].forEach((entry) => graph.addEdge(...entry));


console.log(stronglyConnectedComponents(graph, v13).ssc);

