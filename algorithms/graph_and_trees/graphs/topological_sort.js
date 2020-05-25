export function topologicalSort(graph) {
  const topo = [];
  const ready = [];
  const inCount = new Map();

  for (const vertex of graph.vertices) {
    const incomingEdges = graph.getIncidentEdges(vertex, false).size;
    inCount.set(vertex, incomingEdges);
    if (!incomingEdges) { ready.push(vertex); }
  }

  while(ready.length) {
    const vertex = ready.pop();
    topo.push(vertex);

    for (const [v, _] of graph.getIncidentEdges(vertex)) {
      inCount.set(v, inCount.get(v) - 1);
      if (inCount.get(v) === 0) {
        ready.push(v);
      }
    }
  }

  return topo;
}