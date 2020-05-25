
import { Graph } from './graph.js';

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

// console.log(graph.vertices);
// console.log(graph.edges);
// console.log(graph.edges.map((edge) => edge.toString()));
// console.log(graph.getEdge(v1, v2).toString());
// console.log(graph.getIncidentEdges(v3, false));
// console.log(graph.getDegree(v3));
