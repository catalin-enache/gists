import { Graph } from './graph.js';
import { topologicalSort } from './topological_sort.js';


var graph = new Graph(true);
var [va, vb, vc, vd, ve, vf, vg, vh] =
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(graph.addVertex.bind(graph));
[
  [va, vc, null],
  [va, vd, null],
  [vb, vd, null],
  [vb, vf, null],
  [vc, vd, null],
  [vd, vf, null],
  [vc, ve, null],
  [ve, vg, null],
  [vg, vh, null],
  [vf, vg, null],
  [vf, vh, null],
  [vc, vh, null],
].forEach((entry) => graph.addEdge(...entry));

console.log(topologicalSort(graph));